// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { PRODUCT_CATEGORIES, ORDER_STATUSES } from '@/lib/constants';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', category: PRODUCT_CATEGORIES.FEATURED });
  const [editingId, setEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (activeTab === 'products') fetchProducts();
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const fetchOrders = async () => {
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image if a file is selected
    let imageUrl = form.image;
    if (selectedFile) {
      imageUrl = await uploadImage();
      if (!imageUrl) return; // Stop if upload failed
    }

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/products/${editingId}` : '/api/products';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, image: imageUrl }),
    });
    if (res.ok) {
      fetchProducts();
      setForm({ name: '', description: '', price: '', image: '', category: PRODUCT_CATEGORIES.FEATURED });
      setEditingId(null);
      setSelectedFile(null);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
    setSelectedFile(null); // Reset file selection when editing
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        return data.url;
      } else {
        alert('Image upload failed');
        return null;
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Image upload failed');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const updateOrderStatus = async (orderId, status) => {
    // You can implement order status update API if needed
    console.log('Update order', orderId, 'to status', status);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">📊 Admin Dashboard</h1>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded ${activeTab === 'dashboard' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'}`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'}`}
          >
            Orders
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="text-3xl font-bold mt-2">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-3xl font-bold mt-2">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold">Pending Orders</h2>
            <p className="text-3xl font-bold mt-2">{orders.filter(o => o.status === ORDER_STATUSES.PENDING).length}</p>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <>
          <h2 className="text-2xl font-bold mb-4">Product Management</h2>
          <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="p-2 border rounded"
                required
              />
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="p-2 border rounded w-full"
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600">Selected: {selectedFile.name}</p>
                )}
                {form.image && !selectedFile && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Current image:</p>
                    <img src={form.image} alt="Current" className="w-20 h-20 object-cover rounded" />
                  </div>
                )}
              </div>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="p-2 border rounded"
              >
                <option value={PRODUCT_CATEGORIES.FEATURED}>Featured</option>
                <option value={PRODUCT_CATEGORIES.CAROUSEL}>Carousel</option>
                <option value={PRODUCT_CATEGORIES.HERO}>Hero</option>
                <option value={PRODUCT_CATEGORIES.COLLECTION}>Collection</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
              {uploading ? 'Uploading...' : (editingId ? 'Update' : 'Add') + ' Product'}
            </button>
          </form>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Products</h3>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product._id} className="flex justify-between items-center p-4 border rounded">
                  <div>
                    <h4 className="font-bold">{product.name}</h4>
                    <p>{product.description}</p>
                    <p>{product.price} - {product.category}</p>
                  </div>
                  <div>
                    <button onClick={() => handleEdit(product)} className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'orders' && (
        <>
          <h2 className="text-2xl font-bold mb-4">Order Management</h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Orders</h3>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="p-4 border rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold">Order #{order._id.slice(-8)}</h4>
                      <p className="text-sm text-gray-600">Customer: {order.userId?.name} ({order.userId?.email})</p>
                      <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{order.totalAmount}</p>
                      <span className={`px-2 py-1 rounded text-sm ${
                        order.status === ORDER_STATUSES.PENDING ? 'bg-yellow-100 text-yellow-800' :
                        order.status === ORDER_STATUSES.CONFIRMED ? 'bg-blue-100 text-blue-800' :
                        order.status === ORDER_STATUSES.SHIPPED ? 'bg-purple-100 text-purple-800' :
                        order.status === ORDER_STATUSES.DELIVERED ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <h5 className="font-semibold">Items:</h5>
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm">{item.name} x{item.quantity} - {item.price}</p>
                    ))}
                  </div>
                  <div className="mb-2">
                    <h5 className="font-semibold">Shipping Address:</h5>
                    <p className="text-sm">{order.shippingAddress?.name}</p>
                    <p className="text-sm">{order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}</p>
                    <p className="text-sm">{order.shippingAddress?.email} | {order.shippingAddress?.phone}</p>
                  </div>
                  <div className="flex space-x-2">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="px-3 py-1 border rounded"
                    >
                      <option value={ORDER_STATUSES.PENDING}>Pending</option>
                      <option value={ORDER_STATUSES.CONFIRMED}>Confirmed</option>
                      <option value={ORDER_STATUSES.SHIPPED}>Shipped</option>
                      <option value={ORDER_STATUSES.DELIVERED}>Delivered</option>
                      <option value={ORDER_STATUSES.CANCELLED}>Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
  
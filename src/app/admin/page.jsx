// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', category: 'featured' });
  const [editingId, setEditingId] = useState(null);

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
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/products/${editingId}` : '/api/products';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      fetchProducts();
      setForm({ name: '', description: '', price: '', image: '', category: 'featured' });
      setEditingId(null);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
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
            <p className="text-3xl font-bold mt-2">{orders.filter(o => o.status === 'pending').length}</p>
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
              <input
                type="text"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="p-2 border rounded"
                required
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="p-2 border rounded"
              >
                <option value="featured">Featured</option>
                <option value="carousel">Carousel</option>
                <option value="collection">Collection</option>
              </select>
            </div>
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              {editingId ? 'Update' : 'Add'} Product
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
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
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
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
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
  
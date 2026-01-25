'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCart = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    const updatedCart = cart.map(item =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    saveCart(updatedCart);
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    setIsPlacingOrder(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
        totalAmount: `₹${getTotalAmount().toFixed(2)}`,
        shippingAddress: shippingInfo,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        localStorage.removeItem('cart');
        setCart([]);
        alert('Order placed successfully!');
        router.push('/user');
      } else {
        const error = await res.json();
        alert(`Failed to place order: ${error.error}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <button
          onClick={() => router.push('/user/products')}
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Items */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
          {cart.map((item) => (
            <div key={item._id} className="bg-[#1a1a1a] rounded-lg p-4 flex items-center space-x-4">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-300">{item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-500"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-500"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item._id)}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h3 className="text-xl font-bold">Total: ₹{getTotalAmount().toFixed(2)}</h3>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={shippingInfo.name}
              onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
              className="w-full p-2 bg-[#2a2a2a] rounded border border-gray-600 text-white"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={shippingInfo.email}
              onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
              className="w-full p-2 bg-[#2a2a2a] rounded border border-gray-600 text-white"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={shippingInfo.phone}
              onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
              className="w-full p-2 bg-[#2a2a2a] rounded border border-gray-600 text-white"
              required
            />
            <textarea
              placeholder="Address"
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
              className="w-full p-2 bg-[#2a2a2a] rounded border border-gray-600 text-white"
              rows="3"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={shippingInfo.city}
                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                className="w-full p-2 bg-[#2a2a2a] rounded border border-gray-600 text-white"
                required
              />
              <input
                type="text"
                placeholder="State"
                value={shippingInfo.state}
                onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                className="w-full p-2 bg-[#2a2a2a] rounded border border-gray-600 text-white"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Pincode"
              value={shippingInfo.pincode}
              onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
              className="w-full p-2 bg-[#2a2a2a] rounded border border-gray-600 text-white"
              required
            />
            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
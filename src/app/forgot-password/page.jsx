'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1a1a1a] rounded-lg p-6 sm:p-8 shadow-xl relative">
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 left-4 text-gray-400 hover:text-yellow-500 transition-colors duration-200"
          title="Back to Home"
        >
          <FaHome size={20} />
        </button>
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-2">🕯️ Anaya Candles</h1>
          <h2 className="text-xl font-semibold">Forgot Password</h2>
          <p className="text-gray-400 mt-2">Enter your email to reset your password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
              placeholder="Enter your email"
              required
            />
          </div>

          {message && (
            <div className="p-4 bg-green-900/50 border border-green-500 rounded-lg">
              <p className="text-green-400 text-sm">{message}</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-black font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-yellow-500 hover:text-yellow-400 text-sm">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
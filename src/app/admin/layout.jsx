// app/admin/layout.tsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        router.push('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">🕯️ Candle Admin</h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold transition"
          >
            Logout
          </button>
        </div>
        <nav className="space-y-3">
          <Link href="/admin" className="block">📊 Dashboard</Link>
          <Link href="/admin/products" className="block">🧾 Products</Link>
          <Link href="/admin/orders" className="block">📦 Orders</Link>
          <Link href="/admin/users" className="block">👥 Users</Link>
          <Link href="/admin/reviews" className="block">💬 Reviews</Link>
          <Link href="/admin/settings" className="block">⚙️ Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

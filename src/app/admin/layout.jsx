// app/admin/layout.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Admin Panel | Candle Co.',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
        <h2 className="text-2xl font-bold mb-6">🕯️ Candle Admin</h2>
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

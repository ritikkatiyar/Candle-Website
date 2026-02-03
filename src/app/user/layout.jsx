// app/admin/layout.tsx
'use client';
import Link from 'next/link';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';

export default function UserLayout({ children }) {
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
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header with Logout - Fixed position */}
      <header className="fixed top-0 left-0 right-0 bg-[#1a1a1a] p-4 shadow-lg z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">🛍️ User Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Logout 🚪
          </button>
        </div>
      </header>

      {/* Main Content with top padding to account for fixed header */}
      <main className="pt-20">
        <Suspense fallback={<div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">Loading...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}

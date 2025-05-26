// app/admin/layout.tsx
import Link from 'next/link';

export const metadata = {
  title: 'User Panel | Candle Co.',
};

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

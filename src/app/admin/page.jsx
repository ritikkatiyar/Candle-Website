// app/admin/page.tsx
export default function AdminDashboard() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">📊 Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="text-3xl font-bold mt-2">128</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p className="text-3xl font-bold mt-2">₹34,500</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold">Low Stock</h2>
            <p className="text-3xl font-bold mt-2">4 items</p>
          </div>
        </div>
      </div>
    );
  }
  
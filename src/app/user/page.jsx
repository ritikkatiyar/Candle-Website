import { Suspense } from "react";
import UserProductsPage from "./products/page";

// app/admin/page.tsx
export default function UserDashboard() {
    return (
      <div>
        <Suspense fallback={<div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">Loading products...</div>}>
          <UserProductsPage />
        </Suspense>
      </div>
    );
  }
  
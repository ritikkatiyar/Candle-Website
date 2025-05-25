// app/user/products/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function UserProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Available Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="border rounded-xl p-4 shadow bg-white">
            <img src={product.imageUrl} alt={product.name} className="h-40 w-full object-cover mb-2 rounded-md" />
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-semibold mt-2">₹{product.price}</p>
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

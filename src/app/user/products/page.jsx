// app/user/products/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function UserProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <section className="py-16 px-4 bg-[#0d0d0d] text-white text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">
        ✨ Featured Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] hover:shadow-lg hover:scale-[1.02] transition-all duration-300 rounded-2xl overflow-hidden shadow-md flex flex-col items-center p-6"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={250}
              height={250}
              className="rounded-xl object-cover mb-4"
            />

            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-300 text-sm mb-1">{item.price}</p>
            <p className="text-yellow-400 text-sm italic">{item.offer}</p>

            <button
              className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-400 text-black font-medium rounded-full hover:from-yellow-400 hover:to-orange-300 transition-all duration-300"
              onClick={() =>
                window.open("https://wa.me/c/919140206166", "_blank")
              }
            >
              🛍️ Shop Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import Contact from "./Contact";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FeaturedProducts({refProp}) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const featured = data.filter(p => p.category === 'featured');
        setProducts(featured);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };
    fetchProducts();

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const getProductImages = (product) => {
    const list = [product.image, ...(product.images || [])].filter(Boolean);
    return Array.from(new Set(list));
  };

  const getPrimaryImage = (product) => getProductImages(product)[0];
  const getSecondaryImage = (product) => getProductImages(product)[1];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    alert('Added to cart! Login to checkout.');
  };

  return (
    <section
      ref={refProp}
      className="py-16 px-4 bg-[#0d0d0d] text-white text-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">
        ✨ Featured Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {products.map((item, index) => (
          <div
            key={item._id || index}
            className="bg-[#1a1a1a] hover:shadow-lg hover:scale-[1.02] transition-all duration-300 rounded-2xl overflow-hidden shadow-md flex flex-col items-center p-6 group"
          >
            <div className="relative overflow-hidden rounded-xl mb-4 w-56 h-56">
              <Image
                src={getPrimaryImage(item)}
                alt={item.name}
                width={250}
                height={250}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
              />
              {getSecondaryImage(item) && (
                <Image
                  src={getSecondaryImage(item)}
                  alt={`${item.name} alternate`}
                  width={250}
                  height={250}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />
              )}
            </div>

            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-300 text-sm mb-1">{item.price}</p>
            <p
              className="text-yellow-400 text-sm italic mb-2 max-h-10 overflow-hidden transition-[max-height] duration-300 group-hover:max-h-40"
              title={item.description}
            >
              {item.description}
            </p>

            <button
  className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-400 text-black font-medium rounded-full hover:from-yellow-400 hover:to-orange-300 transition-all duration-300"
  onClick={() => addToCart(item)}
>
  🛒 Add to Cart
</button>

          </div>
        ))}
      </div>


    </section>
  );
}

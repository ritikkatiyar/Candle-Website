import Image from "next/image";
import Contact from "./Contact";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import ProductDetailModal from "./ProductDetailModal";

export default function FeaturedProducts({refProp}) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  useEffect(() => {
    if (!selectedProduct) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProduct(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProduct]);

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
      className="py-16 px-4 bg-[#f7f6f3] text-black"
    >
      <ProductDetailModal
        product={selectedProduct}
        images={selectedProduct ? getProductImages(selectedProduct) : []}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <h2 className="text-3xl sm:text-4xl font-bold mb-10 tracking-tight text-center">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {products.map((item, index) => (
          <div
            key={item._id || index}
            className="group relative bg-white border border-black/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex flex-col items-stretch p-5 cursor-pointer"
            onClick={() => setSelectedProduct(item)}
          >
            <div className="relative overflow-hidden rounded-xl mb-4 w-full aspect-square bg-[#f4f3ef]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src={getPrimaryImage(item)}
                alt={item.name}
                width={400}
                height={400}
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {getSecondaryImage(item) && (
                <Image
                  src={getSecondaryImage(item)}
                  alt={`${item.name} alternate`}
                  width={400}
                  height={400}
                  className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />
              )}
            </div>

            <div className="w-full text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-black/50">Anaya</p>
              <h3 className="mt-2 text-base sm:text-lg font-medium leading-tight line-clamp-2">{item.name}</h3>
              <p className="mt-2 text-sm text-black/60">Classic Candle</p>
              <p className="mt-3 text-base font-semibold">{item.price}</p>
            </div>
            <button
  className="mt-5 inline-flex items-center self-center px-6 py-2 rounded-full font-semibold text-black border border-black/10 bg-gradient-to-b from-white/92 via-white/84 to-white/78 shadow-[0_6px_16px_rgba(0,0,0,0.12)] backdrop-blur-sm hover:from-white/96 hover:via-white/88 hover:to-white/82 transition-all duration-300"
  onClick={(e) => {
    e.stopPropagation();
    addToCart(item);
  }}
>
  <ShoppingCart size={16} className="mr-2 text-black" />
  Add to Cart
</button>

          </div>
        ))}
      </div>


    </section>
  );
}

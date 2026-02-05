import Image from "next/image";
import Contact from "./Contact";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

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
      className="py-16 px-4 bg-[#0d0d0d] text-white"
    >      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="relative w-[92%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-h-[85vh] bg-[#111111] border border-white/10 shadow-2xl rounded-2xl overflow-hidden pointer-events-auto"
            >
              <div className="p-5 sm:p-6 lg:p-8 overflow-y-auto max-h-[85vh]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-amber-300/80">Product</p>
                    <h2 className="text-2xl sm:text-3xl font-bold mt-1">{selectedProduct.name}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="rounded-full bg-white/10 hover:bg-white/20 text-white px-3 py-1 text-sm"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="grid grid-cols-2 gap-3">
                    {getProductImages(selectedProduct).map((src, i) => (
                      <div
                        key={src + i}
                        className={`relative overflow-hidden rounded-xl ${
                          getProductImages(selectedProduct).length === 1
                            ? 'col-span-2 aspect-square'
                            : 'aspect-square'
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`${selectedProduct.name} ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 80vw, 40vw"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <p className="text-yellow-400 font-semibold text-xl">{selectedProduct.price}</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {selectedProduct.description || 'No description available.'}
                    </p>
                    <button
                      onClick={() => addToCart(selectedProduct)}
                      className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight text-center">
        ✨ Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
        {products.map((item, index) => (
          <div
            key={item._id || index}
            className="group relative bg-[#141414] hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)] hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex flex-col items-stretch p-4 sm:p-5 border border-white/5 cursor-pointer"
            onClick={() => setSelectedProduct(item)}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative overflow-hidden rounded-xl mb-4 w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src={getPrimaryImage(item)}
                alt={item.name}
                width={400}
                height={400}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              {getSecondaryImage(item) && (
                <Image
                  src={getSecondaryImage(item)}
                  alt={`${item.name} alternate`}
                  width={400}
                  height={400}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />
              )}
            </div>

            <div className="w-full flex items-start justify-between gap-3">
              <h3 className="text-base sm:text-lg font-semibold leading-tight line-clamp-2">{item.name}</h3>
              <span className="text-[11px] uppercase tracking-wider text-amber-300/80">Featured</span>
            </div>
            <div className="mt-2 w-full flex items-center justify-between">
              <p className="text-gray-300 text-sm">{item.price}</p>
              <span className="text-xs text-white/60">Hand-poured</span>
            </div>
            <button
  className="mt-auto inline-flex self-center px-4 py-2 bg-gradient-to-r from-amber-300 to-amber-400 text-black font-semibold rounded-full border border-black/10 shadow-[0_6px_18px_rgba(0,0,0,0.2)] hover:from-amber-200 hover:to-amber-300 transition-all duration-300"
  onClick={(e) => {
    e.stopPropagation();
    addToCart(item);
  }}
>
  🛒 Add to Cart
</button>

          </div>
        ))}
      </div>


    </section>
  );
}

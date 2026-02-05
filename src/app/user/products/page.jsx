// app/user/products/page.jsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCT_TYPES, PRODUCT_TYPE_OPTIONS } from "@/lib/constants";

export default function UserProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  useEffect(() => {
    fetchProducts();
    loadCart();
  }, []);

  useEffect(() => {
    const allowedTypes = new Set(Object.values(PRODUCT_TYPES));
    if (!typeParam) {
      setSelectedType('all');
      return;
    }
    setSelectedType(allowedTypes.has(typeParam) ? typeParam : 'all');
  }, [typeParam]);

  useEffect(() => {
    filterAndSortProducts();
  }, [allProducts, searchTerm, selectedType, sortBy]);

  useEffect(() => {
    if (!selectedProduct) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProduct(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProduct]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCart = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveCart(updatedCart);
    } else {
      const newItem = { ...product, quantity: 1 };
      saveCart([...cart, newItem]);
    }
    showNotification(`${product.name} added to cart!`);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const resolveProductType = (product) => product.productType || PRODUCT_TYPES.CANDLES;

  const getProductTypeLabel = (value) => (
    PRODUCT_TYPE_OPTIONS.find((option) => option.value === value)?.label || value
  );

  const getProductImages = (product) => {
    const list = [product.image, ...(product.images || [])].filter(Boolean);
    return Array.from(new Set(list));
  };

  const getPrimaryImage = (product) => getProductImages(product)[0];
  const getSecondaryImage = (product) => getProductImages(product)[1];

  const filterAndSortProducts = () => {
    let filtered = [...allProducts];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(product => resolveProductType(product) === selectedType);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return parseFloat(a.price.replace('', '').replace(',', '')) -
                 parseFloat(b.price.replace('', '').replace(',', ''));
        case "price-high":
          return parseFloat(a.price.replace('', '').replace(',', '')) -
                 parseFloat(b.price.replace('', '').replace(',', ''));
        default:
          return 0;
      }
    });

    setProducts(filtered);
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <div className="text-xl">Loading amazing products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Slide-in Product Drawer */}      <AnimatePresence>
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
                    <p className="text-sm text-white/70">Type: {getProductTypeLabel(resolveProductType(selectedProduct))}</p>
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

      <div className="bg-[#1a1a1a] p-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <h1 className="text-2xl font-bold">Our Products</h1>
            <button
              onClick={() => router.push('/user/cart')}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition relative border-0 w-full sm:w-auto"
            >
              Cart ({getCartCount()})
            </button>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400"></div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-[#2a2a2a] px-4 py-2 rounded-lg border-0 hover:bg-[#3a3a3a] transition w-full sm:w-auto"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#2a2a2a] text-white px-3 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {showFilters && (
              <div className="bg-[#2a2a2a] p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Filter by Type</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedType("all")}
                    className={`px-3 py-1 rounded-full text-sm border-0 ${
                      selectedType === "all"
                        ? 'bg-yellow-500 text-black'
                        : 'bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]'
                    }`}
                  >
                    All
                  </button>
                  {PRODUCT_TYPE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedType(option.value)}
                      className={`px-3 py-1 rounded-full text-sm capitalize border-0 ${
                        selectedType === option.value
                          ? 'bg-yellow-500 text-black'
                          : 'bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <p className="text-gray-400">
                  Showing {products.length} product{products.length !== 1 ? 's' : ''}
                  {searchTerm && ` for "${searchTerm}"`}
                  {selectedType !== "all" && ` in ${getProductTypeLabel(selectedType)}`}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="group relative bg-[#141414] rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 border border-white/5 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative overflow-hidden rounded-xl mb-4 h-52">
                      <Image
                        src={getPrimaryImage(product)}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      {getSecondaryImage(product) && (
                        <Image
                          src={getSecondaryImage(product)}
                          alt={`${product.name} alternate`}
                          width={300}
                          height={300}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                        />
                      )}
                      <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        {getProductTypeLabel(resolveProductType(product))}
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base sm:text-lg font-semibold leading-tight line-clamp-2">{product.name}</h3>
                      <span className="text-[11px] uppercase tracking-wider text-amber-300/80">Glow</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-yellow-400 font-bold text-lg">{product.price}</p>
                      <div className="text-xs text-white/60">Hand-poured</div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="mt-auto w-full bg-gradient-to-r from-amber-300 to-amber-400 text-black py-2 rounded-lg font-semibold hover:from-amber-200 hover:to-amber-300 transition flex items-center justify-center gap-2 border-0"
                    >
                      <span>Add to Cart</span>
                      <span aria-hidden="true">+</span>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="fixed bottom-4 right-4 space-y-2">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white p-3 rounded-full shadow-lg transition"
          title="Back to top"
        >
          ^
        </button>
        <button
          onClick={() => router.push('/user/cart')}
          className="bg-yellow-500 hover:bg-yellow-400 text-black p-3 rounded-full shadow-lg transition relative border-0"
          title="View Cart"
        >
          Cart
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

// app/user/products/page.jsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      // Filter out hero images as they are for display only
      const purchasableProducts = data.filter(product => product.category !== 'hero');
      setAllProducts(purchasableProducts);
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
    // Show feedback
    showNotification(`${product.name} added to cart!`);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const resolveProductType = (product) => product.productType || PRODUCT_TYPES.CANDLES;

  const getProductTypeLabel = (value) => (
    PRODUCT_TYPE_OPTIONS.find((option) => option.value === value)?.label || value
  );

  const filterAndSortProducts = () => {
    let filtered = [...allProducts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(product => resolveProductType(product) === selectedType);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return parseFloat(a.price.replace('???', '').replace(',', '')) -
                 parseFloat(b.price.replace('???', '').replace(',', ''));
        case "price-high":
          return parseFloat(a.price.replace('???', '').replace(',', '')) -
                 parseFloat(b.price.replace('???', '').replace(',', ''));
        default:
          return 0;
      }
    });

    setProducts(filtered);
  };

  const showNotification = (message) => {
    // Simple notification - you could enhance this with a proper notification system
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
      {/* Header */}
      <div className="bg-[#1a1a1a] p-4 sticky top-0 z-40 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">??????? Our Products</h1>
          <button
            onClick={() => router.push('/user/cart')}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition relative border-0"
          >
            ???? Cart ({getCartCount()})
          </button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">????</div>
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-[#2a2a2a] px-4 py-2 rounded-lg border-0 hover:bg-[#3a3a3a] transition"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'} ???????
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#2a2a2a] text-white px-3 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Filters */}
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

      {/* Products Grid */}
      <div className="p-6">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">????</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
                {searchTerm && ` for "${searchTerm}"`}
                {selectedType !== "all" && ` in ${getProductTypeLabel(selectedType)}`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-[#1a1a1a] rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      {getProductTypeLabel(resolveProductType(product))}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-yellow-400 font-bold text-lg">{product.price}</p>
                    <div className="flex items-center text-sm text-gray-400">
                      ???????????????
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition flex items-center justify-center gap-2 border-0"
                  >
                    <span>Add to Cart</span>
                    <span>????</span>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-4 right-4 space-y-2">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white p-3 rounded-full shadow-lg transition"
          title="Back to top"
        >
          ???
        </button>
        <button
          onClick={() => router.push('/user/cart')}
          className="bg-yellow-500 hover:bg-yellow-400 text-black p-3 rounded-full shadow-lg transition relative border-0"
          title="View Cart"
        >
          ????
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

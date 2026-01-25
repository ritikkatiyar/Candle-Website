import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

const HeroSection = ({ onShopNowClick }) => {
  const [products, setProducts] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        // Filter featured products for the collections section
        const featured = data.filter(p => p.category === 'featured');
        setProducts(featured);

        // Filter hero images for the background
        const heroImages = data.filter(p => p.category === PRODUCT_CATEGORIES.HERO);
        const imageUrls = heroImages.map(p => p.image).filter(img => img);
        setCarouselImages(imageUrls);

      } catch (error) {
        console.error('Error fetching products:', error);
        // No fallback images - carousel will be empty if API fails
        setCarouselImages([]);
      }
    };
    fetchProducts();

    // Set up interval for carousel, but only if we have images
    const interval = setInterval(() => {
      setCarouselImages(prevImages => {
        if (prevImages.length > 1) {
          setIndex((prev) => (prev + 1) % prevImages.length);
        }
        return prevImages;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-serif bg-[#121212] text-white">
      {/* Hero Banner */}
      <section className="relative w-full h-[60vh] sm:h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {carouselImages.length > 1 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Image
                  src={carouselImages[index]}
                  alt="Background"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="opacity-80"
                />
              </motion.div>
            </AnimatePresence>
          ) : carouselImages.length === 1 ? (
            <Image
              src={carouselImages[0]}
              alt="Background"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="opacity-80"
            />
          ) : null}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Handcrafted Candles <br /> for Every Moment
          </h1>
          <button
            onClick={onShopNowClick}
            className="mt-6 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300"
          >
            🛍️ Shop Now
          </button>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 px-4 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          ✨ Featured Collections
        </h2>

        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto overflow-x-auto pb-4 hide-scrollbar">
  {products.map((item, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-5 rounded-2xl shadow-xl min-w-[250px] sm:w-auto"
    >
      <Image
        src={item.image || "/fallback.jpg"}
        alt={item.name || "Product Image"}
        width={400}
        height={400}
        className="rounded-xl w-full h-60 object-cover"
      />
      <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
      <p className="text-gray-300 text-base">{item.price}</p>
    </motion.div>
  ))}
</div>

      </section>
    </div>
  );
};

export default HeroSection;

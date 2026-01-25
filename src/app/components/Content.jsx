'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import Contact from './Contact';

export default function Content() {
  const [collections, setCollections] = useState([]);
  const [content, setContent] = useState({});
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch homepage content
        const contentRes = await fetch('/api/content');
        if (contentRes.ok) {
          const contentData = await contentRes.json();
          // Organize content by section
          const contentBySection = {};
          contentData.forEach(item => {
            if (!contentBySection[item.section]) {
              contentBySection[item.section] = [];
            }
            contentBySection[item.section].push(item);
          });
          setContent(contentBySection);
        }

        // Fetch collection products (keeping this separate as requested)
        const productsRes = await fetch('/api/products');
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          const collectionProducts = productsData.filter(p => p.category === 'collection');
          setCollections(collectionProducts.map(p => ({ name: p.name, img: p.image, desc: p.description })));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="bg-[#0d0d0d] text-white px-4 sm:px-6 md:px-12 lg:px-20 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading content...</p>
        </div>
      </main>
    );
  }

  // Helper function to get content by section
  const getContentBySection = (section) => content[section] || [];

  return (
    <main className="bg-[#0d0d0d] text-white px-4 sm:px-6 md:px-12 lg:px-20 py-12 space-y-16" >

      {/* Title/About Section */}
      {getContentBySection('about').map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{item.title}</h1>
          <p className="text-lg md:text-xl">{item.content}</p>
        </motion.div>
      ))}

      {/* Our Story Section */}
      {getContentBySection('story').map((item, index) => (
        <section key={item._id} className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">{item.title}</h2>
            <p className="text-base md:text-lg leading-relaxed">{item.content}</p>
          </motion.div>
          {item.image && (
            <Image
              src={item.image}
              alt={item.title}
              width={500}
              height={400}
              className="rounded-xl shadow-xl object-cover"
            />
          )}
        </section>
      ))}

      {/* Features Section */}
      {getContentBySection('features').length > 0 && (
        <section>
          <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">
            {getContentBySection('features')[0]?.title || '🌿 Handcrafted with Passion & Purpose'}
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {getContentBySection('features').map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center shadow-md"
              >
                <p className="text-lg">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Collections Section */}
      {collections.length > 0 && (
        <section>
          <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">
            {getContentBySection('collections')[0]?.title || '🔥 Explore Our Collections'}
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 p-4 rounded-lg shadow-md"
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Candle Care Tips */}
      {getContentBySection('care-tips').length > 0 && (
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            {getContentBySection('care-tips')[0]?.title || '💡 Candle Care Tips'}
          </h2>
          <div className="text-left space-y-2 text-base md:text-lg">
            {getContentBySection('care-tips').map((item, index) => (
              <p key={item._id}>{item.content}</p>
            ))}
          </div>
        </section>
      )}

      {/* Customer Reviews */}
      {getContentBySection('reviews').length > 0 && (
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            {getContentBySection('reviews')[0]?.title || '❤️ Customer Love'}
          </h2>
          {getContentBySection('reviews').map((item, index) => (
            <p key={item._id} className="italic mb-4">{item.content}</p>
          ))}
        </section>
      )}

      {/* Contact & CTA */}
      {getContentBySection('contact').length > 0 ? (
        <section className="text-center space-y-6">
          {getContentBySection('contact').map((item, index) => (
            <div key={item._id}>
              <p className="text-xl mb-4">{item.content}</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a
                  className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:scale-105 transition"
                  href="https://wa.me/c/919140206166"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🛒 Shop Now
                </a>
                <a
                  className="px-6 py-3 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition cursor-pointer"
                  onClick={() => setPopupOpen(true)}
                >
                  📩 Contact Us
                </a>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="text-center space-y-6">
          <p className="text-xl">✨ Let's Create Something Beautiful Together!</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:scale-105 transition"
              href="https://wa.me/c/919140206166"
              target="_blank"
              rel="noopener noreferrer"
            >
              🛒 Shop Now
            </a>
            <a
              className="px-6 py-3 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition cursor-pointer"
              onClick={() => setPopupOpen(true)}
            >
              📩 Contact Us
            </a>
          </div>
        </section>
      )}

      {/* Contact Popup */}
      <Contact isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </main>
  );
}

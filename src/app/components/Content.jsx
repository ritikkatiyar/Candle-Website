'use client';

import { useState, useEffect } from "react";
import Contact from './Contact';
import CollectionsSection from './content/CollectionsSection';
import AboutSection from './content/AboutSection';
import StorySection from './content/StorySection';
import FeaturesSection from './content/FeaturesSection';
import CareTipsSection from './content/CareTipsSection';
import ReviewsSection from './content/ReviewsSection';
import ContactCTASection from './content/ContactCTASection';
import ContentLoading from './content/ContentLoading';

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

  if (loading) return <ContentLoading />;

  // Helper function to get content by section
  const getContentBySection = (section) => content[section] || [];

  return (
    <main className="bg-gradient-to-b from-white via-[#0f0f0f] to-black/98 text-white px-4 sm:px-6 md:px-12 lg:px-20 py-12 space-y-16">
      {/* Title/About Section */}
      <AboutSection items={getContentBySection('about')} />

      {/* Our Story Section */}
      <StorySection items={getContentBySection('story')} />

      {/* Features Section */}
      <FeaturesSection
        title={getContentBySection('features')[0]?.title || 'Handcrafted with Passion and Purpose'}
        items={getContentBySection('features')}
      />

      {/* Collections Section */}
      <CollectionsSection
        title={getContentBySection('collections')[0]?.title || 'Explore Our Collections'}
        collections={collections}
      />

      {/* Candle Care Tips */}
      <CareTipsSection
        title={getContentBySection('care-tips')[0]?.title || 'Candle Care Tips'}
        items={getContentBySection('care-tips')}
      />

      {/* Customer Reviews */}
      <ReviewsSection
        title={getContentBySection('reviews')[0]?.title || 'Customer Love'}
        items={getContentBySection('reviews')}
      />

      {/* Contact & CTA */}
      <ContactCTASection
        items={getContentBySection('contact')}
        onOpenContact={() => setPopupOpen(true)}
      />

      {/* Contact Popup */}
      <Contact isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </main>
  );
}

"use client";

import Head from "next/head";
import { useRef } from "react";
import FeaturedProducts from "./components/FeaturedProducts";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ImageCarousel from "./components/ImageCarousel";
import Content from "./components/Content";
import Footer from "./components/Footer";

export default function Home() {
  const featuredRef = useRef(null);

  const scrollToFeatured = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <title>Anaya Candles | Handmade Soy Wax Candles</title>
        <meta
          name="description"
          content="Anaya Candles offers eco-friendly, handcrafted soy wax candles designed to add warmth and elegance to any space."
        />
        <meta
          name="keywords"
          content="Anaya Candles, Soy Candles, Handmade Candles, Eco-friendly, Natural Wax, Candle Gifts"
        />
        <meta name="author" content="Anaya Candles" />
        <meta property="og:title" content="Anaya Candles | Handmade Soy Wax Candles" />
        <meta property="og:description" content="Explore our collection of natural, hand-poured candles perfect for gifts and cozy moments." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://candle-sandy.vercel.app/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <HeroSection onShopNowClick={scrollToFeatured} />
      <ImageCarousel />
      <FeaturedProducts refProp={featuredRef} />
      <Content />
      <Footer />
    </>
  );
}

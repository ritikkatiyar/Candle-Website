"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Home", link: "/" },
    {
      name: "Products",
      subMenu: [
        { name: "All Products", link: "#" },
        { name: "Candles", link: "#" },
        { name: "Diffusers", link: "#" },
        { name: "Gift Cards", link: "#" },
      ],
    },
    { name: "About", link: "#" },
    { name: "Contact", link: "#" },
  ];

  return (
    <nav className="bg-white fixed top-0 left-0 w-full shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="sm:text-2xl md:text-3xl lg:text-4xl text-black tracking-wide">
            ANAYA CANDLES
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.subMenu ? (
                  <>
                    <button className="text-black text-xl font-medium hover:text-gray-400 focus:outline-none">
                      {item.name}
                    </button>
                    {/* Dropdown on Hover */}
                    <div
                      className="absolute left-0 mt-2 bg-white border shadow-lg rounded-lg w-48 z-50 opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300"
                    >
                      {item.subMenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.link}
                          className="block px-4 py-2 text-black hover:bg-gray-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.link}
                    className="text-black text-xl font-medium hover:text-gray-400"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full bg-white text-black"
            onClick={toggleNavbar}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t"
        >
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.subMenu ? (
                <>
                  <button
                    className="w-full text-left text-black text-xl font-medium hover:bg-gray-700 px-4 py-2"
                  >
                    {item.name}
                  </button>
                  {/* Mobile Dropdown */}
                  {item.subMenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.link}
                      className="block px-4 py-2 text-black hover:bg-gray-200"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  href={item.link}
                  className="block px-4 py-2 text-black hover:bg-gray-200"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

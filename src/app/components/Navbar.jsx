import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { PRODUCT_TYPE_OPTIONS } from "@/lib/constants";

const productSubMenu = [
  { name: "All Products", link: "/user/products" },
  ...PRODUCT_TYPE_OPTIONS.map((option) => ({
    name: option.label,
    link: `/user/products?type=${option.value}`,
  })),
];

const navItems = [
  { name: "Home", link: "/" },
  {
    name: "Products",
    subMenu: productSubMenu,
  },
  { name: "Contact", link: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoverDropdown, setHoverDropdown] = useState(null); // New state for hovering dropdown

  const handleDropdownEnter = (index) => {
    setHoverDropdown(index); // Set the current dropdown to be hovered
  };

  const handleDropdownLeave = () => {
    setHoverDropdown(null); // Reset the dropdown hover state when mouse leaves
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 font-serif text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/20 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold flex items-center gap-2 text-white group">
          <span className="bg-gradient-to-br from-amber-400 to-orange-500 text-black px-2.5 py-1 rounded-lg shadow-[0_6px_16px_rgba(245,158,11,0.35)] group-hover:shadow-[0_10px_24px_rgba(245,158,11,0.5)] transition-shadow">A</span>
          NAYA CANDLES
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => handleDropdownEnter(index)} // Hover enter event
              onMouseLeave={handleDropdownLeave} // Hover leave event
            >
              {item.link ? (
                <Link
                  href={item.link}
                  className="flex items-center text-white/90 hover:text-amber-300 transition"
                >
                  {item.name}
                  {item.subMenu && <ChevronDown size={16} className="ml-1" />}
                </Link>
              ) : (
                <span className="flex items-center text-white/90 hover:text-amber-300 transition cursor-pointer">
                  {item.name}
                  {item.subMenu && <ChevronDown size={16} className="ml-1" />}
                </span>
              )}

              {/* Hover underline */}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-amber-300 to-orange-400 transition-all duration-300 group-hover:w-full" />

              {/* Dropdown */}
              {item.subMenu && (
                <div
                  className={`absolute left-0 top-9 bg-black/60 backdrop-blur-xl border border-white/10 text-white shadow-[0_20px_40px_rgba(0,0,0,0.45)] rounded-xl opacity-0 transition-all duration-200 w-48 py-2 z-50 ${
                    (hoverDropdown === index || openDropdown === index) ? "opacity-100" : ""
                  }`}
                >
                  {item.subMenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.link}
                      className="block px-4 py-2 text-sm hover:bg-white/10 rounded-lg text-white/90 hover:text-white transition"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link href="/login" className="text-white/90 hover:text-amber-300 transition">
            Login
          </Link>
          <Link
            href="/register"
            className="bg-gradient-to-r from-amber-300 to-orange-400 text-black px-5 py-1.5 rounded-full text-sm hover:from-amber-200 hover:to-orange-300 transition shadow-[0_10px_24px_rgba(245,158,11,0.35)]"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-black/85 via-black/75 to-black/60 backdrop-blur-2xl border-r border-white/10 text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-40 p-6 pt-20`}
      >
        {/* Close Button */}
        <button className="absolute top-5 right-6 text-white" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>

        {/* Mobile Links */}
        <div className="flex flex-col space-y-6">
          {navItems.map((item, index) => (
            <div key={index}>
              <div
                className="flex justify-between items-center text-lg font-medium cursor-pointer"
                onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
              >
                {item.link ? (
                  <Link href={item.link}>{item.name}</Link>
                ) : (
                  <span>{item.name}</span>
                )}
                {item.subMenu && <ChevronDown size={18} />}
              </div>

              {/* Dropdown in mobile */}
              {item.subMenu && openDropdown === index && (
                <div className="pl-4 mt-2 space-y-2 text-sm">
                  {item.subMenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.link}
                      className="block hover:underline text-white/90"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col gap-4">
            <Link href="/login" className="text-base text-white hover:underline">
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-white text-black px-6 py-2 rounded-full text-base hover:bg-gray-200 transition shadow-md text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

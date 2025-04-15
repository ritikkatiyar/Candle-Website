import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { name: "Home", link: "/" },
  {
    name: "Products",
    subMenu: [
      { name: "All Products", link: "/products" },
      { name: "Candles", link: "/products/candles" },
      { name: "Diffusers", link: "/products/diffusers" },
      { name: "Gift Cards", link: "/products/gift-cards" },
    ],
  },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
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
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.2)] font-serif text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold flex items-center gap-2 text-white">
          <span className="bg-rose-600 text-white px-2 py-1 rounded-lg">A</span>
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
                  className="flex items-center hover:text-rose-400 transition"
                >
                  {item.name}
                  {item.subMenu && <ChevronDown size={16} className="ml-1" />}
                </Link>
              ) : (
                <span className="flex items-center hover:text-rose-400 transition cursor-pointer">
                  {item.name}
                  {item.subMenu && <ChevronDown size={16} className="ml-1" />}
                </span>
              )}

              {/* Dropdown */}
              {item.subMenu && (
                <div
                  className={`absolute left-0 top-8 bg-white/20 backdrop-blur-lg border border-white/30 text-white shadow-lg rounded-lg opacity-0 transition-all duration-200 w-44 py-2 z-50 ${
                    (hoverDropdown === index || openDropdown === index) ? "opacity-100" : ""
                  }`}
                >
                  {item.subMenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.link}
                      className="block px-4 py-2 text-sm hover:bg-white/30 rounded text-white transition"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link href="/login" className="hover:text-rose-400 transition">
            Login
          </Link>
          <Link
            href="#"
            className="bg-white text-black px-5 py-1.5 rounded-full text-sm hover:bg-gray-200 transition shadow-md"
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
        className={`fixed top-0 left-0 w-full h-screen bg-white/10 backdrop-blur-2xl border-r border-white/20 text-white transform transition-transform duration-300 ease-in-out ${
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
              href="#"
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

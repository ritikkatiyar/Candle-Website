import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search, User, ShoppingBag } from "lucide-react";
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
    <nav className="fixed top-0 left-0 w-full z-50 font-serif text-black">
      <div className="absolute inset-0 bg-gradient-to-b from-white/74 via-white/64 to-white/56 backdrop-blur-sm border-b border-black/10 shadow-[0_1px_6px_rgba(0,0,0,0.015)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.02)_48%,rgba(255,255,255,0)_74%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-b from-white/4 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-black/80 hover:text-black transition"
              aria-label="Open menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl tracking-[0.22em] font-medium text-black flex items-center gap-3"
          >
            <span
              className="grid place-items-center w-9 h-9 rounded-full border border-black text-black text-[18px] leading-none"
              style={{ fontFamily: "cursive" }}
            >
              <span className="relative left-[3px]">A</span>
            </span>
            NAYA CANDLES
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-4 text-black/70">
            <button className="hover:text-black transition" aria-label="Search">
              <Search size={18} />
            </button>
            <Link href="/login" className="hover:text-black transition" aria-label="Account">
              <User size={18} />
            </Link>
            <Link href="/user/cart" className="relative hover:text-black transition" aria-label="Cart">
              <ShoppingBag size={18} />
              <span className="absolute -top-2 -right-2 text-[10px] leading-none bg-black text-white rounded-full px-1.5 py-0.5">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex justify-center gap-8 text-[12px] tracking-[0.2em] font-medium pt-3 pb-2">
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
                  className="flex items-center text-black/70 hover:text-black transition uppercase"
                >
                  {item.name}
                  {item.subMenu && <ChevronDown size={16} className="ml-1" />}
                </Link>
              ) : (
                <span className="flex items-center text-black/70 hover:text-black transition cursor-pointer uppercase">
                  {item.name}
                  {item.subMenu && <ChevronDown size={16} className="ml-1" />}
                </span>
              )}

              {/* Hover underline */}
              <span className="absolute -bottom-2 left-0 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-full" />

              {/* Dropdown */}
              {item.subMenu && (
                <div
                  className={`absolute left-0 top-8 bg-white/95 backdrop-blur-xl border border-black/10 text-black shadow-[0_20px_40px_rgba(0,0,0,0.12)] rounded-lg opacity-0 transition-all duration-200 w-52 py-2 z-50 ${
                    (hoverDropdown === index || openDropdown === index) ? "opacity-100" : ""
                  }`}
                >
                  {item.subMenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.link}
                      className="block px-4 py-2 text-sm hover:bg-black/5 rounded-md text-black/80 hover:text-black transition"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-2xl border-r border-black/10 text-black transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-40 p-6 pt-20`}
      >
        {/* Close Button */}
        <button className="absolute top-5 right-6 text-black" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>

        {/* Mobile Links */}
        <div className="flex flex-col space-y-6">
          {navItems.map((item, index) => (
            <div key={index}>
              <div
                className="flex justify-between items-center text-lg font-medium cursor-pointer uppercase tracking-widest"
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
                      className="block hover:underline text-black/80"
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
            <Link href="/login" className="text-base text-black hover:underline">
              Log In
            </Link>
            <Link href="/register" className="text-base text-black hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

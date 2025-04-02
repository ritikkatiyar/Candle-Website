import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react"; // Install using: npm install lucide-react

const navItems = [
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-opacity-50 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-black text-xl md:text-2xl font-bold flex items-center">
          <span className="bg-rose-600 text-white px-2 py-1 rounded-md">A</span>
          NAYA CANDLES
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-black text-sm">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <a href={item.link || "#"} className="hover:underline flex items-center">
                {item.name}
                {item.subMenu && <ChevronDown size={16} className="ml-1" />}
              </a>

              {/* Dropdown Menu */}
              {item.subMenu && (
                <div className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded-lg py-2 w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.subMenu.map((subItem, subIndex) => (
                    <a key={subIndex} href={subItem.link} className="block px-4 py-2 text-sm hover:bg-gray-100">
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex space-x-4">
          <button className="text-black text-sm">Log in</button>
          <button className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm transition-transform hover:scale-105">
            Start free trial
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 text-white flex flex-col items-center space-y-5 p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        {/* Close Button */}
        <button className="absolute top-4 right-6 text-white" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>

        {navItems.map((item, index) => (
          <div key={index} className="w-full text-center">
            <div
              className="flex justify-between items-center py-3 cursor-pointer text-lg px-2"
              onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
            >
              <a href={item.link} className="w-full text-base">
                {item.name}
              </a>
              {item.subMenu && <ChevronDown size={16} />}
            </div>

            {/* Mobile Dropdown Menu */}
            {item.subMenu && openDropdown === index && (
              <div className="flex flex-col space-y-2 text-sm pl-4">
                {item.subMenu.map((subItem, subIndex) => (
                  <a key={subIndex} href={subItem.link} className="block py-2 text-base hover:underline">
                    {subItem.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        <button className="text-white mt-4 text-base">Log in</button>
        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold text-base">
          Start free trial
        </button>
      </div>
    </nav>
  );
}

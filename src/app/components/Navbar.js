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
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-black text-2xl font-bold flex items-center">
          <span className="bg-rose-600 text-white px-2 py-1 rounded-md">A</span>NAYA CANDLES
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-black ">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <a
                href={item.link || "#"}
                className="hover:underline flex items-center"
              >
                {item.name}
                {item.subMenu && <ChevronDown size={18} className="ml-1" />}
              </a>

              {/* Dropdown Menu (Only for items with subMenu) */}
              {item.subMenu && (
                <div className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded-lg py-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.subMenu.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.link}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
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
          <button className="text-black">Log in</button>
          <button className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm transition-transform hover:scale-105">
            Start free trial
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black bg-opacity-80 text-white flex flex-col space-y-4 p-6">
          {navItems.map((item, index) => (
            <div key={index}>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setOpenDropdown(openDropdown === index ? null : index)
                }
              >
                <a href={item.link} className="hover:underline">
                  {item.name}
                </a>
                {item.subMenu && <ChevronDown size={18} />}
              </div>

              {/* Submenu for Mobile */}
              {item.subMenu && openDropdown === index && (
                <div className="ml-4 mt-2 space-y-2">
                  {item.subMenu.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.link}
                      className="block hover:underline"
                    >
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="text-white mt-4">Log in</button>
          <button className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm">
            Start free trial
          </button>
        </div>
      )}
    </nav>
  );
}

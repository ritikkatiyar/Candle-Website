import { useState } from "react";

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    message: "",
  });

  if (!isOpen) return null; // Hide modal when not open

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your message has been sent! 🕯️");
    setFormData({ name: "", mobile: "", message: "" });
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-yellow bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ✖
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 text-center">Get in Touch</h2>
        <p className="text-gray-500 text-center mb-4">We’d love to hear from you! 🕯️</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Phone No"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 h-28"
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

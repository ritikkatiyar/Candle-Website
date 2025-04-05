import { useState } from "react";

export default function Contact({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("Server Response:", data);

    if (response.ok) {
      alert("Your message has been sent! 🕯️");
      setFormData({ name: "", mobile: "", message: "" });
      onClose();
    } else {
      alert(`Failed to send message: ${data.error || "Unknown error"}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg border border-white/10 relative transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-rose-400 text-lg"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-center mb-1 text-white">
          Get in Touch
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          We'd love to hear from you! 🕯️
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-800 text-white border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 placeholder-gray-400"
            required
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Your Phone No"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-800 text-white border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 placeholder-gray-400"
            required
          />

          <textarea
            name="message"
            placeholder="Your Address"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-800 text-white border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 h-28 placeholder-gray-400"
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-rose-600 hover:bg-rose-700 transition text-white font-semibold shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

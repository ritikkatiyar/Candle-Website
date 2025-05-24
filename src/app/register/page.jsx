"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserAlt, FaLock } from "react-icons/fa";

export default function RegisterPage() {
  const [name,setName]=useState("") 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Assume cookie is set on server
      router.push("/user");
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md bg-gray-900 shadow-xl rounded-2xl p-8 space-y-6 border border-gray-700">
        <h2 className="text-4xl font-extrabold text-center text-[#f0b101]">Sign Up</h2>
        <p className="text-center text-gray-400 text-lg">Create your account</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <FaUserAlt className="absolute left-4 top-3 text-gray-400" />
            <input
              type="name"
              placeholder="Name"
              className="w-full bg-gray-800 text-white placeholder-gray-400 pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FaUserAlt className="absolute left-4 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-800 text-white placeholder-gray-400 pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-800 text-white placeholder-gray-400 pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#f0b101] hover:bg-rose-600 transition-colors py-3 rounded-lg font-semibold text-white shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-[#f0b101] hover:underline transition">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

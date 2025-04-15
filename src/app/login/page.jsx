"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserAlt, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json(); 
    
    if (res.ok) {
      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    }    
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <div className="w-full max-w-md bg-gray-900 shadow-xl rounded-2xl p-10 space-y-6 border border-gray-700">
        <h2 className="text-4xl font-bold text-center text-rose-500">Login</h2>
        <p className="text-center text-gray-400">Access your dashboard</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-800 text-white placeholder-gray-400 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-800 text-white placeholder-gray-400 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 transition-colors py-3 rounded-lg font-semibold text-white shadow-lg"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-rose-400 hover:underline transition"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

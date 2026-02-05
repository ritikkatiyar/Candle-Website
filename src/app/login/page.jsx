"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaUserAlt, FaLock, FaHome } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
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
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md bg-gray-900 shadow-xl rounded-2xl p-6 sm:p-8 space-y-6 border border-gray-700 relative">
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 left-4 text-gray-400 hover:text-[#f0b101] transition-colors duration-200"
          title="Back to Home"
        >
          <FaHome size={20} />
        </button>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#f0b101]">Login</h2>
        <p className="text-center text-gray-400 text-base sm:text-lg">Access your dashboard</p>

                <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/user" })}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition-colors"
        >
          Continue with Google
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px bg-gray-700 flex-1"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="h-px bg-gray-700 flex-1"></div>
        </div>

<form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

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

          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-[#f0b101] hover:underline text-sm transition"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#f0b101] hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors py-3 rounded-lg font-semibold text-white shadow-lg"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-[#f0b101] hover:underline transition"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

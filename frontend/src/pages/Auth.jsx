import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { COLORS, BRAND } from "../constants/branding";

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [registerData, setRegisterData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/api/users/register", registerData);
      setSuccess("Account created successfully! Redirecting...");
      setRegisterData({ fullname: "", email: "", password: "" });
      setTimeout(() => navigate("/shop"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/api/users/login", loginData);
      setSuccess("Login successful! Redirecting...");
      setLoginData({ email: "", password: "" });
      setTimeout(() => navigate("/shop"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar loggedIn={false} />

      {/* Toast Notifications */}
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 z-50 font-bold text-xs uppercase tracking-widest shadow-lg animate-slideInFromTop">
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 z-50 font-bold text-xs uppercase tracking-widest shadow-lg animate-slideInFromTop">
          ✓ {success}
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Branding */}
            <div className="hidden md:flex flex-col justify-center items-start text-white">
              <div className="mb-10 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                <h1 className="text-6xl font-bold mb-2 uppercase tracking-tight" style={{ color: COLORS.accent }}>
                  Welcome
                </h1>
                <p className="text-sm text-gray-400 uppercase tracking-wider">{BRAND.tagline}</p>
              </div>

              <div className="space-y-6 text-gray-300">
                <div className="flex items-start gap-4 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                  <span className="text-3xl mt-1">💼</span>
                  <div>
                    <p className="font-bold text-white uppercase tracking-wide text-sm">Premium Bags</p>
                    <p className="text-xs font-light text-gray-400 uppercase tracking-wide mt-1">Exclusive collection</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                  <span className="text-3xl mt-1">🚀</span>
                  <div>
                    <p className="font-bold text-white uppercase tracking-wide text-sm">Quick Shipping</p>
                    <p className="text-xs font-light text-gray-400 uppercase tracking-wide mt-1">Fast delivery</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                  <span className="text-3xl mt-1">🔐</span>
                  <div>
                    <p className="font-bold text-white uppercase tracking-wide text-sm">Secure Checkout</p>
                    <p className="text-xs font-light text-gray-400 uppercase tracking-wide mt-1">Protected payment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="bg-white shadow-2xl p-10 border border-gray-200 animate-fadeInDown" style={{ animationDelay: '200ms' }}>
              {/* Tabs */}
              <div className="flex gap-4 mb-10 border-b border-gray-200 pb-4">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`py-2 px-0 font-bold uppercase tracking-widest text-xs transition-all duration-300 border-b-2 ${
                    activeTab === "login"
                      ? "text-black border-yellow-600"
                      : "text-gray-400 border-transparent hover:text-gray-600"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`py-2 px-0 font-bold uppercase tracking-widest text-xs transition-all duration-300 border-b-2 ${
                    activeTab === "register"
                      ? "text-black border-yellow-600"
                      : "text-gray-400 border-transparent hover:text-gray-600"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Login Form */}
              {activeTab === "login" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-black mb-1 uppercase tracking-tight">Welcome Back</h2>
                  <p className="text-xs text-gray-500 mb-8 uppercase tracking-wide font-light">Login to your account</p>

                  <form onSubmit={handleLogin} autoComplete="off" className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-black mb-3 uppercase tracking-widest">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        className="w-full px-0 py-3 border-b border-gray-300 focus:outline-none focus:border-yellow-600 bg-transparent text-black placeholder-gray-400 text-sm transition-colors duration-300 tracking-wide"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-3 uppercase tracking-widest">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({ ...loginData, password: e.target.value })
                        }
                        className="w-full px-0 py-3 border-b border-gray-300 focus:outline-none focus:border-yellow-600 bg-transparent text-black placeholder-gray-400 text-sm transition-colors duration-300 tracking-wide"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 px-4 bg-yellow-600 text-black font-bold uppercase tracking-widest text-xs hover:bg-yellow-500 active:scale-95 transition-all duration-300 mt-8"
                    >
                      Login
                    </button>
                  </form>

                  <p className="text-center text-xs text-gray-500 mt-6 uppercase tracking-wide">
                    Don't have an account?{" "}
                    <button
                      onClick={() => setActiveTab("register")}
                      className="text-yellow-600 font-bold hover:text-yellow-500 transition-colors duration-300"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              )}

              {/* Register Form */}
              {activeTab === "register" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-black mb-1 uppercase tracking-tight">Create Account</h2>
                  <p className="text-xs text-gray-500 mb-8 uppercase tracking-wide font-light">Join {BRAND.name} today</p>

                  <form onSubmit={handleRegister} autoComplete="off" className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-black mb-3 uppercase tracking-widest">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={registerData.fullname}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            fullname: e.target.value,
                          })
                        }
                        className="w-full px-0 py-3 border-b border-gray-300 focus:outline-none focus:border-yellow-600 bg-transparent text-black placeholder-gray-400 text-sm transition-colors duration-300 tracking-wide"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-3 uppercase tracking-widest">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={registerData.email}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-0 py-3 border-b border-gray-300 focus:outline-none focus:border-yellow-600 bg-transparent text-black placeholder-gray-400 text-sm transition-colors duration-300 tracking-wide"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-3 uppercase tracking-widest">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                        className="w-full px-0 py-3 border-b border-gray-300 focus:outline-none focus:border-yellow-600 bg-transparent text-black placeholder-gray-400 text-sm transition-colors duration-300 tracking-wide"
                        required
                      />
                    </div>

                    <p className="text-xs text-gray-500 font-light uppercase tracking-wide">
                      By creating an account, you agree to our Terms & Privacy Policy
                    </p>

                    <button
                      type="submit"
                      className="w-full py-4 px-4 bg-yellow-600 text-black font-bold uppercase tracking-widest text-xs hover:bg-yellow-500 active:scale-95 transition-all duration-300 mt-8"
                    >
                      Create Account
                    </button>
                  </form>

                  <p className="text-center text-xs text-gray-500 mt-6 uppercase tracking-wide">
                    Already have an account?{" "}
                    <button
                      onClick={() => setActiveTab("login")}
                      className="text-yellow-600 font-bold hover:text-yellow-500 transition-colors duration-300"
                    >
                      Login
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Auth;

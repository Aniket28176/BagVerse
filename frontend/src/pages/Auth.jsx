import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { COLORS, BRAND } from "../constants/branding";

const Auth = () => {
const navigate = useNavigate();

const [activeTab, setActiveTab] = useState("login");
const [role, setRole] = useState("user");
const [adminSecret, setAdminSecret] = useState("");

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

/* ================= REGISTER ================= */
const handleRegister = async (e) => {
e.preventDefault();
setError("");
setSuccess("");

try {
  const payload = {
    ...registerData,
    role,
  };

  // 🔐 Admin requires secret
  if (role === "admin") {
    payload.secret = adminSecret;
  }

  await api.post("/api/users/register", payload);

  setSuccess("Account created! Redirecting...");
  setRegisterData({ fullname: "", email: "", password: "" });
  setAdminSecret("");

  setTimeout(() => {
    navigate(role === "admin" ? "/admin" : "/shop");
  }, 1500);

} catch (err) {
  setError(err.response?.data?.message || "Registration failed");
}


};

/* ================= LOGIN ================= */
const handleLogin = async (e) => {
e.preventDefault();
setError("");
setSuccess("");

try {
  const res = await api.post("/api/users/login", loginData);

  setSuccess("Login successful!");
  setLoginData({ email: "", password: "" });

  const userRole = res.data.user.role;

  setTimeout(() => {
    navigate(userRole === "admin" ? "/admin" : "/shop");
  }, 1500);

} catch (err) {
  setError(err.response?.data?.message || "Login failed");
}


};

return (
<> <Navbar loggedIn={false} />

  {/* TOASTS */}
  {error && (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-sm font-semibold">
      ⚠️ {error}
    </div>
  )}
  {success && (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-sm font-semibold">
      ✓ {success}
    </div>
  )}

  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-12">

    <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

      {/* LEFT */}
      <div className="hidden md:flex flex-col justify-center p-10 text-white">
        <h1 className="text-5xl font-bold mb-4" style={{ color: COLORS.accent }}>
          {BRAND.name}
        </h1>
        <p className="text-gray-400 mb-8">{BRAND.tagline}</p>

        <ul className="space-y-4 text-sm">
          <li>✨ Premium Quality Products</li>
          <li>🚀 Fast Delivery</li>
          <li>🔐 Secure Checkout</li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="p-8 md:p-12 bg-white rounded-l-3xl">

        {/* TABS */}
        <div className="flex mb-8 border-b">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-3 text-sm font-bold uppercase tracking-widest transition ${
                activeTab === tab
                  ? "border-b-2 border-yellow-600 text-black"
                  : "text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* LOGIN */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} className="space-y-6">

            {/* ROLE SWITCH */}
            <div className="flex gap-2">
              {["user", "admin"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold uppercase ${
                    role === r
                      ? "bg-yellow-600 text-black"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full border-b py-3 focus:outline-none focus:border-yellow-600"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full border-b py-3 focus:outline-none focus:border-yellow-600"
              required
            />

            <button className="w-full bg-yellow-600 text-black py-3 font-bold uppercase hover:bg-yellow-500 transition">
              Login
            </button>
          </form>
        )}

        {/* REGISTER */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister} className="space-y-5">

            {/* ROLE SWITCH */}
            <div className="flex gap-2">
              {["user", "admin"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold uppercase ${
                    role === r
                      ? "bg-yellow-600 text-black"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* ADMIN SECRET */}
            {role === "admin" && (
              <input
                type="password"
                placeholder="Admin Secret Key"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                className="w-full border-b py-3 focus:outline-none focus:border-yellow-600"
                required
              />
            )}

            <input
              type="text"
              placeholder="Full Name"
              value={registerData.fullname}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  fullname: e.target.value,
                })
              }
              className="w-full border-b py-3 focus:outline-none focus:border-yellow-600"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                })
              }
              className="w-full border-b py-3 focus:outline-none focus:border-yellow-600"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  password: e.target.value,
                })
              }
              className="w-full border-b py-3 focus:outline-none focus:border-yellow-600"
              required
            />

            <button className="w-full bg-yellow-600 text-black py-3 font-bold uppercase hover:bg-yellow-500 transition">
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  </div>

  <Footer />
</>

);
};

export default Auth;

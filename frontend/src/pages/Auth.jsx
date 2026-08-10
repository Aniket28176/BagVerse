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
  const [ownerPhone, setOwnerPhone] = useState("");
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
      const payload = { ...registerData };

      let route = "/api/users/register";
      if (role === "admin") {
        route = "/api/owners/create";
        payload.phone = ownerPhone;
      }

      await api.post(route, payload);

      setSuccess("Account created! Redirecting...");
      setRegisterData({ fullname: "", email: "", password: "" });
      setOwnerPhone("");

      setTimeout(() => {
        navigate(role === "admin" ? "/admin" : "/shop");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const route = role === "admin" ? "/api/owners/login" : "/api/users/login";
      await api.post(route, loginData);

      setSuccess("Login successful!");
      setLoginData({ email: "", password: "" });

      setTimeout(() => {
        navigate(role === "admin" ? "/admin" : "/shop");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar loggedIn={false} />

      {/* Toasts */}
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-red-500/90 backdrop-blur text-white px-6 py-3 rounded-xl shadow-2xl z-50 text-sm font-semibold animate-drop">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-emerald-500/90 backdrop-blur text-white px-6 py-3 rounded-xl shadow-2xl z-50 text-sm font-semibold animate-drop">
          ✓ {success}
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4 py-12 relative overflow-hidden">
        {/* Animated glow orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] animate-drift"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-[100px] animate-drift-reverse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] animate-pulse-glow"></div>

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        {/* Main Card */}
        <div className="w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden relative z-10 animate-rise shadow-[0_0_80px_rgba(124,58,237,0.15)]">
          {/* ===== LEFT ===== */}
          <div className="hidden lg:flex flex-col justify-between p-12 relative bg-gradient-to-br from-violet-950 via-[#0f0f1a] to-cyan-950">
            {/* decorative rings */}
            <div className="absolute top-10 right-10 w-40 h-40 border border-white/5 rounded-full"></div>
            <div className="absolute top-16 right-16 w-28 h-28 border border-white/10 rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 border border-violet-500/20 rounded-2xl rotate-12"></div>

            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-14">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <span className="text-white font-black text-lg">
                    {BRAND.name.charAt(0)}
                  </span>
                </div>
                <span className="text-white font-bold text-xl tracking-tight">
                  {BRAND.name}
                </span>
              </div>

              <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
                Step into the
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                  future of shopping.
                </span>
              </h2>

              <p className="text-slate-400 leading-relaxed mb-12">
                {BRAND.tagline}
              </p>

              {/* Features */}
              <div className="space-y-4">
                {[
                  {
                    icon: "◆",
                    title: "Curated Collection",
                    desc: "Handpicked premium products",
                  },
                  {
                    icon: "⚡",
                    title: "Instant Delivery",
                    desc: "Get your orders lightning fast",
                  },
                  {
                    icon: "🛡",
                    title: "Fully Secured",
                    desc: "End-to-end encrypted checkout",
                  },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 group-hover:border-violet-500/30 transition-all duration-300">
                      {f.icon}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{f.title}</p>
                      <p className="text-slate-500 text-xs">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3 text-slate-600 text-xs">
              <div className="flex -space-x-2">
                {[
                  "bg-violet-500",
                  "bg-cyan-500",
                  "bg-fuchsia-500",
                  "bg-blue-500",
                ].map((c, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full ${c} border-2 border-[#0f0f1a]`}
                  ></div>
                ))}
              </div>
              <span>Trusted by 10k+ customers</span>
            </div>
          </div>

          {/* ===== RIGHT ===== */}
          <div className="bg-[#111118] p-8 lg:p-12 border border-white/5 lg:border-l-0 rounded-3xl lg:rounded-l-none">
            {/* Tabs */}
            <div className="flex mb-10 relative">
              <div
                className={`absolute bottom-0 h-0.5 w-1/2 bg-gradient-to-r from-violet-500 to-cyan-500 transition-transform duration-300 rounded-full ${
                  activeTab === "register" ? "translate-x-full" : ""
                }`}
              ></div>

              {["login", "register"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    if (tab === 'login') {
                      setRole('user');
                      setOwnerPhone('');
                    }
                  }}
                  className={`flex-1 pb-3 text-sm font-bold uppercase tracking-widest transition-colors duration-200 ${
                    activeTab === tab
                      ? "text-white"
                      : "text-slate-600 hover:text-slate-400"
                  }`}
                >
                  {tab === "login" ? "Sign In" : "Register"}
                </button>
              ))}
            </div>

            {/* Role Toggle */}
            <div className="flex gap-2 mb-8">
              {["user", "admin"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r);
                    setOwnerPhone("");
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                    role === r
                      ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white border-transparent shadow-lg shadow-violet-500/25"
                      : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* ===== LOGIN FORM ===== */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="space-y-5 animate-fade">
                <Field
                  label="Email"
                  type="email"
                  value={loginData.email}
                  onChange={(v) => setLoginData({ ...loginData, email: v })}
                />

                <Field
                  label="Password"
                  type="password"
                  value={loginData.password}
                  onChange={(v) => setLoginData({ ...loginData, password: v })}
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 active:scale-[0.98]"
                >
                  Sign In →
                </button>
              </form>
            )}

            {/* ===== REGISTER FORM ===== */}
            {activeTab === "register" && (
              <form onSubmit={handleRegister} className="space-y-5 animate-fade">
                {role === "admin" && (
                  <Field
                    label="Owner Phone Number"
                    type="tel"
                    value={ownerPhone}
                    onChange={setOwnerPhone}
                  />
                )}

                <Field
                  label="Full Name"
                  type="text"
                  value={registerData.fullname}
                  onChange={(v) =>
                    setRegisterData({ ...registerData, fullname: v })
                  }
                />

                <Field
                  label="Email"
                  type="email"
                  value={registerData.email}
                  onChange={(v) => setRegisterData({ ...registerData, email: v })}
                />

                <Field
                  label="Password"
                  type="password"
                  value={registerData.password}
                  onChange={(v) =>
                    setRegisterData({ ...registerData, password: v })
                  }
                />

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 active:scale-[0.98]"
                >
                  Create Account →
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-xs text-slate-600">or continue with</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-3 gap-3">
              {["Google", "GitHub", "Apple"].map((s) => (
                <button
                  key={s}
                  type="button"
                  className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs font-semibold hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes drift {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }

        @keyframes drift-reverse {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, 30px);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes drop {
          from {
            opacity: 0;
            transform: translate(-50%, -12px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .animate-drift {
          animation: drift 8s ease-in-out infinite;
        }

        .animate-drift-reverse {
          animation: drift-reverse 10s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 6s ease-in-out infinite;
        }

        .animate-rise {
          animation: rise 0.5s ease-out;
        }

        .animate-fade {
          animation: fade 0.3s ease-out;
        }

        .animate-drop {
          animation: drop 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

/* ===== Reusable Input Field ===== */
const Field = ({ label, type, value, onChange, accent }) => (
  <div className="relative">
    <input
      type={type}
      placeholder=" "
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className={`peer w-full px-4 py-3.5 bg-white/5 border rounded-xl text-white text-sm focus:outline-none transition-all duration-200 placeholder-transparent ${
        accent
          ? "border-red-500/30 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
          : "border-white/10 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
      }`}
    />

    <label className="absolute left-4 -top-2.5 px-1.5 text-xs font-semibold bg-[#111118] text-slate-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-600 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-violet-400">
      {label}
    </label>
  </div>
);

export default Auth;
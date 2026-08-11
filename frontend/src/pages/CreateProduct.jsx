import { useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    bgcolor: "",
    panelcolor: "",
    textcolor: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===============================
     HANDLE INPUT
     =============================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ===============================
     HANDLE IMAGE
     =============================== */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /* ===============================
     HANDLE SUBMIT
     =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!image) {
      return setError("Please upload an image");
    }

    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("image", image);

      await api.post("/api/products/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Product created successfully!");

      setFormData({
        name: "",
        price: "",
        discount: "",
        bgcolor: "",
        panelcolor: "",
        textcolor: "",
      });

      setImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------- CUSTOM ANIMATIONS & GLASS STYLES ---------- */
  const styles = `
    @keyframes floatOrb {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(40px, -40px) scale(1.1); }
      66% { transform: translate(-30px, 30px) scale(0.9); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translate(-50%, -20px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .animate-orb-1 { animation: floatOrb 14s ease-in-out infinite; }
    .animate-orb-2 { animation: floatOrb 18s ease-in-out infinite reverse; }
    .animate-orb-3 { animation: floatOrb 22s ease-in-out infinite; }
    .animate-shimmer-text {
      background-size: 200% auto;
      animation: shimmer 4s linear infinite;
    }
    .animate-slide-down { animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
    .animate-spin-slow { animation: spin 1.5s linear infinite; }
    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .glass-input {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }
    .glass-input:focus {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(139, 92, 246, 0.5);
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
    }
    .sidebar-link {
      transition: all 0.3s ease;
      position: relative;
    }
    .sidebar-link::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 0;
      background: linear-gradient(to right, rgba(139, 92, 246, 0.3), transparent);
      transition: width 0.3s ease;
      border-radius: 4px 0 0 4px;
    }
    .sidebar-link:hover::before {
      width: 4px;
    }
    .color-swatch {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      border: 2px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }
    .color-swatch:hover {
      transform: scale(1.1);
      border-color: rgba(139, 92, 246, 0.5);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <Navbar loggedIn={true} isAdmin={true} />

      <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#12082a] to-[#0a0a1a] relative overflow-hidden">
        {/* ══════════ ANIMATED BACKGROUND ══════════ */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-[120px] animate-orb-1" />
          <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[130px] animate-orb-2" />
          <div className="absolute top-[50%] left-[60%] w-[350px] h-[350px] rounded-full bg-fuchsia-600/10 blur-[110px] animate-orb-3" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* ---------- SUCCESS TOAST ---------- */}
        {success && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
            <div className="glass-card border-l-4 border-emerald-500 rounded-xl px-6 py-4 flex items-center gap-3 shadow-xl shadow-emerald-500/10">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white font-medium">{success}</span>
            </div>
          </div>
        )}

        {/* ---------- ERROR TOAST ---------- */}
        {error && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
            <div className="glass-card border-l-4 border-red-500 rounded-xl px-6 py-4 flex items-center gap-3 shadow-xl shadow-red-500/10">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="text-white font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* ---------- MAIN CONTENT ---------- */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ══════════ SIDEBAR ══════════ */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="glass-card rounded-3xl p-6 sticky top-24">
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                    Admin Panel
                  </h3>
                  <p className="text-xs text-slate-500">Quick Actions</p>
                </div>

                <nav className="space-y-2">
                  <Link
                    to="/admin/products"
                    className="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-cyan-500/10 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">All Products</p>
                      <p className="text-xs text-slate-500">View catalog</p>
                    </div>
                  </Link>

                  <Link
                    to="/admin/products/create"
                    className="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-400/30 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/30 to-purple-500/30 border border-violet-400/30 flex items-center justify-center">
                      <svg className="w-5 h-5 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">Create Product</p>
                      <p className="text-xs text-slate-400">Add new item</p>
                    </div>
                  </Link>

                  <Link
                    to="/admin/dashboard"
                    className="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-cyan-500/10 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Dashboard</p>
                      <p className="text-xs text-slate-500">Overview & stats</p>
                    </div>
                  </Link>
                </nav>

                {/* Help Text */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-xs font-semibold text-white mb-1">Tip</p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Use hex color codes for custom colors (e.g., #FF5733)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* ══════════ MAIN FORM ══════════ */}
            <main className="flex-1 min-w-0">
              {/* Header */}
              <div className="mb-8 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent animate-shimmer-text tracking-tight">
                  Create New Product
                </h1>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
                  <p className="text-xs text-slate-300 uppercase tracking-[0.2em] font-light">
                    Add a new product to your catalog
                  </p>
                </div>
              </div>

              {/* Form Card */}
              <form onSubmit={handleSubmit} autoComplete="off" className="glass-card rounded-3xl p-8 md:p-10">
                
                {/* ══════════ IMAGE UPLOAD ══════════ */}
                <div className="mb-10 animate-fade-in-up">
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
                    Product Image
                  </label>
                  
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      required
                    />
                    
                    <label
                      htmlFor="image-upload"
                      className="block cursor-pointer"
                    >
                      {imagePreview ? (
                        <div className="relative group">
                          <div className="aspect-video rounded-2xl overflow-hidden border-2 border-violet-500/30 bg-black/20">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                            <div className="text-center">
                              <svg className="w-12 h-12 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p className="text-white font-semibold">Click to change image</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-video rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.02] flex flex-col items-center justify-center hover:border-violet-500/50 hover:bg-violet-500/5 transition-all duration-300">
                          <div className="w-20 h-20 rounded-full bg-violet-500/10 border border-violet-400/20 flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-white font-semibold mb-1">Click to upload image</p>
                          <p className="text-xs text-slate-400">PNG, JPG, WEBP up to 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* ══════════ BASIC INFO ══════════ */}
                <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-400/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Product Name
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Luxury Leather Tote"
                        className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Price (₹)
                      </label>
                      <input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        type="number"
                        placeholder="2999"
                        className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Discount (%)
                      </label>
                      <input
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        type="number"
                        placeholder="10"
                        className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* ══════════ COLORS ══════════ */}
                <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    Color Scheme
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Background Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          name="bgcolor"
                          value={formData.bgcolor}
                          onChange={handleChange}
                          placeholder="#FFFFFF"
                          className="glass-input flex-1 px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                        />
                        {formData.bgcolor && (
                          <div
                            className="color-swatch flex-shrink-0"
                            style={{ backgroundColor: formData.bgcolor }}
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Panel Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          name="panelcolor"
                          value={formData.panelcolor}
                          onChange={handleChange}
                          placeholder="#F3F4F6"
                          className="glass-input flex-1 px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                        />
                        {formData.panelcolor && (
                          <div
                            className="color-swatch flex-shrink-0"
                            style={{ backgroundColor: formData.panelcolor }}
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Text Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          name="textcolor"
                          value={formData.textcolor}
                          onChange={handleChange}
                          placeholder="#1F2937"
                          className="glass-input flex-1 px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                        />
                        {formData.textcolor && (
                          <div
                            className="color-swatch flex-shrink-0"
                            style={{ backgroundColor: formData.textcolor }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ══════════ SUBMIT BUTTON ══════════ */}
                <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                      loading
                        ? "bg-slate-600/50 text-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-[0.98]"
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating Product...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Product
                      </>
                    )}
                  </button>
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CreateProduct;
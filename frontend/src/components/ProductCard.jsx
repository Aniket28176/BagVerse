import { Link } from "react-router-dom";
import api from "../utils/api";
import { useState } from "react";
import { COLORS } from "../constants/branding";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const rating = (Math.random() * (5 - 4) + 4).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 100) + 10;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/cart/add", { productId: product._id });
      setSuccess("Added to cart!");
      setTimeout(() => setSuccess(""), 2500);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setSuccess("Error adding to cart");
      setTimeout(() => setSuccess(""), 2500);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- CUSTOM ANIMATIONS & GLASS STYLES ---------- */
  const styles = `
    @keyframes slideInFromTop {
      from { opacity: 0; transform: translate(-50%, -20px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
      50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.5); }
    }
    .animate-slide-in-from-top { animation: slideInFromTop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
    .animate-shimmer-text {
      background-size: 200% auto;
      animation: shimmer 4s linear infinite;
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .glass-card-hover:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(168, 85, 247, 0.4);
      box-shadow: 0 20px 60px rgba(139, 92, 246, 0.2);
      transform: translateY(-4px);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div
        className="glass-card glass-card-hover rounded-2xl overflow-hidden transition-all duration-500 animate-fade-in-up relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ══════════ IMAGE CONTAINER ══════════ */}
        <div
          className="relative w-full h-80 overflow-hidden"
          style={{ backgroundColor: product.bgcolor || "#1a1a2e" }}
        >
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />

          {/* Image with zoom effect */}
          <img
            className={`w-full h-full object-contain transition-transform duration-700 ease-out ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.name}
          />

          {/* Badge */}
          <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-violet-500/30">
            New
          </div>

          {/* Discount Badge */}
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.15em] shadow-lg shadow-emerald-500/30">
            20% OFF
          </div>

          {/* Quick Add Button - Floating */}
          <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-xs rounded-xl hover:from-violet-500 hover:to-purple-500 active:scale-95 transition-all duration-200 shadow-xl shadow-violet-500/40 uppercase tracking-[0.15em] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Adding...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>

        {/* ══════════ INFO CONTAINER ══════════ */}
        <div className="p-6">
          {/* Product Name */}
          <h3 className="text-white font-semibold text-base mb-3 line-clamp-2 group-hover:text-violet-300 transition-colors duration-300 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? "text-amber-400" : "text-white/20"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-slate-400 font-medium">({reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-5 flex items-baseline gap-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent">
              ₹{product.price}
            </span>
            <span className="text-sm text-slate-500 line-through">
              ₹{Math.round(product.price * 1.2)}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-xs text-slate-400 mb-6 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="flex-1 py-3 border border-white/10 text-white/80 font-semibold text-xs rounded-xl hover:bg-white/5 hover:border-violet-500/40 hover:text-white transition-all duration-300 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add
                </>
              )}
            </button>

            <Link
              to={`/buynow/${product._id}`}
              className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-xs rounded-xl hover:from-violet-500 hover:to-purple-500 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 text-center uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Buy Now
            </Link>
          </div>
        </div>

        {/* ══════════ SUCCESS TOAST ══════════ */}
        {success && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-in-from-top">
            <div
              className={`glass-card rounded-xl px-6 py-4 flex items-center gap-3 shadow-xl ${
                success.includes("Added")
                  ? "border-l-4 border-emerald-500 shadow-emerald-500/10"
                  : "border-l-4 border-red-500 shadow-red-500/10"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  success.includes("Added") ? "bg-emerald-500/20" : "bg-red-500/20"
                }`}
              >
                {success.includes("Added") ? (
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <span className="text-white font-medium text-sm">{success}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;

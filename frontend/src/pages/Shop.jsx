import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import HeroBanner from "../components/HeroBanner";
import { SkeletonGrid } from "../components/Skeleton";

const Shop = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        let url = `/api/products?sort=${sortBy}`;
        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }
        const res = await api.get(url);

        const productList = Array.isArray(res.data.products)
          ? res.data.products
          : [];

        setProducts(productList);
      } catch (err) {
        console.error(err);
        setProducts([]);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortBy, searchTerm]);

  const sortOptions = [
    { value: "popular", label: "Popular", icon: "🔥" },
    { value: "newest", label: "Newest", icon: "✨" },
    { value: "priceLow", label: "Price ↑", icon: "💰" },
    { value: "priceHigh", label: "Price ↓", icon: "💎" },
  ];

  return (
    <>
      <Navbar loggedIn={true} isAdmin={false} />
      <HeroBanner />

      <div className="w-full min-h-screen bg-[#0a0a0f] relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] animate-drift"></div>
          <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] animate-drift-reverse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-600/5 rounded-full blur-[150px] animate-pulse-glow"></div>
        </div>

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          {/* Section Header */}
          <div className="mb-12 animate-hero-text">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-1 w-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"></div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
                {searchTerm ? "Search Results" : "Premium Collection"}
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-none">
              {searchTerm ? (
                <>
                  <span className="text-white/40">Results for</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 animate-gradient-text">
                    "{searchTerm}"
                  </span>
                </>
              ) : (
                <>
                  <span className="text-white">Discover</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 animate-gradient-text">
                    Our Collection
                  </span>
                </>
              )}
            </h1>

            <p className="text-lg text-slate-400 font-light max-w-2xl">
              {searchTerm
                ? `Found ${products.length} items matching your search`
                : "Explore our curated selection of premium luxury bags, crafted for those who appreciate excellence"}
            </p>
          </div>

          {/* Control Panel */}
          <div className="mb-12 animate-control-panel">
            <div className="relative p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl">
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/20 via-transparent to-cyan-500/20 blur-xl opacity-50 pointer-events-none"></div>

              <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Sort Pills */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Sort By
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                          sortBy === option.value
                            ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-500/30 scale-105"
                            : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <span className="mr-2">{option.icon}</span>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* View Toggle & Count */}
                <div className="flex items-center gap-6">
                  {/* Product Count Badge */}
                  {products.length > 0 && (
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-600">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                          {products.length}
                        </div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">Products</div>
                      </div>
                    </div>
                  )}

                  {/* View Toggle */}
                  <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2.5 rounded-lg transition-all duration-300 ${
                        viewMode === "grid"
                          ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2.5 rounded-lg transition-all duration-300 ${
                        viewMode === "list"
                          ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {error ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center animate-fade-in">
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 mb-8">
                  <div className="absolute inset-0 rounded-full bg-red-500/10 animate-ping"></div>
                  <svg
                    className="relative w-12 h-12 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <p className="text-xl text-red-400 font-bold mb-8">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="group px-10 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 active:scale-95"
                >
                  <span className="flex items-center gap-2">
                    Try Again
                    <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          ) : loading ? (
            <SkeletonGrid count={8} />
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center animate-fade-in">
                <div className="relative inline-flex items-center justify-center w-32 h-32 mb-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 animate-pulse"></div>
                  <svg
                    className="relative w-16 h-16 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-2xl text-slate-400 font-light mb-8">
                  No products found
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="group px-10 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 active:scale-95"
                >
                  <span className="flex items-center gap-2">
                    Refresh
                    <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                : "flex flex-col gap-6"
            }>
              {products.map((product, idx) => (
                <div
                  key={product._id}
                  className="animate-card-appear"
                  style={{
                    animationDelay: `${idx * 80}ms`,
                    animationFillMode: 'forwards',
                    opacity: 0,
                  }}
                >
                  <ProductCard product={product} viewMode={viewMode} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -40px) scale(1.1); }
        }
        @keyframes drift-reverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 40px) scale(1.1); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes hero-text {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes control-panel {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes card-appear {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-drift { animation: drift 12s ease-in-out infinite; }
        .animate-drift-reverse { animation: drift-reverse 14s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 8s ease-in-out infinite; }
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 4s ease infinite;
        }
        .animate-hero-text { animation: hero-text 0.8s ease-out; }
        .animate-control-panel { animation: control-panel 0.8s ease-out 0.2s backwards; }
        .animate-card-appear { animation: card-appear 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
      `}</style>
    </>
  );
};

export default Shop;
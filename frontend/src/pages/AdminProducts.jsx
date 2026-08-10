import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminProductCard from "../components/AdminProductCard";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState("");

  /* ===============================
     FETCH PRODUCTS
     =============================== */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products/admin");

        setProducts(res.data.products || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setError("");
    setSuccess("");
    setActionLoadingId(productId);

    try {
      await api.delete(`/api/products/${productId}`);
      setProducts((prev) => prev.filter((product) => product._id !== productId));
      setSuccess("Product deleted successfully.");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete product");
    } finally {
      setActionLoadingId("");
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
    .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
    .animate-spin-slow { animation: spin 1.5s linear infinite; }
    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .glass-card-hover:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(168, 85, 247, 0.4);
      box-shadow: 0 10px 40px rgba(139, 92, 246, 0.15);
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
    }
    .sidebar-link:hover::before {
      width: 4px;
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
                    to="/admin/products/create"
                    className="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-cyan-500/10 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Create Product</p>
                      <p className="text-xs text-slate-500">Add new item</p>
                    </div>
                  </Link>

                  <Link
                    to="/admin/dashboard"
                    className="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-cyan-500/10 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Dashboard</p>
                      <p className="text-xs text-slate-500">Overview & stats</p>
                    </div>
                  </Link>

                  <Link
                    to="/"
                    className="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-cyan-500/10 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Back to Home</p>
                      <p className="text-xs text-slate-500">Exit admin panel</p>
                    </div>
                  </Link>
                </nav>

                {/* Stats Preview */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="glass-card rounded-xl p-4">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Total Products</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                        {products.length}
                      </span>
                      <span className="text-sm text-slate-500">items</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* ══════════ MAIN CONTENT ══════════ */}
            <main className="flex-1 min-w-0">
              {/* Header */}
              <div className="mb-10 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent animate-shimmer-text tracking-tight">
                  Product Management
                </h1>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
                  <p className="text-xs text-slate-300 uppercase tracking-[0.2em] font-light">
                    View and manage all products
                  </p>
                </div>
              </div>

              {/* ---------- CONTENT STATES ---------- */}
              {loading ? (
                <div className="flex items-center justify-center py-32">
                  <div className="glass-card rounded-3xl p-12 text-center">
                    <div className="relative inline-block mb-6">
                      <div className="h-16 w-16 rounded-full border-4 border-white/10"></div>
                      <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-transparent border-t-violet-500 border-r-purple-500 animate-spin-slow"></div>
                    </div>
                    <p className="text-xl text-white font-semibold bg-gradient-to-r from-violet-300 via-white to-purple-300 bg-clip-text text-transparent animate-shimmer-text">
                      Loading products...
                    </p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-20 animate-fade-in-up">
                  <div className="glass-card rounded-3xl p-12 md:p-16 text-center max-w-2xl mx-auto border-l-4 border-red-500">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-400/20 flex items-center justify-center text-4xl">
                      ⚠️
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{error}</h3>
                    <p className="text-slate-400 mb-6">Please check your connection and try again.</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-95 transition-all duration-300"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : products.length === 0 ? (
                <div className="flex items-center justify-center py-20 animate-fade-in-up">
                  <div className="glass-card rounded-3xl p-12 md:p-16 text-center max-w-2xl mx-auto relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/20 blur-3xl rounded-full" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/20 blur-3xl rounded-full" />
                    
                    <div className="relative">
                      <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-violet-500/10 border border-violet-400/20 flex items-center justify-center text-5xl">
                        📦
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent mb-4 tracking-tight">
                        No products found
                      </h3>
                      <p className="text-slate-400 mb-10 text-sm uppercase tracking-[0.2em] font-light">
                        Your catalog is currently empty
                      </p>
                      <Link
                        to="/admin/products/create"
                        className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        Create First Product
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((p, idx) => (
                    <div 
                      key={p._id} 
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className="glass-card glass-card-hover rounded-2xl p-3 transition-all duration-300 h-full">
                        <AdminProductCard
                        product={p}
                        onDelete={handleDelete}
                        isDeleting={actionLoadingId === p._id}
                      />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminProducts;
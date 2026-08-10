import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Logo from "./Logo";

const Navbar = ({ loggedIn = false, isAdmin = false }) => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* ===============================
     CART COUNT
     =============================== */
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!loggedIn) return setCartCount(0);
      try {
        const res = await api.get("/api/cart");
        setCartCount(res.data.items?.length || 0);
      } catch (err) {
        if (err.response?.status === 401) setCartCount(0);
      }
    };
    fetchCartCount();
  }, [loggedIn]);

  /* ===============================
     LOGOUT
     =============================== */
  const handleLogout = async () => {
    try {
      await api.post("/api/users/logout");
      navigate("/auth");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  /* ===============================
     SEARCH
     =============================== */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  /* ---------- CUSTOM ANIMATIONS ---------- */
  const styles = `
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 15px rgba(139, 92, 246, 0.3); }
      50% { box-shadow: 0 0 25px rgba(168, 85, 247, 0.5); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
    .animate-shimmer-text {
      background-size: 200% auto;
      animation: shimmer 4s linear infinite;
    }
    .animate-pulse-glow {
      animation: pulse-glow 3s ease-in-out infinite;
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    .glass-nav {
      background: rgba(10, 10, 15, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    .nav-link {
      position: relative;
      transition: all 0.3s ease;
    }
    .nav-link::before {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(to right, #a855f7, #06b6d4);
      transition: width 0.3s ease;
    }
    .nav-link:hover::before {
      width: 100%;
    }
    .nav-link:hover {
      text-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
    }
  `;

  /* ===============================
     ADMIN NAVBAR
     =============================== */
  if (isAdmin) {
    return (
      <>
        <style>{styles}</style>
        <nav className="sticky top-0 z-50 glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

            {/* Logo & Brand */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-cyan-600 blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative">
                  <Logo size={36} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl tracking-tight">BagVerse</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Admin Portal
                </span>
              </div>
            </Link>

            {/* Admin Links */}
            <div className="flex items-center gap-8 text-sm font-semibold">
              <Link
                to="/admin/dashboard"
                className="nav-link text-white/80 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Dashboard
                </span>
              </Link>
              <Link
                to="/admin/products"
                className="nav-link text-white/80 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Products
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-400 hover:from-red-500/20 hover:to-pink-500/20 hover:text-red-300 border border-red-500/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </>
    );
  }

  /* ===============================
     USER NAVBAR
     =============================== */
  return (
    <>
      <style>{styles}</style>
      <nav className="sticky top-0 z-50 glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

          {/* LEFT: Logo & Home */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-cyan-600 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-violet-500/20 to-cyan-500/20 p-2 rounded-xl border border-white/10">
                <Logo size={32} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl tracking-tight group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                BagVerse
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                Luxury Bags
              </span>
            </div>
          </Link>

          {/* CENTER: Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search luxury bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] transition-all duration-300"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
                >
                  Search
                </button>
              )}
            </div>
          </form>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-4">

            {/* Home Icon */}
            <Link
              to="/"
              className="relative p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
              title="Home"
            >
              <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>
            </Link>

            {!loggedIn ? (
              <Link
                to="/auth"
                className="relative px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 active:scale-[0.98] animate-pulse-glow flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
            ) : (
              <>
                {/* CART */}
                <Link
                  to="/cart"
                  className="relative p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-[11px] font-bold px-1.5 rounded-full shadow-lg shadow-red-500/50 ring-2 ring-[#0a0a0f] animate-bounce">
                      {cartCount}
                    </span>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>
                </Link>

                {/* ACCOUNT */}
                <div className="relative">
                  <button
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>
                  </button>

                  {showAccountMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-[#111118]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-violet-500/20 p-2 space-y-1 animate-dropdown">
                      <Link
                        to="/account"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-cyan-500/10 transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="font-medium">My Account</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </div>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                  className="md:hidden p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>
                </button>
              </>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-6 pt-4 space-y-3 border-t border-white/5 bg-[#0a0a0f]/95 backdrop-blur-xl animate-slide-down">
            <Link to="/" className="block py-3 text-white/80 hover:text-white transition-colors font-medium">Home</Link>
            <Link to="/shop" className="block py-3 text-white/80 hover:text-white transition-colors font-medium">Shop</Link>

            <form onSubmit={handleSearch} className="flex pt-2">
              <input
                type="text"
                placeholder="Search luxury bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-l-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50"
              />
              <button
                type="submit"
                className="px-6 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-r-xl hover:from-violet-500 hover:to-cyan-500 transition-all"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        )}

        <style>{`
          @keyframes dropdown {
            from { opacity: 0; transform: translateY(-8px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes slide-down {
            from { opacity: 0; transform: translateY(-12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-dropdown { animation: dropdown 0.25s ease-out; }
          .animate-slide-down { animation: slide-down 0.3s ease-out; }
        `}</style>
      </nav>
    </>
  );
};

export default Navbar;
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "./Logo";
import { COLORS, BRAND } from "../constants/branding";

const Navbar = ({ loggedIn = false, isAdmin = false }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!loggedIn) return;
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          withCredentials: true,
        });
        const count = res.data.items?.length || 0;
        setCartCount(count);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCartCount();
    const interval = setInterval(fetchCartCount, 3000); // Refresh every 3 seconds
    return () => clearInterval(interval);
  }, [loggedIn]);

  const handleLogout = async () => {
    try {
      const logoutUrl = isAdmin
        ? "http://localhost:5000/api/owners/logout"
        : "http://localhost:5000/api/users/logout";

      await axios.post(logoutUrl, {}, { withCredentials: true });
      navigate(isAdmin ? "/admin/login" : "/auth");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert('Please enter a search term');
      return;
    }
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  if (isAdmin) {
    return (
      <nav className="w-full sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <Logo size={32} />
              <span className="text-lg font-semibold tracking-tight">{BRAND.name}</span>
            </Link>

            <div className="flex items-center gap-12">
              <Link to="/admin/dashboard" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition uppercase tracking-wider">Dashboard</Link>
              <Link to="/admin/products" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition uppercase tracking-wider">Products</Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition rounded-none uppercase tracking-wider"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group animate-fadeIn">
            <Logo size={28} />
            <div className="hidden sm:block">
              <div className="text-lg font-bold tracking-tight" style={{ color: COLORS.primary }}>
                {BRAND.name}
              </div>
              <div className="text-xs font-medium text-gray-500 tracking-widest uppercase">Luxury</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <Link to="/" className="text-xs font-semibold text-gray-700 hover:text-yellow-600 transition uppercase tracking-wider link-luxury">Home</Link>
            <Link to="/shop" className="text-xs font-semibold text-gray-700 hover:text-yellow-600 transition uppercase tracking-wider link-luxury">Shop</Link>
            <a href="#" className="text-xs font-semibold text-gray-700 hover:text-yellow-600 transition uppercase tracking-wider link-luxury">About</a>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs mx-8">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border-b border-gray-300 bg-transparent text-sm focus:outline-none focus:border-yellow-600 transition placeholder-gray-400"
            />
            <button type="submit" className="ml-2 p-1.5 hover:text-yellow-600 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            {!loggedIn ? (
              <>
                <Link to="/auth" className="hidden sm:inline-block text-xs font-semibold text-gray-700 hover:text-yellow-600 transition uppercase tracking-wider">
                  Login
                </Link>
                <Link to="/auth" className="sm:hidden px-4 py-2 bg-black text-white text-xs font-bold hover:bg-gray-900 transition uppercase tracking-wider">
                  Sign In
                </Link>
              </>
            ) : (
              <>
                {/* Cart Icon */}
                <Link to="/cart" className="relative p-2 hover:-translate-y-0.5 transition group" title="Shopping Cart">
                  <svg className="w-5 h-5 text-gray-700 group-hover:text-yellow-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white" style={{ backgroundColor: COLORS.accent }}>
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Account Menu */}
                <div className="relative">
                  <button onClick={() => setShowAccountMenu(!showAccountMenu)} className="p-2 hover:-translate-y-0.5 transition group" title="Account">
                    <svg className="w-5 h-5 text-gray-700 group-hover:text-yellow-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>

                  {showAccountMenu && (
                    <div className="absolute right-0 mt-4 w-48 bg-white border border-gray-200 shadow-lg py- 2 animate-fadeInDown">
                      <Link to="/account" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 border-b border-gray-100" onClick={() => setShowAccountMenu(false)}>
                        My Account
                      </Link>
                      {isAdmin && (
                        <Link to="/admin/dashboard" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 border-b border-gray-100" onClick={() => setShowAccountMenu(false)}>
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowAccountMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && loggedIn && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fadeInDown">
            <Link to="/" className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 uppercase tracking-wider" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 uppercase tracking-wider" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <form onSubmit={handleSearch} className="px-4 py-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border-b border-gray-300 text-sm focus:outline-none focus:border-yellow-600"
              />
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

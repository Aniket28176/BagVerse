api.js->import axios from "axios"; 

const api = axios.create({
  baseURL: "https://bagverse-ghle.onrender.com",
  withCredentials: true,   // 🔥 THIS LINE IS MANDATORY
});

export default api;

Navbar.jsx->import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Logo from "./Logo";
import { COLORS, BRAND } from "../constants/branding";

const Navbar = ({ loggedIn = false, isAdmin = false }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* ===============================
     🔥 FETCH CART COUNT (FIXED)
     =============================== */
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!loggedIn) {
        setCartCount(0);
        return;
      }

      try {
        const res = await api.get("/cart"); // ✅ FIXED (no /api)
        const count = res.data.items?.length || 0;
        setCartCount(count);
      } catch (err) {
        if (err.response?.status === 401) {
          // ✅ NORMAL (not logged in)
          setCartCount(0);
        } else {
          console.error("Error fetching cart:", err);
        }
      }
    };

    fetchCartCount();
  }, [loggedIn]);

  /* ===============================
     LOGOUT
     =============================== */
  const handleLogout = async () => {
    try {
      const logoutUrl = isAdmin
        ? "/owners/logout"
        : "/users/logout"; // ✅ FIXED (no /api)

      await api.post(logoutUrl);
      navigate(isAdmin ? "/admin/login" : "/auth");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  /* ===============================
     SEARCH
     =============================== */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("Please enter a search term");
      return;
    }
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setMobileMenuOpen(false);
  };

  /* ===============================
     ADMIN NAVBAR
     =============================== */
  if (isAdmin) {
    return (
      <nav className="w-full sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <Logo size={32} />
              <span className="text-lg font-semibold">{BRAND.name}</span>
            </Link>

            <div className="flex items-center gap-12">
              <Link to="/admin/dashboard">Dashboard</Link>
              <Link to="/admin/products">Products</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  /* ===============================
     USER NAVBAR
     =============================== */
  return (
    <nav className="w-full sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo size={28} />
            <span>{BRAND.name}</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex gap-8">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {!loggedIn ? (
              <Link to="/auth">Login</Link>
            ) : (
              <>
                {/* Cart */}
                <Link to="/cart" className="relative">
                  🛒
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 text-xs bg-red-500 text-white px-1">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Account */}
                <button onClick={() => setShowAccountMenu(!showAccountMenu)}>
                  👤
                </button>

                {showAccountMenu && (
                  <div className="absolute right-0 mt-2 bg-white border shadow">
                    <Link to="/account">My Account</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
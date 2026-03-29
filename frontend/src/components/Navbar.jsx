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

    navigate("/auth"); // ✅ ALWAYS go to common auth page
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

  /* ===============================
     ADMIN NAVBAR
     =============================== */
  if (isAdmin) {
    return (
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <Logo size={30} />
            BagVerse
          </Link>

          <div className="flex items-center gap-8 text-sm font-medium">
            <Link to="/admin/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <Link to="/admin/products" className="hover:text-blue-600">Products</Link>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-600">
              Logout
            </button>
          </div>
        </div>
      </nav>
    );
  }

  /* ===============================
     USER NAVBAR
     =============================== */
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

        {/* LEFT */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <Logo size={28} />
          BagVerse
        </Link>

        {/* CENTER (Search) */}
        <form onSubmit={handleSearch} className="hidden md:flex w-1/3">
          <input
            type="text"
            placeholder="Search bags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600">
            🔍
          </button>
        </form>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          {!loggedIn ? (
            <Link
              to="/auth"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </Link>
          ) : (
            <>
              {/* CART */}
              <Link to="/cart" className="relative text-xl">
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* ACCOUNT */}
              <div className="relative">
                <button
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="text-xl"
                >
                  👤
                </button>

                {showAccountMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg p-2 space-y-1">
                    <Link
                      to="/account"
                      className="block px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* MOBILE MENU BUTTON */}
              <button
                className="md:hidden text-xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                ☰
              </button>
            </>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          <Link to="/" className="block">Home</Link>
          <Link to="/shop" className="block">Shop</Link>

          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border rounded-l"
            />
            <button className="bg-blue-500 text-white px-3 rounded-r">
              🔍
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
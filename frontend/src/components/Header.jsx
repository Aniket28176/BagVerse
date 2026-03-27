import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Header = ({ loggedIn = false, isAdmin = false }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const logoutUrl = isAdmin
        ? "/api/owners/logout"
        : "/api/users/logout";

      await api.post(logoutUrl);

      navigate(isAdmin ? "/admin/login" : "/auth");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b bg-white">
      <h3 className="text-xl font-bold">Baggista</h3>

      {/* ================= LOGGED OUT ================= */}
      {!loggedIn && (
        <div className="flex gap-5">
          <Link to="/auth">User Login</Link>
          <Link to="/admin/login" className="text-blue-600 font-semibold">
            Admin Login
          </Link>
        </div>
      )}

      {/* ================= USER LOGGED IN ================= */}
      {loggedIn && !isAdmin && (
        <div className="flex gap-5 items-center">
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/account">My Account</Link>

          <button
            onClick={handleLogout}
            className="text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      )}

      {/* ================= ADMIN LOGGED IN ================= */}
      {loggedIn && isAdmin && (
        <div className="flex gap-5 items-center">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/account">My Account</Link>
          <Link to="/admin/products/create">Add Product</Link>

          <button
            onClick={handleLogout}
            className="text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;


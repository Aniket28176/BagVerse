import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ===============================
     HANDLE ADMIN LOGIN
     =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/api/users/login", data);

      // ✅ Redirect ONLY after successful login
      navigate("/admin/dashboard", { replace: true });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar loggedIn={false} isAdmin={true} />

      {/* ---------- ERROR MESSAGE ---------- */}
      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 px-5 py-3 rounded-md shadow-lg z-50">
          <span className="text-white font-medium">{error}</span>
        </div>
      )}

      {/* ---------- LOGIN FORM ---------- */}
      <div className="w-full min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">

          <h2 className="text-3xl font-semibold mb-2 text-center">
            Admin Login
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Sign in to manage products
          </p>

          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              className="block bg-zinc-100 w-full px-4 py-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Email"
              value={adminData.email}
              onChange={(e) =>
                setAdminData({ ...adminData, email: e.target.value })
              }
              required
            />

            <input
              className="block bg-zinc-100 w-full px-4 py-3 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
              value={adminData.password}
              onChange={(e) =>
                setAdminData({ ...adminData, password: e.target.value })
              }
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full text-white font-semibold transition ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* ---------- SIGNUP LINK ---------- */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Don&apos;t have an admin account?{" "}
            <Link
              to="/admin/signup"
              className="text-blue-500 hover:underline"
            >
              Create one
            </Link>
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminLogin;

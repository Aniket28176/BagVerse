import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminProductCard from "../components/AdminProductCard";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ===============================
     FETCH ADMIN-ONLY PRODUCTS
     =============================== */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products/admin");

        // defensive check
        setProducts(Array.isArray(res.data.products) ? res.data.products : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load your products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar loggedIn={true} isAdmin={true} />


      {/* ---------- ERROR ---------- */}
      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 px-5 py-3 rounded-md z-50">
          <span className="text-white">{error}</span>
        </div>
      )}

      {/* ---------- DASHBOARD ---------- */}
      <div className="w-full min-h-screen px-20 py-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold">Admin Dashboard</h2>

          <button
            onClick={() => navigate("/admin/products/create")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            + Add Product
          </button>
        </div>

        {/* ---------- CONTENT ---------- */}
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-600">You have not added any products yet.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {products.map((product) => (
              <AdminProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default AdminDashboard;

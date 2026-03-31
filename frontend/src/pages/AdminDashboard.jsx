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
  const [success, setSuccess] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState("");

  /* ===============================
     FETCH ADMIN-ONLY PRODUCTS
     =============================== */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products/admin");
        setProducts(Array.isArray(res.data.products) ? res.data.products : []);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Your session expired. Please log in again.");
          setTimeout(() => navigate("/auth"), 800);
        } else {
          console.error(err);
          setError("Failed to load your products");
        }

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleDelete = async (productId) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setActionLoadingId(productId);

    try {
      await api.delete(`/api/products/${productId}`);
      setProducts((prev) => prev.filter((product) => product._id !== productId));
      setSuccess("Product deleted successfully.");
    } catch (err) {
      const status = err.response?.status;
      const contentType = err.response?.headers?.["content-type"] || "";
      const serverMessage =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.message;

      if (status === 401 || status === 403) {
        setError("Your session expired. Please log in again.");
        setTimeout(() => navigate("/auth"), 800);
      } else if (status === 404) {
        const missingDeleteRoute =
          contentType.includes("text/html") || serverMessage?.includes("Cannot DELETE");

        if (missingDeleteRoute) {
          setError(
            "Delete endpoint is unavailable on the current backend. Use the local API in development or redeploy the Render backend."
          );
        } else {
          setProducts((prev) => prev.filter((product) => product._id !== productId));
          setError("This product no longer exists on the server. The list has been refreshed.");
        }
      } else {
        console.error(err);
        setError(serverMessage || "Failed to delete product");
      }
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <>
      <Navbar loggedIn={true} isAdmin={true} />

      {/* ---------- SUCCESS ---------- */}
      {success && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 px-5 py-3 rounded-md z-50">
          <span className="text-white">{success}</span>
        </div>
      )}

      {/* ---------- ERROR ---------- */}
      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 px-5 py-3 rounded-md z-50">
          <span className="text-white">{error}</span>
        </div>
      )}

      {/* ---------- DASHBOARD ---------- */}
      <div className="w-full min-h-screen px-20 py-20">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-semibold">Admin Dashboard</h2>
            <p className="text-gray-500 mt-1">Manage, edit, or delete your listed products.</p>
          </div>

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
                onDelete={handleDelete}
                isDeleting={actionLoadingId === product._id}
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

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminProductCard from "../components/AdminProductCard";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ===============================
     FETCH PRODUCTS
     =============================== */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/products/admin`,
          {
            withCredentials: true, // 🔥 REQUIRED
          }
        );

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

  return (
    <>
      <Navbar loggedIn={true} isAdmin={true} />

      <div className="px-20 py-20 flex">

        {/* SIDEBAR */}
        <div className="w-1/4">
          <Link to="/admin/products/create">➕ Create Product</Link>
        </div>

        {/* CONTENT */}
        <div className="w-3/4">

          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <div className="flex flex-wrap gap-5">
              {products.map((p) => (
                <AdminProductCard key={p._id} product={p} />
              ))}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminProducts;
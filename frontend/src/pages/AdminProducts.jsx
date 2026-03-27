import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminProductCard from "../components/AdminProductCard";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/products/admin", {
        withCredentials: true,
      })
      .then((res) => setProducts(res.data.products || []));
  }, []);

  return (
    <>
      <Navbar loggedIn isAdmin />

      <div className="px-20 py-20 flex">
        <div className="w-1/4">
          <Link to="/admin/products/create">Create Product</Link>
        </div>

        <div className="w-3/4 flex flex-wrap gap-5">
          {products.map((p) => (
            <AdminProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminProducts;

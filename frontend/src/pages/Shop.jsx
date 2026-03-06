import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import HeroBanner from "../components/HeroBanner";
import { SkeletonGrid } from "../components/Skeleton";

const Shop = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // extract search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        // include search term when present
        let url = `http://localhost:5000/api/products?sort=${sortBy}`;
        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }
        const res = await axios.get(url);

        // ✅ Defensive check
        const productList = Array.isArray(res.data.products)
          ? res.data.products
          : [];

        setProducts(productList);
      } catch (err) {
        console.error(err);
        setProducts([]);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortBy, searchTerm]);

  return (
    <>
      <Navbar loggedIn={true} isAdmin={false} />
      <HeroBanner />

      <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black" data-shop-section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section Header */}
          <div className="mb-16 animate-fadeInDown" style={{ animationDelay: '100ms' }}>
            <h1 className="text-5xl font-bold mb-3 uppercase tracking-tight text-white">
              {searchTerm ? `Search results for "${searchTerm}"` : "Our Collection"}
            </h1>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-light">
              {searchTerm
                ? "Browse the items matching your query"
                : "Premium selection of luxury bags for every occasion"}
            </p>
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-4">
              <label className="text-white font-bold uppercase tracking-widest text-xs">Sort:</label>
              <select
                className="px-0 py-2.5 border-b-2 border-gray-700 bg-transparent text-white focus:outline-none focus:border-yellow-600 font-medium text-sm uppercase tracking-wide hover:border-gray-600 transition-colors duration-300"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular" className="bg-gray-900 text-white">Popular</option>
                <option value="newest" className="bg-gray-900 text-white">Newest</option>
                <option value="priceLow" className="bg-gray-900 text-white">Price: Low to High</option>
                <option value="priceHigh" className="bg-gray-900 text-white">Price: High to Low</option>
              </select>
            </div>

            {products.length > 0 && (
              <p className="text-gray-400 text-xs uppercase tracking-widest font-light">
                Showing <span className="text-yellow-600 font-bold">{products.length}</span> products
              </p>
            )}
          </div>

          {/* Products Grid */}
          {error ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-red-500 font-bold text-base mb-6 uppercase tracking-wide">⚠️ {error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-yellow-600 text-black rounded-none font-bold hover:bg-yellow-500 active:scale-95 uppercase tracking-widest text-xs transition-all duration-300"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : loading ? (
            <SkeletonGrid count={8} />
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-gray-400 text-base font-light mb-6 uppercase tracking-wide">
                  😕 No products found
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-yellow-600 text-black rounded-none font-bold hover:bg-yellow-500 active:scale-95 uppercase tracking-widest text-xs transition-all duration-300"
                >
                  Refresh
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, idx) => (
                <div key={product._id} className="animate-fadeInUp" style={{ animationDelay: `${100 + idx * 50}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;

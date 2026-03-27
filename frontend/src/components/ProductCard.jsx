import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { COLORS } from "../constants/branding";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const rating = (Math.random() * (5 - 4) + 4).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 100) + 10;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/cart/add`,
        { productId: product._id },
        { withCredentials: true }
      );
      setSuccess("✓ Added to cart!");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setSuccess("✗ Error adding to cart");
      setTimeout(() => setSuccess(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="group w-full max-w-sm rounded-none overflow-hidden card-shadow bg-white transition-all duration-500 animate-fadeInUp"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className="relative w-full h-80 overflow-hidden bg-gray-100"
        style={{ backgroundColor: product.bgcolor || "#f5f3f0" }}
      >
        {/* Image with zoom effect */}
        <img
          className={`w-full h-full object-contain transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          src={`data:image/jpeg;base64,${product.image}`}
          alt={product.name}
        />

        {/* Badge */}
        <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
          New
        </div>

        {/* Quick Add Button */}
        {isHovered && (
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black text-white font-bold text-sm hover:bg-gray-900 active:scale-95 transition-all duration-200 shadow-lg animate-slideInFromTop uppercase tracking-wider disabled:opacity-50"
          >
            {loading ? "Adding..." : "+ Add to Cart"}
          </button>
        )}
      </div>

      {/* Info Container */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="text-gray-900 font-semibold text-base mb-2 line-clamp-2 hover:text-yellow-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs ${i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-600 font-medium">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mb-6 flex items-baseline gap-3">
          <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{Math.round(product.price * 1.2)}</span>
          <span className="text-xs font-semibold text-green-600">20% OFF</span>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-xs text-gray-600 mb-6 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="flex-1 py-3 border border-gray-900 text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase tracking-wide disabled:opacity-50"
          >
            {loading ? "..." : "Add"}
          </button>

          <Link
            to={`/buynow/${product._id}`}
            className="flex-1 py-3 bg-gray-900 text-white font-semibold text-sm hover:bg-black transition-all duration-300 text-center uppercase tracking-wide"
          >
            Buy Now
          </Link>
        </div>
      </div>

      {/* Success Toast */}
      {success && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 p-3 text-white rounded-none z-50 text-sm font-semibold shadow-lg animate-slideInFromTop"
          style={{
            backgroundColor: success.includes("✓") ? "#2d8659" : "#d32f2f",
          }}
        >
          {success}
        </div>
      )}
    </div>
  );
};

export default ProductCard;

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BuyNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const placeOrder = async () => {
    navigate("/place-order", {
      state: {
        isBuyNow: true,
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          bgcolor: product.bgcolor,
          quantity: quantity
        }
      }
    });
  };

  if (loading) {
    return (
      <>
        <Navbar loggedIn={true} isAdmin={false} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-lg text-gray-600 font-medium">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar loggedIn={true} isAdmin={false} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-red-600 font-semibold mb-4">Product not found</p>
            <Link to="/shop" className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800">
              Back to Shop
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const totalPrice = product.price * quantity;

  return (
    <>
      <Navbar loggedIn={true} isAdmin={false} />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link to="/shop" className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
              ← Back to Shop
            </Link>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-soft p-6 md:p-8">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div
                className="w-full h-96 rounded-xl overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: product.bgcolor || "#f5f5f5" }}
              >
                <img
                  className="h-full w-full object-contain"
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt={product.name}
                />
              </div>
            </div>

            {/* Product Info & Purchase */}
            <div className="flex flex-col justify-between">
              {/* Info */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm font-medium">4.8 (127 reviews)</span>
                </div>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  High-quality premium bag with exceptional craftsmanship. Perfect for professionals and travelers.
                </p>

                {/* Price Display */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-lg text-gray-500 line-through">₹{Math.round(product.price * 1.2)}</span>
                    <span className="text-lg font-bold text-green-600">Save ₹{Math.round(product.price * 0.2)}</span>
                  </div>
                  <p className="text-sm text-gray-600">Inclusive of all taxes</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: "📦", label: "Free Shipping" },
                    { icon: "↩️", label: "Easy Returns" },
                    { icon: "🛡️", label: "1 Year Warranty" },
                    { icon: "💳", label: "Secure Payment" }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-xl">{feature.icon}</span>
                      <span>{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchase Section */}
              <div>
                {/* Quantity Selector */}
                <div className="mb-6 pb-6 border-t border-gray-200">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 w-fit">
                    <button
                      onClick={decreaseQty}
                      className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-200 transition font-bold"
                    >
                      −
                    </button>
                    <div className="w-10 h-10 flex items-center justify-center font-bold text-lg">
                      {quantity}
                    </div>
                    <button
                      onClick={increaseQty}
                      className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-200 transition font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-amber-50 border-2 border-amber-100 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Total Amount</span>
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={placeOrder}
                    className="flex-1 py-3 px-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transform hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    Place Order
                  </button>

                  <Link
                    to="/shop"
                    className="flex-1 py-3 px-4 border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition text-center"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BuyNow;

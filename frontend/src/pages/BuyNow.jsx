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
    axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/products/${id}`)
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
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mb-4"></div>
            <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">Loading product...</p>
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
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl text-red-500 font-bold mb-6 uppercase tracking-wide">⚠️ Product not found</p>
            <Link to="/shop" className="px-8 py-4 bg-yellow-600 text-black rounded-none font-bold hover:bg-yellow-500 active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs">
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

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <Link to="/shop" className="text-yellow-600 hover:text-yellow-500 font-bold flex items-center gap-2 uppercase tracking-widest text-xs transition-colors duration-300">
              ← Back to Shop
            </Link>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-gray-800 border border-gray-700 p-8 animate-fadeInUp">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div
                className="w-full h-96 overflow-hidden flex items-center justify-center border border-gray-700"
                style={{ backgroundColor: product.bgcolor || "#2d2d2d" }}
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
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 uppercase tracking-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-600 text-xl">★</span>
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">4.8 (127 reviews)</span>
                </div>

                <p className="text-gray-300 text-sm mb-8 leading-relaxed">
                  High-quality premium bag with exceptional craftsmanship and attention to detail. Perfect for professionals and modern travelers who appreciate sophisticated design.
                </p>

                {/* Price Display */}
                <div className="bg-gray-700 border border-gray-600 p-6 mb-8">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-5xl font-bold text-yellow-600">₹{product.price}</span>
                    <span className="text-lg text-gray-400 line-through">₹{Math.round(product.price * 1.2)}</span>
                    <span className="text-sm font-bold text-green-500 uppercase tracking-wide">Save ₹{Math.round(product.price * 0.2)}</span>
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Inclusive of all taxes</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: "📦", label: "Free Shipping" },
                    { icon: "↩️", label: "Easy Returns" },
                    { icon: "🛡️", label: "1 Year Warranty" },
                    { icon: "💳", label: "Secure Payment" }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 uppercase tracking-wide">
                      <span className="text-xl">{feature.icon}</span>
                      <span>{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchase Section */}
              <div>
                {/* Quantity Selector */}
                <div className="mb-8 pb-8 border-t border-gray-700">
                  <label className="block text-xs font-bold text-white mb-4 uppercase tracking-widest">
                    Quantity
                  </label>
                  <div className="flex items-center gap-2 bg-gray-700 p-1 w-fit">
                    <button
                      onClick={decreaseQty}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition font-bold text-white uppercase"
                    >
                      −
                    </button>
                    <div className="w-10 h-10 flex items-center justify-center font-bold text-lg text-white">
                      {quantity}
                    </div>
                    <button
                      onClick={increaseQty}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition font-bold text-white uppercase"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-gray-700 border-2 border-yellow-600 p-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Total Amount</span>
                    <span className="text-4xl font-bold text-yellow-600">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={placeOrder}
                    className="flex-1 py-4 px-4 bg-yellow-600 text-black font-bold rounded-none hover:bg-yellow-500 active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs"
                  >
                    Place Order
                  </button>

                  <Link
                    to="/shop"
                    className="flex-1 py-4 px-4 border-2 border-yellow-600 text-yellow-600 font-bold rounded-none hover:bg-yellow-600 hover:text-black transition-all duration-300 uppercase tracking-widest text-xs text-center"
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

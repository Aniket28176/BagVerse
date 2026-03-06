import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        withCredentials: true,
      });
      setCart(res.data || []);
    } catch (err) {
      console.log(err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price || 0), 0);
  };

  if (loading) {
    return (
      <>
        <Navbar loggedIn={true} isAdmin={false} />
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mb-4"></div>
            <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">Loading cart...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar loggedIn={true} isAdmin={false} />

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {cart.length === 0 ? (
            <div className="flex items-center justify-center py-20 animate-fadeInUp">
              <div className="text-center">
                <div className="text-6xl mb-6">🛒</div>
                <h2 className="text-4xl font-bold text-white mb-3 uppercase tracking-tight">Your cart is empty</h2>
                <p className="text-gray-400 mb-10 text-sm uppercase tracking-wide font-light">Add some beautiful bags to get started</p>
                <button
                  onClick={() => navigate("/shop")}
                  className="px-8 py-4 bg-yellow-600 text-black rounded-none font-bold hover:bg-yellow-500 active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-fadeIn">
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-5xl font-bold mb-2 text-white uppercase tracking-tight">Shopping Cart</h1>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-light">
                  You have <span className="text-yellow-600 font-bold">{cart.length}</span> item{cart.length !== 1 ? "s" : ""} in your cart
                </p>
              </div>

              {/* Cart Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-800 border border-gray-700 p-8">
                    <div className="space-y-6">
                      {cart.map((item, idx) => (
                        <div key={item._id} className="animate-fadeInUp" style={{ animationDelay: `${100 + idx * 50}ms` }}>
                          <CartItem item={item} onCartUpdate={fetchCart} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-800 border border-gray-700 p-8 sticky top-24 h-fit">
                    <h3 className="text-2xl font-bold mb-8 text-white uppercase tracking-tight">Order Summary</h3>

                    {/* Price Breakdown */}
                    <div className="space-y-4 mb-8 pb-8 border-b border-gray-700">
                      <div className="flex justify-between text-gray-400 text-sm">
                        <span className="uppercase tracking-wide font-light">Subtotal</span>
                        <span className="font-semibold text-white">₹{calculateTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-400 text-sm">
                        <span className="uppercase tracking-wide font-light">Shipping</span>
                        <span className="font-semibold text-green-500 uppercase tracking-wide">Free</span>
                      </div>
                      <div className="flex justify-between text-gray-400 text-sm">
                        <span className="uppercase tracking-wide font-light">Tax (18%)</span>
                        <span className="font-semibold text-white">₹{Math.round(calculateTotal() * 0.18).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between mb-10 pb-8 border-b border-gray-700">
                      <span className="text-sm font-bold text-gray-300 uppercase tracking-widest">Total</span>
                      <span className="text-2xl font-bold text-yellow-600">
                        ₹{Math.round(calculateTotal() * 1.18).toLocaleString()}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-4">
                      <button
                        onClick={() => navigate("/place-order")}
                        className="w-full px-4 py-4 bg-yellow-600 text-black rounded-none font-bold hover:bg-yellow-500 active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs"
                      >
                        Proceed to Checkout
                      </button>
                      <button
                        onClick={() => navigate("/shop")}
                        className="w-full px-4 py-4 border-2 border-yellow-600 text-yellow-600 rounded-none font-bold hover:bg-yellow-600 hover:text-black transition-all duration-300 uppercase tracking-widest text-xs"
                      >
                        Continue Shopping
                      </button>
                    </div>

                    {/* Trust Badge */}
                    <div className="mt-8 pt-8 border-t border-gray-700">
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-400 uppercase tracking-wide font-light">
                        <span>✓</span>
                        <span>Secure checkout powered by stripe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;

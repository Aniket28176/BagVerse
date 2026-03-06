import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const [orderData, setOrderData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });

  /* ===============================
     LOAD CART OR BUY NOW ITEM
     =============================== */
  useEffect(() => {
    if (location.state?.isBuyNow && location.state?.product) {
      setCartItems([{ ...location.state.product, quantity: 1 }]);
      setLoading(false);
    } else {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        withCredentials: true,
      });

      setCartItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     HELPERS
     =============================== */
  const calculateTotal = () =>
    cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  /* ===============================
     PLACE ORDER (FINAL & CORRECT)
     =============================== */
  const handlePlaceOrder = async (e) => {
  e.preventDefault();

  if (
    !orderData.fullname ||
    !orderData.email ||
    !orderData.phone ||
    !orderData.address
  ) {
    setError("Please fill in all required fields");
    return;
  }

  setPlacing(true);
  setError("");

  try {
    const products = cartItems.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
    }));

    const totalAmount = calculateTotal();

    await axios.post(
      "http://localhost:5000/api/orders/create",
      {
        products,
        totalAmount,
        shippingAddress: {
          fullname: orderData.fullname,
          email: orderData.email,
          phone: orderData.phone,
          address: orderData.address,
          city: orderData.city,
          state: orderData.state,
          pincode: orderData.pincode,
        },
      },
      { withCredentials: true }
    );

    navigate("/order-success");
  } catch (err) {
    setError(err.response?.data?.message || "Failed to place order");
  } finally {
    setPlacing(false);
  }
};

  /* ===============================
     STATES
     =============================== */
  if (loading) {
    return (
      <>
        <Navbar loggedIn />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-lg text-gray-600 font-medium">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar loggedIn />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl mb-4">🛒</p>
            <p className="text-xl text-gray-600 font-semibold mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transform hover:scale-105 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar loggedIn />

      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg z-50 font-semibold shadow-lg">
          ⚠️ {error}
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Place Your Order</h1>
            <p className="text-gray-600">Complete your purchase securely</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Order Items</h2>

                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                        <img
                          src={`data:image/jpeg;base64,${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                        </div>
                        <p className="font-bold text-lg">
                          ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="fullname"
                      placeholder="Full Name *"
                      value={orderData.fullname}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address *"
                      value={orderData.email}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="phone"
                      placeholder="Phone Number *"
                      value={orderData.phone}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                    <input
                      name="address"
                      placeholder="Street Address *"
                      value={orderData.address}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      name="city"
                      placeholder="City"
                      value={orderData.city}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                    <input
                      name="state"
                      placeholder="State"
                      value={orderData.state}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                    <input
                      name="pincode"
                      placeholder="Postal Code"
                      value={orderData.pincode}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                </form>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                <div className="space-y-3">
                  {[
                    { value: "cod", label: "💳 Cash on Delivery", desc: "Pay when you receive your order" },
                    { value: "card", label: "🏦 Credit/Debit Card", desc: "Secure payment via card" },
                  ].map((method) => (
                    <label key={method.value} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={orderData.paymentMethod === method.value}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-gray-900"
                      />
                      <div className="ml-3">
                        <p className="font-semibold text-gray-900">{method.label}</p>
                        <p className="text-sm text-gray-600">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 sticky top-24 h-fit">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18%)</span>
                    <span className="font-semibold">₹{Math.round(calculateTotal() * 0.18).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-8 pb-6 border-b border-gray-200">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{Math.round(calculateTotal() * 1.18).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="w-full py-3 px-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 mb-3"
                >
                  {placing ? "Processing..." : "Place Order"}
                </button>

                <button
                  onClick={() => navigate("/cart")}
                  className="w-full py-3 px-4 border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition"
                >
                  Back to Cart
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
                  <p>✓ Secure & Encrypted</p>
                  <p className="text-xs text-gray-500">256-bit SSL encrypted</p>
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

export default PlaceOrder;

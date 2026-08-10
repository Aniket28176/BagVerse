import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";
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
      const res = await api.get("/api/cart");

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

    await api.post("/api/orders/create", {
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
    });

    navigate("/order-success");
  } catch (err) {
    setError(err.response?.data?.message || "Failed to place order");
  } finally {
    setPlacing(false);
  }
};

  /* ---------- CUSTOM ANIMATIONS & GLASS STYLES ---------- */
  const styles = `
    @keyframes floatOrb {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(40px, -40px) scale(1.1); }
      66% { transform: translate(-30px, 30px) scale(0.9); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translate(-50%, -20px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .animate-orb-1 { animation: floatOrb 14s ease-in-out infinite; }
    .animate-orb-2 { animation: floatOrb 18s ease-in-out infinite reverse; }
    .animate-orb-3 { animation: floatOrb 22s ease-in-out infinite; }
    .animate-shimmer-text {
      background-size: 200% auto;
      animation: shimmer 4s linear infinite;
    }
    .animate-slide-down { animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
    .animate-spin-slow { animation: spin 1.5s linear infinite; }
    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .glass-card-hover:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(168, 85, 247, 0.4);
      box-shadow: 0 10px 40px rgba(139, 92, 246, 0.15);
    }
    .glass-input {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }
    .glass-input:focus {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(139, 92, 246, 0.5);
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
    }
    .payment-option {
      transition: all 0.3s ease;
    }
    .payment-option:hover {
      background: rgba(139, 92, 246, 0.05);
      border-color: rgba(139, 92, 246, 0.3);
    }
    .payment-option.selected {
      background: rgba(139, 92, 246, 0.1);
      border-color: rgba(139, 92, 246, 0.5);
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
    }
  `;

  /* ===============================
     LOADING STATE
     =============================== */
  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <Navbar loggedIn />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#12082a] to-[#0a0a1a] relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/20 blur-[120px] animate-orb-1" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/20 blur-[120px] animate-orb-2" />
          <div className="text-center relative z-10">
            <div className="relative inline-block mb-6">
              <div className="h-20 w-20 rounded-full border-4 border-white/10"></div>
              <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-4 border-transparent border-t-violet-500 border-r-purple-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">📦</div>
            </div>
            <p className="text-xl text-white font-semibold bg-gradient-to-r from-violet-300 via-white to-purple-300 bg-clip-text text-transparent animate-shimmer-text">
              Loading order details...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ===============================
     EMPTY CART STATE
     =============================== */
  if (cartItems.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <Navbar loggedIn />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#12082a] to-[#0a0a1a] relative overflow-hidden">
          <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-[120px] animate-orb-1" />
          <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[130px] animate-orb-2" />
          
          <div className="glass-card rounded-3xl p-12 md:p-16 text-center max-w-2xl mx-4 relative overflow-hidden z-10">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/20 blur-3xl rounded-full" />
            
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-violet-500/10 border border-violet-400/20 flex items-center justify-center text-5xl">
                🛒
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent mb-4 tracking-tight">
                Your cart is empty
              </h2>
              <p className="text-slate-400 mb-10 text-sm uppercase tracking-[0.2em] font-light">
                Add some items before placing an order
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="px-10 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <Navbar loggedIn />

      {/* ---------- ERROR TOAST ---------- */}
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="glass-card border-l-4 border-red-500 rounded-xl px-6 py-4 flex items-center gap-3 shadow-xl shadow-red-500/10">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span className="text-white font-medium">{error}</span>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#12082a] to-[#0a0a1a] relative overflow-hidden">
        {/* ══════════ ANIMATED BACKGROUND ══════════ */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-[120px] animate-orb-1" />
          <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[130px] animate-orb-2" />
          <div className="absolute top-[50%] left-[60%] w-[350px] h-[350px] rounded-full bg-fuchsia-600/10 blur-[110px] animate-orb-3" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* ---------- MAIN CONTENT ---------- */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Header */}
          <div className="mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent animate-shimmer-text tracking-tight">
              Place Your Order
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
              <p className="text-xs text-slate-300 uppercase tracking-[0.2em] font-light">
                Complete your purchase securely
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ══════════ MAIN FORM ══════════ */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-400/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  Order Items
                </h2>

                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 pb-4 border-b border-white/10 last:border-b-0 last:pb-0"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/10 flex items-center justify-center">
                        <img
                          src={`data:image/jpeg;base64,${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-white mb-1">{item.name}</p>
                          <p className="text-sm text-slate-400">Qty: {item.quantity || 1}</p>
                        </div>
                        <p className="font-bold text-lg bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                          ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Shipping Address
                </h2>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        name="fullname"
                        placeholder="John Doe"
                        value={orderData.fullname}
                        onChange={handleInputChange}
                        className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={orderData.email}
                        onChange={handleInputChange}
                        className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Phone Number *
                      </label>
                      <input
                        name="phone"
                        placeholder="+91 9876543210"
                        value={orderData.phone}
                        onChange={handleInputChange}
                        className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Street Address *
                      </label>
                      <input
                        name="address"
                        placeholder="123 Main Street"
                        value={orderData.address}
                        onChange={handleInputChange}
                        className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        City
                      </label>
                      <input
                        name="city"
                        placeholder="Mumbai"
                        value={orderData.city}
                        onChange={handleInputChange}
                        className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        State
                      </label>
                      <input
                        name="state"
                        placeholder="Maharashtra"
                        value={orderData.state}
                        onChange={handleInputChange}
                        className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Postal Code
                      </label>
                      <input
                        name="pincode"
                        placeholder="400001"
                        value={orderData.pincode}
                        onChange={handleInputChange}
                        className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Payment Method */}
              <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {[
                    { 
                      value: "cod", 
                      label: "Cash on Delivery", 
                      desc: "Pay when you receive your order",
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )
                    },
                    { 
                      value: "card", 
                      label: "Credit/Debit Card", 
                      desc: "Secure payment via card",
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      )
                    },
                  ].map((method) => (
                    <label 
                      key={method.value} 
                      className={`payment-option flex items-center p-5 border rounded-xl cursor-pointer ${
                        orderData.paymentMethod === method.value 
                          ? "selected" 
                          : "border-white/10"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={orderData.paymentMethod === method.value}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mr-4 ${
                        orderData.paymentMethod === method.value
                          ? "bg-violet-500/20 text-violet-400"
                          : "bg-white/5 text-slate-400"
                      }`}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white mb-0.5">{method.label}</p>
                        <p className="text-sm text-slate-400">{method.desc}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        orderData.paymentMethod === method.value
                          ? "border-violet-500 bg-violet-500"
                          : "border-white/20"
                      }`}>
                        {orderData.paymentMethod === method.value && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ══════════ ORDER SUMMARY SIDEBAR ══════════ */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-3xl p-6 md:p-8 sticky top-24 h-fit relative overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
                {/* Inner Glow */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-violet-600/15 blur-3xl rounded-full pointer-events-none" />
                
                <div className="relative">
                  <h2 className="text-2xl font-bold mb-8 text-white tracking-tight flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-400/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Order Summary
                  </h2>

                  {/* Price Breakdown */}
                  <div className="space-y-5 mb-8 pb-8 border-b border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm uppercase tracking-wider font-light">Subtotal</span>
                      <span className="font-semibold text-white">₹{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm uppercase tracking-wider font-light">Shipping</span>
                      <span className="font-semibold text-emerald-400 uppercase tracking-wider text-xs bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">Free</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm uppercase tracking-wider font-light">Tax (18%)</span>
                      <span className="font-semibold text-white">₹{Math.round(calculateTotal() * 0.18).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-10 pb-8 border-b border-white/10">
                    <span className="text-sm font-bold text-slate-300 uppercase tracking-[0.2em]">Total</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                      ₹{Math.round(calculateTotal() * 1.18).toLocaleString()}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={handlePlaceOrder}
                      disabled={placing}
                      className="w-full px-4 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-[0.98] transition-all duration-300 uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {placing ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          Place Order
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => navigate("/cart")}
                      className="w-full px-4 py-4 border border-white/10 text-slate-300 rounded-xl font-bold hover:bg-white/5 hover:border-white/30 hover:text-white transition-all duration-300 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Cart
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium mb-2">
                      <svg className="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Secure & Encrypted</span>
                    </div>
                    <p className="text-[9px] text-slate-600 text-center uppercase tracking-wider">
                      256-bit SSL encrypted
                    </p>
                  </div>
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
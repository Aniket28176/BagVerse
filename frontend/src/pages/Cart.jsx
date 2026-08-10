import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
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
      const res = await api.get("/api/cart");
      const cartData = Array.isArray(res.data) ? res.data : [];
      setCart(cartData);
    } catch (err) {
      console.log("Cart fetch error:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price || 0), 0);
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
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-orb-1 { animation: floatOrb 14s ease-in-out infinite; }
    .animate-orb-2 { animation: floatOrb 18s ease-in-out infinite reverse; }
    .animate-orb-3 { animation: floatOrb 22s ease-in-out infinite; }
    .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
    .animate-shimmer-text {
      background-size: 200% auto;
      animation: shimmer 4s linear infinite;
    }
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
  `;

  /* ---------- LOADING STATE ---------- */
  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <Navbar loggedIn={true} isAdmin={false} />
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#12082a] to-[#0a0a1a] relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/20 blur-[120px] animate-orb-1" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/20 blur-[120px] animate-orb-2" />
          <div className="text-center relative z-10">
            <div className="relative inline-block mb-6">
              <div className="h-20 w-20 rounded-full border-4 border-white/10"></div>
              <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-4 border-transparent border-t-violet-500 border-r-purple-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">🛍️</div>
            </div>
            <p className="text-xl text-white font-semibold bg-gradient-to-r from-violet-300 via-white to-purple-300 bg-clip-text text-transparent animate-shimmer-text">
              Loading your cart...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <Navbar loggedIn={true} isAdmin={false} />

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
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {cart.length === 0 ? (
            /* ══════════ EMPTY STATE ══════════ */
            <div className="flex items-center justify-center py-20 animate-fadeInUp">
              <div className="glass-card rounded-3xl p-12 md:p-16 text-center max-w-2xl mx-auto relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/20 blur-3xl rounded-full" />
                
                <div className="relative">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-violet-500/10 border border-violet-400/20 flex items-center justify-center text-5xl">
                    🛒
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent mb-4 tracking-tight">
                    Your cart is empty
                  </h2>
                  <p className="text-slate-400 mb-10 text-sm uppercase tracking-[0.2em] font-light">
                    Add some beautiful bags to get started
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
          ) : (
            /* ══════════ CART CONTENT ══════════ */
            <div className="animate-fadeInUp">
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent animate-shimmer-text tracking-tight">
                  Shopping Cart
                </h1>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
                  <p className="text-xs text-slate-300 uppercase tracking-[0.2em] font-light">
                    You have <span className="text-violet-300 font-bold">{cart.length}</span> item{cart.length !== 1 ? "s" : ""} in your cart
                  </p>
                </div>
              </div>

              {/* Cart Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {Array.isArray(cart) && cart.map((item, idx) => (
                    <div 
                      key={item._id} 
                      className="animate-fadeInUp" 
                      style={{ animationDelay: `${100 + idx * 80}ms` }}
                    >
                      {/* Wrapping the external CartItem in a glass card */}
                      <div className="glass-card glass-card-hover rounded-2xl p-4 md:p-6 transition-all duration-300">
                        <CartItem item={item} onCartUpdate={fetchCart} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                  <div className="glass-card rounded-3xl p-6 md:p-8 sticky top-24 h-fit relative overflow-hidden">
                    {/* Inner Glow */}
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-violet-600/15 blur-3xl rounded-full pointer-events-none" />
                    
                    <div className="relative">
                      <h3 className="text-2xl font-bold mb-8 text-white tracking-tight flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-400/20 flex items-center justify-center text-sm">🧾</span>
                        Order Summary
                      </h3>

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

                      {/* Buttons */}
                      <div className="space-y-4">
                        <button
                          onClick={() => navigate("/place-order")}
                          className="w-full px-4 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-[0.98] transition-all duration-300 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                        >
                          Proceed to Checkout
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                        <button
                          onClick={() => navigate("/shop")}
                          className="w-full px-4 py-4 border border-white/10 text-slate-300 rounded-xl font-bold hover:bg-white/5 hover:border-white/30 hover:text-white transition-all duration-300 uppercase tracking-widest text-xs"
                        >
                          Continue Shopping
                        </button>
                      </div>

                      {/* Trust Badge */}
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium">
                          <svg className="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span>Secure checkout powered by stripe</span>
                        </div>
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

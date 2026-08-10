import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Account = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [adminProducts, setAdminProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingProductId, setDeletingProductId] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        let profile;

        /* ---------- TRY ADMIN ---------- */
        try {
          const adminRes = await api.get("/api/owners/profile");
          profile = adminRes.data;
        } catch {
          /* ---------- FALLBACK USER ---------- */
          const userRes = await api.get("/api/users/profile");
          profile = userRes.data;
        }

        setUser(profile);

        /* ---------- ADMIN ---------- */
        if (profile.role === "admin") {
          const prodRes = await api.get("/api/products/admin");
          setAdminProducts(prodRes.data.products || []);
        }
        /* ---------- USER ---------- */
        else {
          const orderRes = await api.get("/api/orders/my");
          setOrders(orderRes.data || []);
        }
      } catch (err) {
        setError("Failed to load account");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product?")) return;

    setError("");
    setDeletingProductId(productId);

    try {
      await api.delete(`/api/products/${productId}`);
      setAdminProducts((prev) => prev.filter((product) => product._id !== productId));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete product");
    } finally {
      setDeletingProductId("");
    }
  };

  /* ---------- CUSTOM ANIMATIONS ---------- */
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
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
      50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.5); }
    }
    .animate-orb-1 { animation: floatOrb 14s ease-in-out infinite; }
    .animate-orb-2 { animation: floatOrb 18s ease-in-out infinite reverse; }
    .animate-orb-3 { animation: floatOrb 22s ease-in-out infinite; }
    .animate-shimmer-text {
      background-size: 200% auto;
      animation: shimmer 4s linear infinite;
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .glass-card-hover:hover {
      background: rgba(255, 255, 255, 0.07);
      border-color: rgba(168, 85, 247, 0.4);
      box-shadow: 0 20px 50px rgba(139, 92, 246, 0.15);
    }
  `;

  /* ---------- LOADING ---------- */
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
              <div className="absolute inset-0 flex items-center justify-center text-2xl">✨</div>
            </div>
            <p className="text-xl text-white font-semibold bg-gradient-to-r from-violet-300 via-white to-purple-300 bg-clip-text text-transparent animate-shimmer-text">
              Loading your account...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ---------- ERROR ---------- */
  if (error) {
    return (
      <>
        <style>{styles}</style>
        <Navbar loggedIn />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#1a0820] to-[#0a0a1a] relative overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-red-600/10 blur-[120px] animate-orb-1" />
          <div className="text-center glass-card rounded-3xl px-10 py-12 max-w-md mx-4 relative z-10" style={{ animation: 'pulseGlow 3s ease-in-out infinite' }}>
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5 text-4xl">⚠️</div>
            <p className="text-2xl text-white font-bold mb-2">{error}</p>
            <p className="text-slate-400 mb-6">Something went wrong while fetching your details.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <>
      <style>{styles}</style>
      <Navbar loggedIn isAdmin={isAdmin} />

      <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#12082a] to-[#0a0a1a] relative overflow-hidden">
        {/* ══════════ ANIMATED BACKGROUND ══════════ */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Floating orbs */}
          <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-violet-600/20 blur-[120px] animate-orb-1" />
          <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] rounded-full bg-purple-600/20 blur-[130px] animate-orb-2" />
          <div className="absolute top-[50%] left-[60%] w-[350px] h-[350px] rounded-full bg-fuchsia-600/10 blur-[110px] animate-orb-3" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* ══════════ PAGE HERO ══════════ */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
          <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
            {/* Inner glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="relative flex items-center gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-4xl md:text-5xl shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                {isAdmin ? "👑" : "🛍️"}
              </div>
              <div>
                <p className="text-violet-300 text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-2">
                  {isAdmin ? "Admin Dashboard" : "Your Account Information"}
                </p>
                <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent animate-shimmer-text">
                  My Account
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* ══════════ ACCOUNT INFO CARDS ══════════ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Email */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/20 flex items-center justify-center text-2xl mb-4">📧</div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Email Address</p>
              <p className="text-lg font-bold text-white break-all">{user.email}</p>
            </div>

            {/* Account Type */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-400/20 flex items-center justify-center text-2xl mb-4">
                {isAdmin ? "👑" : "👤"}
              </div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Account Type</p>
              <span
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold ${
                  isAdmin
                    ? "bg-violet-500/20 text-violet-300 border border-violet-400/30"
                    : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                }`}
              >
                {isAdmin ? "Admin" : "Customer"}
              </span>
            </div>

            {/* Member Since */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/20 flex items-center justify-center text-2xl mb-4">📅</div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Member Since</p>
              <p className="text-lg font-bold text-white">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
              </p>
            </div>
          </div>

          {/* ══════════ ADMIN PRODUCTS ══════════ */}
          {isAdmin && (
            <div className="glass-card rounded-3xl p-6 md:p-8">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-400/20 flex items-center justify-center text-xl">📦</span>
                    My Products
                  </h2>
                  <p className="text-slate-400 mt-1 ml-[56px]">
                    {adminProducts.length} product{adminProducts.length !== 1 ? "s" : ""} added
                  </p>
                </div>
              </div>

              {adminProducts.length === 0 ? (
                <div className="text-center py-16 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
                  <p className="text-5xl mb-3">📦</p>
                  <p className="text-white font-semibold">No products added yet</p>
                  <p className="text-sm text-slate-400 mt-1">Start by adding your first product</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {adminProducts.map((p) => (
                    <div
                      key={p._id}
                      className="group glass-card glass-card-hover rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    >
                      {p.image && (
                        <div className="h-48 overflow-hidden bg-white/5 flex items-center justify-center">
                          <img
                            src={`data:image/jpeg;base64,${p.image}`}
                            alt={p.name}
                            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h4 className="font-bold text-white mb-1 line-clamp-1">{p.name}</h4>
                        <p className="text-lg font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-4">
                          ₹{p.price}
                        </p>

                        <div className="flex gap-2">
                          <button
                            onClick={() => alert(`Opening edit form for ${p.name}`)}
                            className="flex-1 px-3 py-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(p._id)}
                            disabled={deletingProductId === p._id}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                              deletingProductId === p._id
                                ? "bg-red-300/80 text-white cursor-not-allowed"
                                : "bg-red-500/10 border border-red-400/20 text-red-300 hover:bg-red-500 hover:text-white"
                            }`}
                          >
                            {deletingProductId === p._id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══════════ USER ORDERS ══════════ */}
          {!isAdmin && (
            <div className="glass-card rounded-3xl p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/20 flex items-center justify-center text-xl">🧾</span>
                  Order History
                </h2>
                <p className="text-slate-400 mt-1 ml-[56px]">
                  {orders.length} order{orders.length !== 1 ? "s" : ""} placed
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-16 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
                  <p className="text-5xl mb-3">📦</p>
                  <p className="text-white font-semibold">No orders yet</p>
                  <p className="text-sm text-slate-400 mt-1">Start shopping to place your first order</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {orders.map((order, idx) => {
                    const statusStyles =
                      order.status === "Delivered"
                        ? { badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30", bar: "from-emerald-400 to-teal-400" }
                        : order.status === "Accepted"
                        ? { badge: "bg-blue-500/20 text-blue-300 border-blue-400/30", bar: "from-blue-400 to-cyan-400" }
                        : order.status === "Processing"
                        ? { badge: "bg-sky-500/20 text-sky-300 border-sky-400/30", bar: "from-sky-400 to-indigo-400" }
                        : { badge: "bg-amber-500/20 text-amber-300 border-amber-400/30", bar: "from-amber-400 to-yellow-400" };

                    return (
                      <div
                        key={order._id}
                        className="relative glass-card glass-card-hover rounded-2xl p-5 md:p-6 transition-all duration-300 overflow-hidden"
                      >
                        {/* Status accent bar */}
                        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${statusStyles.bar}`} />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5 pl-2">
                          <div>
                            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Order ID</p>
                            <p className="text-sm font-bold text-white">#{idx + 1}</p>
                          </div>

                          <div>
                            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Date</p>
                            <p className="text-sm font-medium text-white">
                              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Status</p>
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${statusStyles.badge}`}>
                              {order.status}
                            </span>
                          </div>

                          <div>
                            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Total</p>
                            <p className="text-sm font-bold text-white">₹{order.totalAmount?.toLocaleString()}</p>
                          </div>
                        </div>

                        {order.deliveryDate && (
                          <div className="mb-4 pl-2 text-sm text-slate-300">
                            <span className="font-semibold text-white">Delivery Date:</span> {new Date(order.deliveryDate).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10 pl-2">
                          <button
                            onClick={() => alert(`Tracking order #${idx + 1}. Your order is on the way!`)}
                            className="flex-1 px-4 py-2.5 bg-blue-500/10 border border-blue-400/20 text-blue-300 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-colors duration-300 text-sm"
                          >
                            Track Order
                          </button>
                          <button
                            onClick={() => alert(`Viewing details for order #${idx + 1}`)}
                            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-lg font-semibold hover:bg-white/20 hover:text-white transition-colors duration-300 text-sm"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => alert(`Invoice for order #${idx + 1} would be downloaded`)}
                            className="flex-1 px-4 py-2.5 bg-amber-500/10 border border-amber-400/20 text-amber-300 rounded-lg font-semibold hover:bg-amber-500 hover:text-white transition-colors duration-300 text-sm"
                          >
                            Download Invoice
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Account;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminProductCard from "../components/AdminProductCard";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [acceptLoadingId, setAcceptLoadingId] = useState("");
  const [deliveryDates, setDeliveryDates] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          api.get("/api/products/admin"),
          api.get("/api/orders/admin"),
        ]);

        setProducts(Array.isArray(productsRes.data.products) ? productsRes.data.products : []);
        setOrders(Array.isArray(ordersRes.data.orders) ? ordersRes.data.orders : []);
      } catch (err) {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          setError("Your session expired. Please log in again.");
          setTimeout(() => navigate("/auth"), 800);
        } else {
          console.error(err);
          setError("Failed to load admin data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDelete = async (productId) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    setError("");
    setSuccess("");
    setActionLoadingId(productId);

    try {
      await api.delete(`/api/products/${productId}`);
      setProducts((prev) => prev.filter((product) => product._id !== productId));
      setSuccess("Product deleted successfully.");
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        setError("Your session expired. Please log in again.");
        setTimeout(() => navigate("/auth"), 800);
      } else if (status === 404) {
        setProducts((prev) => prev.filter((product) => product._id !== productId));
        setError("This product no longer exists on the server. The list has been refreshed.");
      } else {
        console.error(err);
        setError(err.response?.data?.message || "Failed to delete product");
      }
    } finally {
      setActionLoadingId("");
    }
  };

  const renderOrderStatus = (status) => {
    if (status === "Delivered") {
      return "bg-emerald-500/15 text-emerald-300";
    }
    if (status === "Accepted" || status === "Processing") {
      return "bg-blue-500/15 text-blue-300";
    }
    return "bg-amber-500/15 text-amber-300";
  };

  const handleAcceptOrder = async (orderId) => {
    setError("");
    setSuccess("");

    const deliveryDate = deliveryDates[orderId];
    if (!deliveryDate) {
      setError("Please choose a delivery date before accepting the order.");
      return;
    }

    setAcceptLoadingId(orderId);

    try {
      const res = await api.put(`/api/orders/${orderId}/accept`, { deliveryDate });
      const updatedOrder = res.data.order;

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: updatedOrder.status, deliveryDate: updatedOrder.deliveryDate } : order
        )
      );
      setSuccess("Order accepted and delivery date set.");
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        setError("Your session expired. Please log in again.");
        setTimeout(() => navigate("/auth"), 800);
      } else {
        setError(err.response?.data?.message || "Failed to accept order");
      }
    } finally {
      setAcceptLoadingId("");
    }
  };

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
  `;

  return (
    <>
      <style>{styles}</style>
      <Navbar loggedIn={true} isAdmin={true} />

      <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#12082a] to-[#0a0a1a] relative overflow-hidden">
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

        {success && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
            <div className="glass-card border-l-4 border-emerald-500 rounded-xl px-6 py-4 flex items-center gap-3 shadow-xl shadow-emerald-500/10">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white font-medium">{success}</span>
            </div>
          </div>
        )}

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

        <div className="relative z-10 w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent animate-shimmer-text tracking-tight">
                Admin Dashboard
              </h2>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
                <p className="text-xs text-slate-300 uppercase tracking-[0.2em] font-light">
                  Manage products and view incoming orders
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/admin/products/create")}
              className="animate-fade-in-up group relative px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 active:scale-[0.98] flex items-center gap-2"
              style={{ animationDelay: "0.1s" }}
            >
              <svg className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add New Product
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="glass-card rounded-3xl p-12 text-center">
                <div className="relative inline-block mb-6">
                  <div className="h-16 w-16 rounded-full border-4 border-white/10"></div>
                  <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-transparent border-t-violet-500 border-r-purple-500 animate-spin-slow"></div>
                </div>
                <p className="text-xl text-white font-semibold bg-gradient-to-r from-violet-300 via-white to-purple-300 bg-clip-text text-transparent animate-shimmer-text">
                  Loading admin data...
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
              <section className="glass-card rounded-3xl p-8 shadow-2xl shadow-violet-500/10">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-white">Products</h3>
                    <p className="text-sm text-slate-400 mt-2">
                      Create, update, and delete products from your store.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20">{products.length} items</span>
                    <button
                      onClick={() => navigate("/admin/products")}
                      className="px-4 py-2 rounded-xl bg-violet-600/10 text-violet-200 border border-violet-500/20 hover:bg-violet-600/20 transition"
                    >
                      Manage products
                    </button>
                  </div>
                </div>

                {products.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-slate-400">
                    No admin products found. Add your first product to start selling.
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {products.slice(0, 4).map((product) => (
                      <AdminProductCard
                        key={product._id}
                        product={product}
                        onDelete={handleDelete}
                        isDeleting={actionLoadingId === product._id}
                      />
                    ))}
                  </div>
                )}
              </section>

              <section className="glass-card rounded-3xl p-8 shadow-2xl shadow-cyan-500/10">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-white">Recent Orders</h3>
                  <p className="text-sm text-slate-400 mt-2">
                    View all incoming orders directly in the admin panel instead of SMS.
                  </p>
                </div>

                {orders.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-slate-400">
                    No orders yet. Customer orders will appear here after checkout.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 6).map((order) => (
                      <div key={order._id} className="rounded-3xl border border-white/10 p-5 bg-white/5 shadow-lg shadow-slate-900/10">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                          <div>
                            <p className="text-sm text-slate-400">Order ID</p>
                            <p className="text-sm font-semibold text-white break-all">{order._id}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-400">Placed</p>
                            <p className="text-sm font-semibold text-white">{new Date(order.createdAt).toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-3xl bg-slate-950/70 p-4 border border-slate-700">
                            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-2">Customer</p>
                            <p className="text-sm text-white">{order.shippingAddress?.fullname || "Guest"}</p>
                            <p className="text-xs text-slate-400">{order.shippingAddress?.email || "No email"}</p>
                            <p className="text-xs text-slate-400">{order.shippingAddress?.phone || "No phone"}</p>
                          </div>
                          <div className="rounded-3xl bg-slate-950/70 p-4 border border-slate-700">
                            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-2">Delivery</p>
                            <p className="text-sm text-white">{order.shippingAddress?.address || "-"}</p>
                            <p className="text-xs text-slate-400">{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                            <p className="text-xs text-slate-400">{order.shippingAddress?.pincode || "-"}</p>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold ${renderOrderStatus(order.status)}`}>
                              {order.status}
                            </span>
                            <span className="text-sm font-semibold text-white">₹{order.totalAmount.toFixed(2)}</span>
                          </div>

                          {order.deliveryDate && (
                            <p className="text-sm text-slate-300">
                              Delivery Date: <span className="font-semibold text-white">{new Date(order.deliveryDate).toLocaleDateString()}</span>
                            </p>
                          )}

                          {order.status === "Placed" && (
                            <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
                              <input
                                type="date"
                                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white"
                                value={deliveryDates[order._id] || ""}
                                onChange={(e) =>
                                  setDeliveryDates((prev) => ({ ...prev, [order._id]: e.target.value }))
                                }
                              />
                              <button
                                onClick={() => handleAcceptOrder(order._id)}
                                disabled={acceptLoadingId === order._id}
                                className={`w-full rounded-2xl py-3 text-sm font-semibold text-white transition ${
                                  acceptLoadingId === order._id
                                    ? "bg-slate-600 cursor-not-allowed"
                                    : "bg-emerald-500 hover:bg-emerald-400"
                                }`}
                              >
                                {acceptLoadingId === order._id ? "Accepting..." : "Accept Order"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminDashboard;

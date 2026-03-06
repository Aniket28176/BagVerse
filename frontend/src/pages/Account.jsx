import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Account = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [adminProducts, setAdminProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        let profile;

        /* ---------- TRY ADMIN ---------- */
        try {
          const adminRes = await axios.get(
            "http://localhost:5000/api/owners/profile",
            { withCredentials: true }
          );
          profile = adminRes.data;
        } catch {
          /* ---------- FALLBACK USER ---------- */
          const userRes = await axios.get(
            "http://localhost:5000/api/users/profile",
            { withCredentials: true }
          );
          profile = userRes.data;
        }

        setUser(profile);

        /* ---------- ADMIN ---------- */
        if (profile.role === "admin") {
          const prodRes = await axios.get(
            "http://localhost:5000/api/products/admin",
            { withCredentials: true }
          );
          setAdminProducts(prodRes.data.products || []);
        }
        /* ---------- USER ---------- */
        else {
          const orderRes = await axios.get(
            "http://localhost:5000/api/orders/my",
            { withCredentials: true }
          );
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

  if (loading) {
    return (
      <>
        <Navbar loggedIn />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-lg text-gray-600 font-medium">Loading your account...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar loggedIn />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl text-red-600 font-semibold mb-4">⚠️ {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800"
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
      <Navbar loggedIn isAdmin={isAdmin} />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Account Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">My Account</h1>
            <p className="text-gray-600">{isAdmin ? "Admin Dashboard" : "Your Account Information"}</p>
          </div>

          {/* Account Info Card */}
          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 mb-12 card-shadow">
            <h2 className="text-2xl font-bold mb-6">Account Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <p className="text-sm text-gray-600 font-medium mb-1">Email Address</p>
                <p className="text-lg font-bold text-gray-900 break-all">{user.email}</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <p className="text-sm text-gray-600 font-medium mb-1">Account Type</p>
                <span
                  className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-bold ${
                    isAdmin
                      ? "bg-purple-200 text-purple-900"
                      : "bg-blue-200 text-blue-900"
                  }`}
                >
                  {isAdmin ? "👤 Admin" : "👤 Customer"}
                </span>
              </div>

              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <p className="text-sm text-gray-600 font-medium mb-1">Member Since</p>
                <p className="text-lg font-bold text-gray-900">
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
          </div>

          {/* Admin Products Section */}
          {isAdmin && (
            <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 card-shadow">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold">My Products</h2>
                  <p className="text-gray-600 mt-1">
                    {adminProducts.length} product{adminProducts.length !== 1 ? "s" : ""} added
                  </p>
                </div>
              </div>

              {adminProducts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <p className="text-2xl mb-2">📦</p>
                  <p className="text-gray-600 font-medium">No products added yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {adminProducts.map((p) => (
                    <div
                      key={p._id}
                      className="rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                    >
                      {p.image && (
                        <div className="h-48 overflow-hidden bg-gray-200 flex items-center justify-center">
                          <img
                            src={`data:image/jpeg;base64,${p.image}`}
                            alt={p.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 mb-2">{p.name}</h4>
                        <p className="text-lg font-bold text-gray-900 mb-4">₹{p.price}</p>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => alert(`Opening edit form for ${p.name}`)}
                            className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg hover:bg-blue-100 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete ${p.name}?`)) {
                                alert(`Product deleted: ${p.name}`);
                              }
                            }}
                            className="flex-1 px-3 py-2 bg-red-50 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-100 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* User Orders Section */}
          {!isAdmin && (
            <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 card-shadow">
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Order History</h2>
                <p className="text-gray-600 mt-1">
                  {orders.length} order{orders.length !== 1 ? "s" : ""} placed
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <p className="text-4xl mb-2">📦</p>
                  <p className="text-gray-600 font-medium">No orders yet</p>
                  <p className="text-sm text-gray-500 mt-1">Start shopping to place your first order</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, idx) => (
                    <div
                      key={order._id}
                      className="border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow duration-300 hover:border-gray-300"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-600 font-semibold mb-1">ORDER ID</p>
                          <p className="text-sm font-bold text-gray-900">#{idx + 1}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 font-semibold mb-1">DATE</p>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 font-semibold mb-1">STATUS</p>
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 font-semibold mb-1">TOTAL</p>
                          <p className="text-sm font-bold text-gray-900">₹{order.totalAmount?.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => alert(`Tracking order #${idx + 1}. Your order is on the way!`)}
                          className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition text-sm"
                        >
                          Track Order
                        </button>
                        <button
                          onClick={() => alert(`Viewing details for order #${idx + 1}`)}
                          className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition text-sm"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => alert(`Invoice for order #${idx + 1} would be downloaded`)}
                          className="flex-1 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg font-semibold hover:bg-amber-100 transition text-sm"
                        >
                          Download Invoice
                        </button>
                      </div>
                    </div>
                  ))}
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

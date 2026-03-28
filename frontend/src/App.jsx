import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

/* USER PAGES */
import Shop from "./pages/Shop";
import BuyNow from "./pages/BuyNow";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import PlaceOrder from "./pages/PlaceOrder";
import OrderSuccess from "./pages/OrderSuccess";

/* ADMIN */
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import CreateProduct from "./pages/CreateProduct";

/* ===============================
   🔥 COMMON AUTH CHECK FUNCTION
   =============================== */
const checkAuth = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/check-auth`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Unauthorized");

    const data = await res.json();
    return data.user;
  } catch {
    return null;
  }
};

/* ===============================
   USER PROTECTED
   =============================== */
const UserPrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    checkAuth().then((user) => {
      setAuth(user?.role === "user");
    });
  }, []);

  if (auth === null) return <div>Loading...</div>;

  return auth ? children : <Navigate to="/auth" replace />;
};

/* ===============================
   ADMIN PROTECTED
   =============================== */
const AdminPrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    checkAuth().then((user) => {
      setAuth(user?.role === "admin");
    });
  }, []);

  if (auth === null) return <div>Loading...</div>;

  return auth ? children : <Navigate to="/admin/login" replace />;
};

/* ===============================
   ROUTES
   =============================== */
const App = () => {
  return (
    <Router>
      <Routes>

        {/* USER ROUTES */}
        <Route path="/" element={<UserPrivateRoute><Shop /></UserPrivateRoute>} />
        <Route path="/shop" element={<UserPrivateRoute><Shop /></UserPrivateRoute>} />
        <Route path="/cart" element={<UserPrivateRoute><Cart /></UserPrivateRoute>} />
        <Route path="/account" element={<UserPrivateRoute><Account /></UserPrivateRoute>} />
        <Route path="/buynow/:id" element={<UserPrivateRoute><BuyNow /></UserPrivateRoute>} />
        <Route path="/place-order" element={<UserPrivateRoute><PlaceOrder /></UserPrivateRoute>} />
        <Route path="/order-success" element={<UserPrivateRoute><OrderSuccess /></UserPrivateRoute>} />

        {/* AUTH */}
        <Route path="/auth" element={<Auth />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/dashboard" element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} />
        <Route path="/admin/products" element={<AdminPrivateRoute><AdminProducts /></AdminPrivateRoute>} />
        <Route path="/admin/products/create" element={<AdminPrivateRoute><CreateProduct /></AdminPrivateRoute>} />

      </Routes>
    </Router>
  );
};

export default App;
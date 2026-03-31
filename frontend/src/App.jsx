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
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

const API = import.meta.env.VITE_API_BASE_URL;

/* ===============================
USER PROTECTED
=============================== */
const UserPrivateRoute = ({ children }) => {
const [auth, setAuth] = useState(null);

useEffect(() => {
const checkAuth = async () => {
try {
const res = await fetch(`${API}/api/users/check-auth`, {
credentials: "include",
});

    if (!res.ok) return setAuth(false);

    const data = await res.json();
    setAuth(data?.user?.role === "user");
  } catch {
    setAuth(false);
  }
};

checkAuth();

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
const checkAuth = async () => {
try {
const res = await fetch(`${API}/api/users/check-auth`, {
credentials: "include",
});

    if (!res.ok) return setAuth(false);

    const data = await res.json();
    setAuth(data?.user?.role === "admin");
  } catch {
    setAuth(false);
  }
};

checkAuth();

}, []);

if (auth === null) return <div>Loading...</div>;
return auth ? children : <Navigate to="/auth" replace />;
};

/* ===============================
ROUTES
=============================== */
const App = () => {
return ( <Router> <Routes>

    {/* USER */}
    <Route path="/" element={<UserPrivateRoute><Shop /></UserPrivateRoute>} />
    <Route path="/shop" element={<UserPrivateRoute><Shop /></UserPrivateRoute>} />
    <Route path="/cart" element={<UserPrivateRoute><Cart /></UserPrivateRoute>} />
    <Route path="/account" element={<UserPrivateRoute><Account /></UserPrivateRoute>} />
    <Route path="/buynow/:id" element={<UserPrivateRoute><BuyNow /></UserPrivateRoute>} />
    <Route path="/place-order" element={<UserPrivateRoute><PlaceOrder /></UserPrivateRoute>} />
    <Route path="/order-success" element={<UserPrivateRoute><OrderSuccess /></UserPrivateRoute>} />

    <Route path="/auth" element={<Auth />} />

    {/* ADMIN */}
    <Route path="/admin/login" element={<Navigate to="/auth" replace />} />
    <Route path="/admin/signup" element={<Navigate to="/auth" replace />} />

    {/* 🔥 FIXED ADMIN ROOT */}
    <Route path="/admin" element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} />

    <Route path="/admin/dashboard" element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} />
    <Route path="/admin/products" element={<AdminPrivateRoute><AdminProducts /></AdminPrivateRoute>} />
    <Route path="/admin/products/create" element={<AdminPrivateRoute><CreateProduct /></AdminPrivateRoute>} />
    <Route path="/admin/products/:id" element={<AdminPrivateRoute><EditProduct /></AdminPrivateRoute>} />

  </Routes>
</Router>

);
};

export default App;

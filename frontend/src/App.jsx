import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./utils/api";

/* ===============================
   USER PAGES
   =============================== */
import Shop from "./pages/Shop";
import BuyNow from "./pages/BuyNow";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import PlaceOrder from "./pages/PlaceOrder";
import OrderSuccess from "./pages/OrderSuccess";

/* ===============================
   ADMIN PAGES
   =============================== */
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import CreateProduct from "./pages/CreateProduct";

/* ===============================
   USER PRIVATE ROUTE
   =============================== */
const UserPrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/users/check-auth`,
          { credentials: "include" }
        );
        setIsAuth(res.ok);
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkUserAuth();
  }, []);

  if (isAuth === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking user authentication...
      </div>
    );
  }

  return isAuth ? children : <Navigate to="/auth" replace />;
};

/* ===============================
   ADMIN PRIVATE ROUTE
   =============================== */
const AdminPrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/owners/check-auth`,
          { credentials: "include" }
        );
        setIsAuth(res.ok);
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkAdminAuth();
  }, []);

  if (isAuth === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking admin access...
      </div>
    );
  }

  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

/* ===============================
   APP ROUTES
   =============================== */
const App = () => {
  return (
    <Router>
      <Routes>

        {/* -------- USER ROUTES -------- */}
        <Route
          path="/"
          element={
            <UserPrivateRoute>
              <Shop />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <UserPrivateRoute>
              <Shop />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <UserPrivateRoute>
              <Account />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/buynow/:id"
          element={
            <UserPrivateRoute>
              <BuyNow />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <UserPrivateRoute>
              <Cart />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/place-order"
          element={
            <UserPrivateRoute>
              <PlaceOrder />
            </UserPrivateRoute>
          }
        />

        <Route
           path="/order-success"
           element={
           <UserPrivateRoute>
            <OrderSuccess />
          </UserPrivateRoute>
        }
        />


        {/* Public user auth */}
        <Route path="/auth" element={<Auth />} />

        {/* -------- ADMIN ROUTES -------- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminPrivateRoute>
              <AdminProducts />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/products/create"
          element={
            <AdminPrivateRoute>
              <CreateProduct />
            </AdminPrivateRoute>
          }
        />

        {/* -------- 404 -------- */}
        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center text-xl">
              404 | Page Not Found
            </div>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;

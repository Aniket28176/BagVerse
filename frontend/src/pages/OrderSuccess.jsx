import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar loggedIn />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-md w-full text-center animate-scaleUp">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-4xl">✓</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order Placed!
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will be delivered soon.
          </p>

          {/* Order Details Box */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-8">
            <p className="text-sm text-gray-600 mb-2">Order Confirmation</p>
            <p className="text-2xl font-bold text-green-600">
              #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              You'll receive an email confirmation shortly
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-xl p-4 mb-8 text-left">
            <p className="font-semibold text-gray-900 mb-3">What's Next?</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Order confirmation sent to your email</li>
              <li>✓ Your item will be packed and shipped</li>
              <li>✓ Track your order in My Orders</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/account")}
              className="flex-1 px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Track Order
            </button>

            <button
              onClick={() => navigate("/shop")}
              className="flex-1 px-6 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderSuccess;

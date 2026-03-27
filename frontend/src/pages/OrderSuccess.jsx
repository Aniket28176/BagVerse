import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  // Simple invoice generator (creates a text-based invoice)
  const downloadInvoice = () => {
    const invoiceContent = `
================================================================================
                            ORDER INVOICE
================================================================================

Order Number: #${orderNumber}
Order Date: ${new Date().toLocaleDateString()}
Status: Confirmed

================================================================================
DELIVERY ADDRESS
================================================================================
[Delivery address from user account]

================================================================================
ORDER DETAILS
================================================================================
Product................: Premium Bag
Quantity...............: 1
Price..................: ₹[Amount]
Tax (18%).............: ₹[Tax Amount]
Shipping.............: FREE

================================================================================
TOTAL AMOUNT: ₹[Total]
================================================================================

Payment Method: Stripe (Secure Payment)
Payment Status: Completed

================================================================================
IMPORTANT NOTES
================================================================================
✓ Your order has been confirmed and will be dispatched within 2-3 business days
✓ Tracking information will be sent to your registered email
✓ For queries, please contact: support@bagverse.com
✓ Return & refund policy valid for 30 days

================================================================================
Thank you for your purchase!
For more details, visit: www.bagverse.com
================================================================================
    `;

    const element = document.createElement('a');
    const file = new Blob([invoiceContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Invoice_${orderNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <Navbar loggedIn />

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 py-12">
        <div className="bg-gray-800 border border-gray-700 p-10 md:p-16 max-w-md w-full text-center animate-fadeInDown">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-green-900 border-2 border-green-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-5xl text-green-500">✓</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 uppercase tracking-tight">
            Order Placed!
          </h1>

          {/* Subheading */}
          <p className="text-sm text-gray-300 mb-10 uppercase tracking-wide font-light">
            Thank you for your purchase. Your premium bag order has been confirmed and will be delivered soon.
          </p>

          {/* Order Details Box */}
          <div className="bg-gray-700 border-2 border-green-500 p-6 mb-10">
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest font-light">Order Confirmation</p>
            <p className="text-3xl font-bold text-green-500 mb-2">#{orderNumber}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-light">
              Confirmation email sent to your registered email address
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-700 border border-gray-600 p-6 mb-10 text-left">
            <p className="font-bold text-white mb-4 uppercase tracking-widest text-sm">What's Next?</p>
            <ul className="space-y-3 text-xs text-gray-300 uppercase tracking-wide font-light">
              <li className="flex items-start gap-2">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>Order confirmation sent to your email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>Your item will be packed and shipped within 2-3 days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>Track your order in "My Orders" section</span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <button
              onClick={downloadInvoice}
              className="w-full px-6 py-4 bg-yellow-600 text-black font-bold rounded-none hover:bg-yellow-500 active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs"
            >
              ⬇ Download Invoice
            </button>

            <button
              onClick={() => navigate("/account")}
              className="w-full px-6 py-4 border-2 border-yellow-600 text-yellow-600 font-bold rounded-none hover:bg-yellow-600 hover:text-black transition-all duration-300 uppercase tracking-widest text-xs"
            >
              Track Order
            </button>

            <button
              onClick={() => navigate("/shop")}
              className="w-full px-6 py-4 text-gray-300 font-bold rounded-none hover:text-white transition-all duration-300 uppercase tracking-widest text-xs border border-gray-600 hover:border-gray-500"
            >
              Continue Shopping
            </button>
          </div>

          {/* Trust Badge */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-light">
              🔒 Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderSuccess;

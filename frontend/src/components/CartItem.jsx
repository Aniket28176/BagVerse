import { useState } from "react";
import api from "../utils/api";

const CartItem = ({ item, onCartUpdate }) => {
  const [qty, setQty] = useState(1);
  const [isRemoving, setIsRemoving] = useState(false);

  const netTotal = item.price - Number(item.discount || 0) + 20;

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await api.delete(`/api/cart/remove/${item._id}`);
      onCartUpdate();
    } catch (err) {
      console.error("Error removing item:", err);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0 animate-fadeIn">
      {/* Product Image */}
      <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 shadow-soft">
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: item.bgcolor || "#f5f5f5" }}
        >
          <img
            className="h-full w-full object-contain"
            src={`data:image/jpeg;base64,${item.image}`}
            alt={item.name}
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
          <p className="text-sm text-gray-600 mb-3">
            SKU: {item._id?.substring(0, 8)}
          </p>

          {/* Price Info */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
            {item.discount && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  ₹{item.price + Number(item.discount)}
                </span>
                <span className="text-xs font-bold text-green-600">
                  Save ₹{item.discount}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Quantity & Actions */}
        <div className="flex items-center justify-between">
          {/* Quantity Selector */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => qty > 1 && setQty(qty - 1)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition"
            >
              −
            </button>
            <div className="w-8 h-8 flex items-center justify-center font-semibold">
              {qty}
            </div>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition"
            >
              +
            </button>
          </div>

          {/* Total for this item */}
          <div className="text-right">
            <p className="text-xs text-gray-600 mb-1">Subtotal</p>
            <p className="text-lg font-bold text-gray-900">₹{(netTotal * qty).toLocaleString()}</p>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition disabled:opacity-50"
          >
            {isRemoving ? "..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

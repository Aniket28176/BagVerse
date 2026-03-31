import { Link } from "react-router-dom";

const AdminProductCard = ({ product, onDelete, isDeleting = false }) => {
  if (!product) return null;

  return (
    <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden">
      {/* IMAGE */}
      <div className="w-full h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      {/* DETAILS */}
      <div className="px-4 py-4">
        <div className="mb-4">
          <h3 className="font-semibold text-sm truncate">{product.name}</h3>
          <h4 className="text-gray-600 text-sm">₹ {product.price}</h4>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/admin/products/${product._id}`}
            className="flex-1 text-center px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            title="Edit product"
          >
            Edit
          </Link>

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(product._id)}
              disabled={isDeleting}
              className={`flex-1 px-3 py-2 rounded-md text-white ${
                isDeleting ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;

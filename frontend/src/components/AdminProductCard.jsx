import { Link } from "react-router-dom";

const AdminProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="w-60 bg-white rounded-lg shadow-md overflow-hidden">
      
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
      <div className="flex justify-between items-center px-4 py-4">
        <div>
          <h3 className="font-semibold text-sm truncate">
            {product.name}
          </h3>
          <h4 className="text-gray-600 text-sm">
            ₹ {product.price}
          </h4>
        </div>

        <Link
          to={`/admin/products/${product._id}`}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600"
          title="Edit product"
        >
          +
        </Link>
      </div>
    </div>
  );
};

export default AdminProductCard;

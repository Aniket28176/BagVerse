import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/api";

const initialFormData = {
  name: "",
  price: "",
  discount: "",
  bgcolor: "",
  panelcolor: "",
  textcolor: "",
};

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${id}`);
        const product = res.data;

        setFormData({
          name: product.name || "",
          price: product.price ?? "",
          discount: product.discount ?? "",
          bgcolor: product.bgcolor || "",
          panelcolor: product.panelcolor || "",
          textcolor: product.textcolor || "",
        });

        if (product.image) {
          setPreview(`data:image/jpeg;base64,${product.image}`);
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Your session expired. Please log in again.");
          setTimeout(() => navigate("/auth"), 800);
        } else if (err.response?.status === 404) {
          setError("This product was not found. It may have already been deleted.");
        } else {
          console.error(err);
          setError(err.response?.data?.message || "Failed to load product details");
        }
      } finally {
        setPageLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files?.[0] || null;
    setImage(selectedImage);

    if (selectedImage) {
      setPreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (image) {
        data.append("image", image);
      }

      await api.put(`/api/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("✅ Product updated successfully!");
      setTimeout(() => navigate("/admin/dashboard"), 800);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Your session expired. Please log in again.");
        setTimeout(() => navigate("/auth"), 800);
      } else if (err.response?.status === 404) {
        setError("This product was not found. It may have already been deleted.");
      } else {
        console.error(err);
        setError(err.response?.data?.message || "Failed to update product");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar loggedIn={true} isAdmin={true} />

      {success && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 px-5 py-3 rounded-md shadow-lg z-50">
          <span className="text-white">{success}</span>
        </div>
      )}

      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 px-5 py-3 rounded-md shadow-lg z-50">
          <span className="text-white">{error}</span>
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        <div className="container px-10 py-20 flex flex-grow">
          <div className="w-[25%] flex flex-col">
            <Link className="mb-2" to="/admin/dashboard">
              Dashboard
            </Link>
            <Link className="mb-2" to="/admin/products">
              All Products
            </Link>
            <Link className="mb-2" to="/admin/products/create">
              Create Product
            </Link>
          </div>

          <main className="w-3/4 bg-white p-8 shadow ml-4">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            {pageLoading ? (
              <p>Loading product details...</p>
            ) : (
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Product Image</label>
                  {preview && (
                    <img
                      src={preview}
                      alt="Product preview"
                      className="w-32 h-32 object-cover rounded-md mb-3 border"
                    />
                  )}
                  <input type="file" onChange={handleImageChange} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number"
                    placeholder="Price"
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    type="number"
                    placeholder="Discount"
                    className="border p-2 rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <input
                    name="bgcolor"
                    value={formData.bgcolor}
                    onChange={handleChange}
                    placeholder="Background Color"
                    className="border p-2 rounded"
                  />
                  <input
                    name="panelcolor"
                    value={formData.panelcolor}
                    onChange={handleChange}
                    placeholder="Panel Color"
                    className="border p-2 rounded"
                  />
                  <input
                    name="textcolor"
                    value={formData.textcolor}
                    onChange={handleChange}
                    placeholder="Text Color"
                    className="border p-2 rounded"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-3 text-white rounded ${
                      loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/admin/dashboard")}
                    className="px-6 py-3 rounded border border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditProduct;

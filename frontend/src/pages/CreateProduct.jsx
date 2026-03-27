import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    bgcolor: "",
    panelcolor: "",
    textcolor: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===============================
     HANDLE INPUT
     =============================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ===============================
     HANDLE SUBMIT
     =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!image) {
      return setError("Please upload an image");
    }

    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("image", image);

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/products/create`,
        data,
        {
          withCredentials: true, // 🔥 REQUIRED
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("✅ Product created successfully!");

      setFormData({
        name: "",
        price: "",
        discount: "",
        bgcolor: "",
        panelcolor: "",
        textcolor: "",
      });

      setImage(null);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "❌ Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar loggedIn={true} isAdmin={true} />

      {/* SUCCESS */}
      {success && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 px-5 py-3 rounded-md shadow-lg z-50">
          <span className="text-white">{success}</span>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 px-5 py-3 rounded-md shadow-lg z-50">
          <span className="text-white">{error}</span>
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        <div className="container px-10 py-20 flex flex-grow">

          {/* SIDEBAR */}
          <div className="w-[25%] flex flex-col">
            <Link className="mb-2" to="/admin/products">
              All Products
            </Link>
            <Link className="mb-2" to="/admin/products/create">
              Create Product
            </Link>
          </div>

          {/* MAIN */}
          <main className="w-3/4 bg-white p-8 shadow ml-4">
            <h2 className="text-xl font-bold mb-4">
              Create New Product
            </h2>

            <form onSubmit={handleSubmit} autoComplete="off">

              {/* IMAGE */}
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Product Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>

              {/* INPUTS */}
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

              {/* COLORS */}
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

              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 text-white rounded ${
                  loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </form>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CreateProduct;
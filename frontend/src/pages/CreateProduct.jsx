import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    bgcolor: "",
    panelcolor: "",
    textcolor: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      data.append("image", image);

      await axios.post(
  "${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/products/create",
  data,
  {
    withCredentials: true, // 🔥 THIS FIXES 401
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);


      setSuccess("Product created successfully!");
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
      console.log(err);
    }
  };

  return (
    <>
      <Navbar loggedIn={true} isAdmin={true} />


      {success && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 p-3 rounded-md bg-blue-500">
          <span className="text-white">{success}</span>
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        <div className="container px-10 py-20 flex flex-grow">

          {/* Sidebar */}
          <div className="w-[25%] flex flex-col">
            <Link className="mb-2" to="/admin/products">
              All Products
            </Link>
            <Link className="mb-2" to="/admin/products/create">
              Create new product
            </Link>
          </div>

          {/* Main */}
          <main className="w-3/4 bg-white p-8 shadow ml-4">
            <h2 className="text-xl font-bold mb-4">
              Create New Product
            </h2>

            <form onSubmit={handleSubmit} autoComplete="off">
              {/* Product Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Product Details
                </h3>

                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Product Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="py-2 px-4 rounded"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Product Name"
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number"
                    placeholder="Product Price"
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    type="number"
                    placeholder="Discount Price"
                    className="border p-2 rounded"
                  />
                </div>
              </div>

              {/* Panel Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Panel Details
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="bgcolor"
                    value={formData.bgcolor}
                    onChange={handleChange}
                    type="text"
                    placeholder="Background Color"
                    className="border p-2 rounded"
                  />
                  <input
                    name="panelcolor"
                    value={formData.panelcolor}
                    onChange={handleChange}
                    type="text"
                    placeholder="Panel Color"
                    className="border p-2 rounded"
                  />
                  <input
                    name="textcolor"
                    value={formData.textcolor}
                    onChange={handleChange}
                    type="text"
                    placeholder="Text Color"
                    className="border p-2 rounded"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2 rounded bg-blue-500 text-white"
              >
                Create New Product
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

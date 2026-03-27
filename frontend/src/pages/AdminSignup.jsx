import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminSignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/api/owners/create", formData);

      setSuccess("Admin account created. You can now log in.");

      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create admin account"
      );
    }
  };

  return (
    <>
      <Navbar loggedIn={false} isAdmin={true} />

      {error && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 p-3 bg-red-500 rounded-md">
          <span className="text-white">{error}</span>
        </div>
      )}

      {success && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 p-3 bg-green-500 rounded-md">
          <span className="text-white">{success}</span>
        </div>
      )}

      <div className="w-full h-screen flex items-center justify-center px-20">
        <div className="w-full max-w-md">
          <h4 className="text-2xl mb-5">Admin Signup</h4>

          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              className="block bg-zinc-100 w-full px-3 py-2 border rounded-md mb-3"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              required
            />

            <input
              className="block bg-zinc-100 w-full px-3 py-2 border rounded-md mb-3"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <input
              className="block bg-zinc-100 w-full px-3 py-2 border rounded-md mb-3"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <button
              type="submit"
              className="px-5 rounded-full py-3 mt-2 bg-blue-500 text-white"
            >
              Create Admin Account
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminSignup;

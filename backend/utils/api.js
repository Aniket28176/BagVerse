import axios from "axios";

const api = axios.create({
  baseURL: "https://bagverse-ghle.onrender.com/api", // ✅ ADD /api
  withCredentials: true,
});

export default api;
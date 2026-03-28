import axios from "axios";

const api = axios.create({
  baseURL: "https://bagverse-ghle.onrender.com",
  withCredentials: true,   // 🔥 THIS LINE IS MANDATORY
});

export default api;
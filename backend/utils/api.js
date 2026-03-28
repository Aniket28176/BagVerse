import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,   // 🔥 THIS LINE IS MANDATORY
});

export default api;
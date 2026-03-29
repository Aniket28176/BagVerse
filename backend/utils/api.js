import axios from "axios";

const api = axios.create({
  baseURL: "https://bagverse-kg01.onrender.com",
  withCredentials: true,
});

export default api;
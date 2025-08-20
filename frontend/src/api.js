import axios from "axios";

const api = axios.create({
  baseURL: 'https://food-4zgz.onrender.com',
//   baseURL: 'http://localhost:5001',
  withCredentials: true,
});

export default api;

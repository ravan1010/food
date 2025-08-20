import axios from "axios";

const api = axios.create({
  baseURL: 'https://food-4zgz.onrender.com',
  withCredentials: true,
});

export default api;

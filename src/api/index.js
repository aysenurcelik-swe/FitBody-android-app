import axios from "axios";

// Senin gönderdiğin linki buraya ekledik
const api = axios.create({
  baseURL: "https://69c44f7fb780a9ba03e96228.mockapi.io/FitBody/api/",
});

export default api;

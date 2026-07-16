import axios from "axios";
import { env } from "../Utils/env.js";

const API = axios.create({
  baseURL: `${env.backendEndPoint}/api`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

const ApiRequest = {
  get: (url, params = {}) => API.get(url, { params }),

  post: (url, data = {}) => API.post(url, data),

  put: (url, data = {}) => API.put(url, data),

  patch: (url, data = {}) => API.patch(url, data),

  delete: (url) => API.delete(url),
};

export default ApiRequest;

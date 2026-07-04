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

const ApiRequest = {
  get: (url, params = {}) => {
    return API.get(url, { params });
  },

  post: (url, data = {}) => {
    return API.post(url, data);
  },

  put: (url, data = {}) => {
    return API.put(url, data);
  },

  patch: (url, data = {}) => {
    return API.patch(url, data);
  },

  delete: (url) => {
    return API.delete(url);
  },
};

export default ApiRequest;

import ApiRequest from "./MakeApi.jsx";

export const AuthApi = {
  register: (data) => {
    return ApiRequest.post("/register", data);
  },

  login: (data) => {
    return ApiRequest.post("/login", data);
  },
  //Lead management
  getLead: (data) => {
    return ApiRequest.get("/get", data);
  },
  createLead: (data) => {
    return ApiRequest.post("/create-lead", data);
  },
  updateLead: (id, data) => {
    return ApiRequest.put(`/lead/${id}`, data);
  },
  deleteLead: (id) => {
    return ApiRequest.delete(`/lead/${id}`);
  },
  getLeadById: (id) => {
    return ApiRequest.get(`/getById/${id}`);
  },
  // Customer Managements

  getCustomer: (data) => {
    return ApiRequest.get("/get", data);
  },
  createCustomer: (data) => {
    return ApiRequest.post("/create-lead", data);
  },
  updateCustomer: (id, data) => {
    return ApiRequest.put(`/lead/${id}`, data);
  },
  deleteCustomer: (id) => {
    return ApiRequest.delete(`/lead/${id}`);
  },
  getCustomerById: (id) => {
    return ApiRequest.get(`/getById/${id}`);
  },
};

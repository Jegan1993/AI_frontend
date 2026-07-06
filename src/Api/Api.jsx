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

  // Api/Api.jsx

  getCustomer: (params) => ApiRequest.get("/customers", params),

  createCustomer: (leadId) => ApiRequest.post(`/customer/create/${leadId}`),

  getCustomerById: (id) => ApiRequest.get(`/customer/${id}`),

  updateCustomer: (id, data) => ApiRequest.put(`/customer/${id}`, data),

  deleteCustomer: (id) => ApiRequest.delete(`/customer/${id}`),
};

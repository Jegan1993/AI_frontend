import ApiRequest from "./MakeApi.jsx";

export const API = {
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

  getCustomer: (params) => ApiRequest.get("/customers", params),

  createCustomer: (leadId) => ApiRequest.post(`/customer/create/${leadId}`),

  getCustomerById: (id) => ApiRequest.get(`/customer/${id}`),

  updateCustomer: (id, data) => ApiRequest.put(`/customer/${id}`, data),

  deleteCustomer: (id) => ApiRequest.delete(`/customer/${id}`),

  //quotation

  getQuotation: (params) => ApiRequest.get("/quotation", params),

  createQuotation: (data) => ApiRequest.post("/quotation", data),

  getQuotationById: (id) => ApiRequest.get(`/quotation/${id}`),

  updateQuotation: (id, data) => ApiRequest.put(`/quotation/${id}`, data),

  deleteQuotation: (id) => ApiRequest.delete(`/quotation/${id}`),

  updateQuotationStatus: (id, data) => {
    return ApiRequest.put(`/quotation/status/${id}`, data);
  },

  // Order management

  getOrder: (params) => ApiRequest.get("/get-order", params),

  createOrder: (data) => ApiRequest.post("/create-order", data),

  getOrderById: (id) => ApiRequest.get(`/get-order/${id}`),

  updateOrder: (id, data) => ApiRequest.put(`/update-order/${id}`, data),

  deleteOrder: (id) => ApiRequest.delete(`/delete-order/${id}`),

  updateOrderStatus: (id, data) => {
    return ApiRequest.put(`/order/status/${id}`, data);
  },
  //shipment api

  getShipment: (params) => ApiRequest.get("/get-shipment", params),

  createShipment: (data) => ApiRequest.post("/create-shipment", data),

  getShipmentById: (id) => ApiRequest.get(`/get-shipment/${id}`),

  updateShipment: (id, data) => ApiRequest.put(`/update-shipment/${id}`, data),

  deleteShipment: (id) => ApiRequest.delete(`/delete-shipment/${id}`),

  updateShipmentStatus: (id, data) =>
    ApiRequest.put(`/shipment/status/${id}`, data),
  updateRouteLocation: (id, data) =>
    ApiRequest.put(`/shipment/location/${id}`, data),


 
  //Notification

  getNotifications: (params) => ApiRequest.get("/notifications", params),

  markAsRead: (id) => ApiRequest.put(`/notification/read/${id}`),

  deleteNotification: (id) => ApiRequest.delete(`/notification/${id}`),

  //wareHouse

  getWarehouse: () => ApiRequest.get("/get-warehouse"),

  createWarehouse: (data) => ApiRequest.post("/create-warehouse", data),

  getWarehouseById: (id) => ApiRequest.get(`/get-warehouse/${id}`),

  updateWarehouse: (id, data) =>
    ApiRequest.put(`/update-warehouse/${id}`, data),

  deleteWarehouse: (id) => ApiRequest.delete(`/delete-warehouse/${id}`),

  warehouseAnalytics: () => ApiRequest.get("/warehouse/analytics"),

  warehouseCapacity: (id) => ApiRequest.get(`/warehouse/capacity/${id}`),

  // Inventory

  createInventory: (data) => {
    return ApiRequest.post("/inventory/create", data);
  },

  getInventory: () => {
    return ApiRequest.get("/inventory/get");
  },

  getInventoryById: (id) => {
    return ApiRequest.get(`/inventory/get/${id}`);
  },

  updateInventory: (id, data) => {
    return ApiRequest.put(`/inventory/update/${id}`, data);
  },

  deleteInventory: (id) => {
    return ApiRequest.delete(`/inventory/delete/${id}`);
  },

  // Stock

  stockIn: (data) => {
    return ApiRequest.post("/stock/in", data);
  },

  stockOut: (data) => {
    return ApiRequest.post("/stock/out", data);
  },

  getStockHistory: () => {
    return ApiRequest.get("/stock/history");
  },

  getStockById: (id) => {
    return ApiRequest.get(`/stock/get/${id}`);
  },
};

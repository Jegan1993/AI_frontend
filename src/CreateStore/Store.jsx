import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../CreateSlice/AuthSlice.jsx";
import leadReducer from "../CreateSlice/LeadSlice.jsx";
import customerSlice from "../CreateSlice/CustomerSlice.jsx";
import quotationReducer from "../CreateSlice/QuotationSlice.jsx";
import aiReducer from "../CreateSlice/AiSlice.jsx";
import order from "../CreateSlice/OrderSlice.jsx";
import shipment from "../CreateSlice/ShipmentSlice.jsx";
import notificationReducer from "../CreateSlice/NotificationSlice.jsx";
import warehouseReducer from "../CreateSlice/WareHouseSlice.jsx";
import InventoryReducer from "../CreateSlice/InventorySlice.jsx";
import StockReducer from "../CreateSlice/StockSlice.jsx";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    lead: leadReducer,
    customer: customerSlice,
    quotation: quotationReducer,
    ai: aiReducer,
    order: order,
    shipment: shipment,
    notification: notificationReducer,
    warehouse: warehouseReducer,
    inventory: InventoryReducer,
    stock: StockReducer,
  },
});

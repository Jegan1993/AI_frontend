import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../CreateSlice/AuthSlice.jsx";
import leadReducer from "../CreateSlice/LeadSlice.jsx";
import customerSlice from "../CreateSlice/CustomerSlice.jsx";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    lead: leadReducer,
    customer: customerSlice,
  },
});

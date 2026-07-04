import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../CreateSlice/AuthSlice.jsx";
import leadReducer from "../CreateSlice/LeadSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lead: leadReducer,
  },
});

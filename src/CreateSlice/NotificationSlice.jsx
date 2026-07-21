import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../Api/Api.jsx";
export const getNotifications = createAsyncThunk(
  "notification/getNotifications",
  async (_, thunkAPI) => {
    try {
      const response = await API.getNotifications();

      return response.data.data.notifications;
    } catch (err) {
      console.log(err.response);

      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const markAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (id, thunkAPI) => {
    try {
      const response = await API.markAsRead(id);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const NotificationSlice = createSlice({
  name: "notification",

  initialState: {
    notifications: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
      })

      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })

      .addCase(getNotifications.rejected, (state) => {
        state.loading = false;
      })

      .addCase(markAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(
          (x) => x._id === action.payload._id,
        );

        if (index !== -1) {
          state.notifications[index] = action.payload;
        }
      });
  },
});

export default NotificationSlice.reducer;

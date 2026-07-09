import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../Api/Api.jsx";

export const getOrder = createAsyncThunk(
  "order/get",
  async (data, thunkAPI) => {
    try {
      const res = await AuthApi.getOrder(data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const createOrder = createAsyncThunk(
  "order/create",
  async (data, thunkAPI) => {
    try {
      const res = await AuthApi.createOrder(data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const getOrderById = createAsyncThunk(
  "order/getById",
  async (id, thunkAPI) => {
    try {
      const res = await AuthApi.getOrderById(id);

      console.log("API Response:", res.data);

      return res.data;
    } catch (error) {
      console.log(error.response);

      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const updateOrder = createAsyncThunk(
  "order/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await AuthApi.updateOrder(id, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (data, thunkAPI) => {
    try {
      const res = await AuthApi.deleteOrder(data);

      return res.data;
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const updateOrderStatus = createAsyncThunk(
  "order/updateStatus",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await AuthApi.updateOrderStatus(id, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
const initialState = {
  order: [],
  selectedOrder: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data.orders;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
      })

      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order.unshift(action.payload.data);
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.order = state.order.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item,
        );
      })

      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload.data;
      })

      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.order = state.order.filter(
          (item) => item._id !== action.payload.data._id,
        );
      })

      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.order.findIndex(
          (item) => item._id === action.payload.data._id,
        );

        if (index !== -1) {
          state.order[index] = action.payload.data;
        }
      })

      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;

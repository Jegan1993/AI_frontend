import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../Api/Api";

export const stockIn = createAsyncThunk(
  "stock/stockIn",
  async (data, thunkAPI) => {
    try {
      const response = await API.stockIn(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const stockOut = createAsyncThunk(
  "stock/stockOut",
  async (data, thunkAPI) => {
    try {
      const response = await API.stockOut(data);
      console.log("response stock out -------", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const getStockHistory = createAsyncThunk(
  "stock/getStockHistory",
  async (params, thunkAPI) => {
    try {
      const response = await API.getStockHistory(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const getStockById = createAsyncThunk(
  "stock/getStockById",
  async (id, thunkAPI) => {
    try {
      const response = await API.getStockById(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
const initialState = {
  loading: false,
  stockHistory: [],
  stockDetails: null,

  total: 0,
  page: 1,
  limit: 10,

  error: null,
};

const StockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    clearStock: (state) => {
      state.stockDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Stock In
      .addCase(stockIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(stockIn.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(stockIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Stock Out
      .addCase(stockOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(stockOut.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(stockOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Stock History
      .addCase(getStockHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStockHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.stockHistory = action.payload.data.history;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
      })
      .addCase(getStockHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Stock Details
      .addCase(getStockById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStockById.fulfilled, (state, action) => {
        state.loading = false;
        state.stockDetails = action.payload.data;
      })
      .addCase(getStockById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStock } = StockSlice.actions;

export default StockSlice.reducer;

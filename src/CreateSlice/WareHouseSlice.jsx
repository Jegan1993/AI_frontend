import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../Api/Api.jsx";

export const getWarehouses = createAsyncThunk(
  "warehouse/get",
  async (params, thunkAPI) => {
    try {
      const response = await API.getWarehouse(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const createWarehouse = createAsyncThunk(
  "warehouse/create",
  async (data, thunkAPI) => {
    try {
      const response = await API.createWarehouse(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const getWarehouseById = createAsyncThunk(
  "warehouse/getById",
  async (id, thunkAPI) => {
    try {
      const response = await API.getWarehouseById(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const updateWarehouse = createAsyncThunk(
  "warehouse/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await API.updateWarehouse(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const deleteWarehouse = createAsyncThunk(
  "warehouse/delete",
  async (id, thunkAPI) => {
    try {
      const response = await API.deleteWarehouse(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const warehouseCapacity = createAsyncThunk(
  "warehouse/capacity",
  async (id, thunkAPI) => {
    try {
      const response = await API.warehouseCapacity(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const warehouseAnalytics = createAsyncThunk(
  "warehouse/analytics",
  async (_, thunkAPI) => {
    try {
      const response = await API.warehouseAnalytics();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

const initialState = {
  warehouses: [],
  selectedWarehouse: null,

  analytics: null,
  capacity: null,

  loading: false,
  error: null,

  total: 0,
  page: 1,
  limit: 10,
};

const warehouseSlice = createSlice({
  name: "warehouse",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getWarehouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getWarehouses.fulfilled, (state, action) => {
        state.loading = false;

        state.warehouses = action.payload.data.warehouses;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
      })

      .addCase(getWarehouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createWarehouse.pending, (state) => {
        state.loading = true;
      })

      .addCase(createWarehouse.fulfilled, (state, action) => {
        state.loading = false;

        state.warehouses.unshift(action.payload.data);
      })

      .addCase(createWarehouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getWarehouseById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getWarehouseById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedWarehouse = action.payload.data;
      })

      .addCase(getWarehouseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateWarehouse.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateWarehouse.fulfilled, (state, action) => {
        state.loading = false;

        state.warehouses = state.warehouses.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item,
        );
      })

      .addCase(updateWarehouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteWarehouse.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteWarehouse.fulfilled, (state, action) => {
        state.loading = false;

        state.warehouses = state.warehouses.filter(
          (item) => item._id !== action.payload.data._id,
        );
      })

      .addCase(deleteWarehouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(warehouseCapacity.pending, (state) => {
        state.loading = true;
      })

      .addCase(warehouseCapacity.fulfilled, (state, action) => {
        state.loading = false;

        state.capacity = action.payload.data;
      })

      .addCase(warehouseCapacity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(warehouseAnalytics.pending, (state) => {
        state.loading = true;
      })

      .addCase(warehouseAnalytics.fulfilled, (state, action) => {
        state.loading = false;

        state.analytics = action.payload.data;
      })

      .addCase(warehouseAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default warehouseSlice.reducer;

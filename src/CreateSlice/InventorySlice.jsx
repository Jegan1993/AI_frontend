import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../Api/Api";

// Create Inventory
export const createInventory = createAsyncThunk(
  "inventory/createInventory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.createInventory(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create inventory",
      );
    }
  },
);

// Get All Inventory
export const getInventory = createAsyncThunk(
  "inventory/getInventory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.getInventory();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch inventory",
      );
    }
  },
);

// Get Inventory By Id
export const getInventoryById = createAsyncThunk(
  "inventory/getInventoryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.getInventoryById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch inventory",
      );
    }
  },
);

// Update Inventory
export const updateInventory = createAsyncThunk(
  "inventory/updateInventory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.updateInventory(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update inventory",
      );
    }
  },
);

// Delete Inventory
export const deleteInventory = createAsyncThunk(
  "inventory/deleteInventory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.deleteInventory(id);
      return {
        id,
        ...response.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete inventory",
      );
    }
  },
);
export const InventoryForecasting = createAsyncThunk(
  "inventory/InventoryForecasting",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.InventoryForecasting(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch inventory",
      );
    }
  },
);
const initialState = {
  inventories: [],
  inventory: null,
  forecast: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};
const inventorySlice = createSlice({
  name: "inventory",
  initialState,

  reducers: {
    clearInventory: (state) => {
      state.inventory = null;
    },

    clearInventoryError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Create
      .addCase(createInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventories.unshift(action.payload.data);
      })
      .addCase(createInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(getInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInventory.fulfilled, (state, action) => {
        state.loading = false;

        state.inventory = action.payload.data.inventories;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
      })
      .addCase(getInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By Id
      // .addCase(getInventoryById.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(getInventoryById.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.inventory = action.payload.data;
      // })
      // .addCase(getInventoryById.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      .addCase(getInventoryById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getInventoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.inventory = action.payload.data;
      })

      .addCase(getInventoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        state.loading = false;

        state.inventories = state.inventories.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item,
        );

        state.inventory = action.payload.data;
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.loading = false;

        state.inventories = state.inventories.filter(
          (item) => item._id !== action.payload.id,
        );
      })
      .addCase(deleteInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(InventoryForecasting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(InventoryForecasting.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload.data;
      })

      .addCase(InventoryForecasting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearInventory, clearInventoryError } = inventorySlice.actions;

export default inventorySlice.reducer;

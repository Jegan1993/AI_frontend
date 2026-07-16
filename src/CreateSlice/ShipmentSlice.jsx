import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../Api/Api";

export const getShipments = createAsyncThunk(
  "shipment/get",
  async (params, thunkAPI) => {
    try {
      const response = await API.getShipment(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const createShipment = createAsyncThunk(
  "shipment/create",
  async (data, thunkAPI) => {
    try {
      const response = await API.createShipment(data);
      console.log("response", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const getShipmentById = createAsyncThunk(
  "shipment/getById",
  async (id, thunkAPI) => {
    try {
      const response = await API.getShipmentById(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const updateShipment = createAsyncThunk(
  "shipment/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await API.updateShipment(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const deleteShipment = createAsyncThunk(
  "shipment/delete",
  async (id, thunkAPI) => {
    try {
      const response = await API.deleteShipment(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const updateShipmentStatus = createAsyncThunk(
  "shipment/updateStatus",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await API.updateShipmentStatus(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const updateRouteLocation = createAsyncThunk(
  "shipment/updateRouteLocation",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await API.updateRouteLocation(id, data);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  shipments: [],
  selectedShipment: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};

const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getShipments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getShipments.fulfilled, (state, action) => {
        state.loading = false;

        state.shipments = action.payload.data.shipments;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
      })

      .addCase(getShipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments.unshift(action.payload.data);
      })

      .addCase(createShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getShipmentById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getShipmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedShipment = action.payload.data;
      })

      .addCase(getShipmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateShipment.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateShipment.fulfilled, (state, action) => {
        state.loading = false;

        state.shipments = state.shipments.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item,
        );
      })

      .addCase(updateShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteShipment.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteShipment.fulfilled, (state, action) => {
        state.loading = false;

        state.shipments = state.shipments.filter(
          (item) => item._id !== action.payload.data._id,
        );
      })

      .addCase(deleteShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateShipmentStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.shipments = state.shipments.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item,
        );
      })
      .addCase(updateRouteLocation.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateRouteLocation.fulfilled, (state, action) => {
        state.loading = false;

        state.shipments = state.shipments.map((item) =>
          item._id === action.payload.data.shipment._id
            ? action.payload.data.shipment
            : item,
        );

        state.selectedShipment = action.payload.data.shipment;
      })

      .addCase(updateRouteLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default shipmentSlice.reducer;

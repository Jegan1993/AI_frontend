import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../Api/Api.jsx";

export const getFleetVehicle = createAsyncThunk(
  "vehicle/get",
  async (params, thunkAPI) => {
    try {
      const res = await API.getVehicles(params);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const createFleetVehicle = createAsyncThunk(
  "vehicle/create",
  async (data, thunkAPI) => {
    try {
      const res = await API.createVehicle(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const getFleetVehicleById = createAsyncThunk(
  "vehicle/getById",
  async (id, thunkAPI) => {
    try {
      const res = await API.getVehicleById(id);

      return res.data;
    } catch (error) {
      console.log(error.response);

      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const updateFleetVehicle = createAsyncThunk(
  "vehicle/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.updateVehicle(id, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const deleteFleetVehicle = createAsyncThunk(
  "vehicle/delete",
  async (id, thunkAPI) => {
    try {
      const res = await API.deleteVehicle(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

const initialState = {
  vehicles: [],
  vehicle: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};
const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getFleetVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getFleetVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload.data.vehicles;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
      })

      .addCase(getFleetVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createFleetVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createFleetVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles.unshift(action.payload.data);
      })

      .addCase(createFleetVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFleetVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFleetVehicle.fulfilled, (state, action) => {
        state.loading = false;

        state.vehicles = state.vehicles.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item,
        );

        state.vehicle = action.payload.data;
      })

      .addCase(updateFleetVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFleetVehicleById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getFleetVehicleById.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicle = action.payload.data;
      })

      .addCase(getFleetVehicleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteFleetVehicle.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteFleetVehicle.fulfilled, (state, action) => {
        state.loading = false;

        state.vehicles = state.vehicles.filter(
          (item) => item._id !== action.payload.data._id,
        );
      })

      .addCase(deleteFleetVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default vehicleSlice.reducer;

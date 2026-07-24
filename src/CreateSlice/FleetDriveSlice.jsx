import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../Api/Api.jsx";

export const getFleetDriver = createAsyncThunk(
  "driver/get",
  async (params, thunkAPI) => {
    try {
      const res = await API.getFleetDriver(params);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const createFleetDriver = createAsyncThunk(
  "driver/create",
  async (data, thunkAPI) => {
    try {
      const res = await API.createFleetDriver(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const getFleetDriverById = createAsyncThunk(
  "driver/getById",
  async (id, thunkAPI) => {
    try {
      const res = await API.getFleetDriverById(id);

      return res.data;
    } catch (error) {
      console.log(error.response);

      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const updateFleetDriver = createAsyncThunk(
  "driver/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.updateFleetDriver(id, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const deleteFleetDriver = createAsyncThunk(
  "driver/delete",
  async (id, thunkAPI) => {
    try {
      const res = await API.deleteFleetDriver(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

const initialState = {
  drivers: [],
  driver: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getFleetDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getFleetDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload.data.drivers;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
      })

      .addCase(getFleetDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createFleetDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createFleetDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers.unshift(action.payload.data);
      })

      .addCase(createFleetDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFleetDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFleetDriver.fulfilled, (state, action) => {
        state.loading = false;

        state.drivers = state.drivers.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item,
        );

        state.driver = action.payload.data;
      })

      .addCase(updateFleetDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFleetDriverById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getFleetDriverById.fulfilled, (state, action) => {
        state.loading = false;
        state.driver = action.payload.data;
      })

      .addCase(getFleetDriverById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteFleetDriver.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteFleetDriver.fulfilled, (state, action) => {
        state.loading = false;

        state.drivers = state.drivers.filter(
          (item) => item._id !== action.payload.data._id,
        );
      })

      .addCase(deleteFleetDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default driverSlice.reducer;

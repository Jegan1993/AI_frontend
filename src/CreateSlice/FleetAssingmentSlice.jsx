import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../Api/Api";

export const getFleetAssignment = createAsyncThunk(
  "fleetAssignment/get",
  async (params, thunkAPI) => {
    try {
      const res = await API.getFleetAssignment(params);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
export const createFleetAssignment = createAsyncThunk(
  "fleetAssignment/create",
  async (data, thunkAPI) => {
    try {
      const res = await API.createFleetAssignment(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const getFleetAssignmentById = createAsyncThunk(
  "fleetAssignment/getById",
  async (id, thunkAPI) => {
    try {
      const res = await API.getFleetAssignmentById(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const updateFleetAssignment = createAsyncThunk(
  "fleetAssignment/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.updateFleetAssignment(id, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const deleteFleetAssignment = createAsyncThunk(
  "fleetAssignment/delete",
  async (id, thunkAPI) => {
    try {
      const res = await API.deleteFleetAssignment(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
const initialState = {
  assignments: [],
  assignment: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};
const FleetAssignmentSlice = createSlice({
  name: "fleetAssignment",

  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(getFleetAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getFleetAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload.data.assignments;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
      })

      .addCase(getFleetAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createFleetAssignment.fulfilled, (state, action) => {
        state.assignments.unshift(action.payload.data);
      })

      .addCase(getFleetAssignmentById.fulfilled, (state, action) => {
        state.assignment = action.payload.data;
      })

      .addCase(updateFleetAssignment.fulfilled, (state, action) => {
        state.assignments = state.assignments.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item,
        );

        state.assignment = action.payload.data;
      })

      .addCase(deleteFleetAssignment.fulfilled, (state, action) => {
        state.assignments = state.assignments.filter(
          (item) => item._id !== action.payload.data._id,
        );
      });
  },
});

export default FleetAssignmentSlice.reducer;

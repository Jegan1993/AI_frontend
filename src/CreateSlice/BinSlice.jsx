import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../Api/Api.jsx";

export const getBin = createAsyncThunk("bin/get", async (data, thunkAPI) => {
  try {
    const res = await API.GetAllBin(data);
    console.log("res get pin --------", res);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const createBin = createAsyncThunk(
  "bin/create",
  async (data, thunkAPI) => {
    try {
      const res = await API.createBin(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const getBinById = createAsyncThunk(
  "bin/getById",
  async (id, thunkAPI) => {
    try {
      const res = await API.getByIdBin(id);

      return res.data;
    } catch (error) {
      console.log(error.response);

      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const updateBin = createAsyncThunk(
  "bin/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.updateBin(id, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const deleteBin = createAsyncThunk(
  "bin/delete",
  async (id, thunkAPI) => {
    try {
      const res = await API.deleteBin(id);

      return res.data;
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
const initialState = {
  bins: [],
  bin: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};

const binSlice = createSlice({
  name: "bin",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(getBin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getBin.fulfilled, (state, action) => {
        state.loading = false;
        state.bins = action.payload.data.bins;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
      })

      .addCase(getBin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createBin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createBin.fulfilled, (state, action) => {
        state.loading = false;
        state.bins.unshift(action.payload.data);
      })

      .addCase(createBin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateBin.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateBin.fulfilled, (state, action) => {
        state.loading = false;

        state.bins = state.bins.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item,
        );

        state.bin = action.payload.data;
      })

      .addCase(updateBin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getBinById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getBinById.fulfilled, (state, action) => {
        state.loading = false;
        state.bin = action.payload.data;
      })

      .addCase(getBinById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteBin.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteBin.fulfilled, (state, action) => {
        state.loading = false;

        state.bins = state.bins.filter(
          (item) => item._id !== action.payload.data._id,
        );
      })

      .addCase(deleteBin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default binSlice.reducer;

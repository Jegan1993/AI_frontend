import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../Api/Api.jsx";

export const getQuotation = createAsyncThunk(
  "quotation/get",
  async (params, thunkAPI) => {
    try {
      const res = await AuthApi.getQuotation(params);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const createQuotation = createAsyncThunk(
  "quotation/create",
  async (data, thunkAPI) => {
    try {
      const res = await AuthApi.createQuotation(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const getQuotationById = createAsyncThunk(
  "quotation/getById",
  async (id, thunkAPI) => {
    try {
      const res = await AuthApi.getQuotationById(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const updateQuotation = createAsyncThunk(
  "quotation/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await AuthApi.updateQuotation(id, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const deleteQuotation = createAsyncThunk(
  "quotation/delete",
  async (id, thunkAPI) => {
    try {
      const res = await AuthApi.deleteQuotation(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const updateQuotationStatus = createAsyncThunk(
  "quotation/updateQuotationStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await AuthApi.updateQuotationStatus(id, {
        status,
      });

      return response.data.data;
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);

      return rejectWithValue(
        error.response?.data?.message || "Failed to update quotation status",
      );
    }
  },
);

const initialState = {
  quotations: [],
  quotation: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};

const quotationSlice = createSlice({
  name: "quotation",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Get All
      .addCase(getQuotation.pending, (state) => {
        state.loading = true;
      })

      .addCase(getQuotation.fulfilled, (state, action) => {
        state.loading = false;
        state.quotations = action.payload.data.quotations;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
      })

      .addCase(getQuotation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createQuotation.pending, (state) => {
        state.loading = true;
      })

      .addCase(createQuotation.fulfilled, (state, action) => {
        state.loading = false;
        state.quotations.unshift(action.payload.data);
      })

      .addCase(createQuotation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By Id
      .addCase(getQuotationById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getQuotationById.fulfilled, (state, action) => {
        state.loading = false;
        state.quotation = action.payload.data;
      })

      .addCase(getQuotationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateQuotation.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateQuotation.fulfilled, (state, action) => {
        state.loading = false;

        state.quotations = state.quotations.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item,
        );
      })

      .addCase(updateQuotation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteQuotation.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteQuotation.fulfilled, (state, action) => {
        state.loading = false;

        state.quotations = state.quotations.filter(
          (item) => item._id !== action.payload.data._id,
        );
      })

      .addCase(deleteQuotation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateQuotationStatus.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateQuotationStatus.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.quotations.findIndex(
          (item) => item._id === action.payload._id,
        );

        if (index !== -1) {
          state.quotations[index] = action.payload;
        }
      })

      .addCase(updateQuotationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default quotationSlice.reducer;

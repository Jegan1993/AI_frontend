import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../Api/Api.jsx";

export const getCustomer = createAsyncThunk(
  "customer/get",
  async (data, thunkAPI) => {
    try {
      const res = await AuthApi.getCustomer(data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);



export const createCustomer = createAsyncThunk(
  "customer/create",
  async (leadId, thunkAPI) => {
    try {
      const res = await AuthApi.createCustomer(leadId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);


export const getCustomerById = createAsyncThunk(
  "customer/getById",
  async (id, thunkAPI) => {
    try {
      const res = await AuthApi.getCustomerById(id);

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
export const updateCustomer = createAsyncThunk(
  "customer/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await AuthApi.updateCustomer(id, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const deleteCustomer = createAsyncThunk(
  "customer/delete",
  async (data, thunkAPI) => {
    try {
      const res = await AuthApi.deleteCustomer(data);

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
  customers: [],
  customer: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(getCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.data.customers;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
      })

      .addCase(getCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.unshift(action.payload.data);
      })

      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;

        state.customers = state.customers.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item,
        );
      })

      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCustomerById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload.data;
      })

      .addCase(getCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;

        state.customers = state.customers.filter(
          (item) => item._id !== action.payload.data._id,
        );
      })

      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;

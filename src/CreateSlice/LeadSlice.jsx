import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../Api/Api.jsx";

export const getLeads = createAsyncThunk("lead/get", async (data, thunkAPI) => {
  try {
    const res = await AuthApi.getLead(data);

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const createLeads = createAsyncThunk(
  "lead/create",
  async (data, thunkAPI) => {
    try {
      const res = await AuthApi.createLead(data);

      return res.data;
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const getLeadById = createAsyncThunk(
  "lead/getById",
  async (id, thunkAPI) => {
    try {
      const res = await AuthApi.getLeadById(id);

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
export const updateLeads = createAsyncThunk(
  "lead/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await AuthApi.updateLead(id, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const deleteLeads = createAsyncThunk(
  "lead/delete",
  async (data, thunkAPI) => {
    try {
      const res = await AuthApi.deleteLead(data);

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
  leads: [],
  lead: null,
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
};
const leadSlice = createSlice({
  name: "lead",
  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(getLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getLeads.fulfilled, (state, action) => {
        state.loading = false;

        state.leads = action.payload.data.leads;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
      })

      .addCase(getLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads.unshift(action.payload.data);
      })

      .addCase(createLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateLeads.fulfilled, (state, action) => {
        state.loading = false;

        state.leads = state.leads.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item,
        );
      })

      .addCase(updateLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLeadById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getLeadById.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload.data;
      })

      .addCase(getLeadById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteLeads.fulfilled, (state, action) => {
        state.loading = false;

        state.leads = state.leads.filter(
          (lead) => lead._id !== action.payload.data._id,
        );
      })

      .addCase(deleteLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leadSlice.reducer;

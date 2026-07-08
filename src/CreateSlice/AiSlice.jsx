import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AiApi } from "../Api/AiApi";

export const generateLeadScore = createAsyncThunk(
  "ai/generateLeadScore",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AiApi.leadScore(id);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate lead score",
      );
    }
  },
);

export const generateEmail = createAsyncThunk(
  "ai/generateEmail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AiApi.generateEmail(id);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate email",
      );
    }
  },
);

export const generateProposal = createAsyncThunk(
  "ai/generateProposal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AiApi.generateProposal(id);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate proposal",
      );
    }
  },
);

const initialState = {
  loading: false,

  leadScore: null,

  email: null,

  proposal: null,

  error: null,
};

const aiSlice = createSlice({
  name: "ai",

  initialState,

  reducers: {
    clearLeadScore: (state) => {
      state.leadScore = null;
    },

    clearEmail: (state) => {
      state.email = null;
    },

    clearProposal: (state) => {
      state.proposal = null;
    },

    clearAllAI: (state) => {
      state.leadScore = null;
      state.email = null;
      state.proposal = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(generateLeadScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(generateLeadScore.fulfilled, (state, action) => {
        state.loading = false;
        state.leadScore = action.payload;
      })

      .addCase(generateLeadScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(generateEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(generateEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload;
      })

      .addCase(generateEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(generateProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(generateProposal.fulfilled, (state, action) => {
        state.loading = false;
        state.proposal = action.payload;
      })

      .addCase(generateProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLeadScore, clearEmail, clearProposal, clearAllAI } =
  aiSlice.actions;

export default aiSlice.reducer;

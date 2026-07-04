import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../Api/Api.jsx";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await AuthApi.register(data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Registration failed" },
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await AuthApi.login(data);
      console.log("res---", res);
      localStorage.setItem("token", res.data.token);

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
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");

      state.user = null;
      state.token = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api/auth.api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getCurrentUser();
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

export const googleAuthUser = createAsyncThunk(
  "/auth/google",
  async (idToken, { rejectWithValue }) => {
    try {
      const response = await authAPI.googleAuth(idToken);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Google auth failed",
      );
    }
  },
);

export const updatePassword = createAsyncThunk(
  "auth/password-update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authAPI.updatePassword(data);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password update failed",
      );
    }
  },
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  newPassword: null,
  isNewPasswordSubmitted: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      // Token is cleared by backend (HTTP-only cookie)
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch user
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });

    // Logout
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Clear state even if logout fails (e.g., network error)
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });

    // Google Auth
    builder
      .addCase(googleAuthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(googleAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update password
    builder
      .addCase(updatePassword.pending, (state) => {
        state.isNewPasswordSubmitted = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isNewPasswordSubmitted = false;
        state.newPassword = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isNewPasswordSubmitted = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

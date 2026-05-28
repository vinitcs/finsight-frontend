import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { analyticsAPI } from "../../api/analytics.api";
import { showToast } from "./toastSlice";

export const fetchSummary = createAsyncThunk(
  "analytics/summary",
  async (params, { dispatch }) => {
    try {
      const response = await analyticsAPI.getSummary(params);
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch analytics";
      dispatch(showToast({ message: errorMessage, type: "error" }));
      throw error;
    }
  },
);

export const fetchYearlyBalance = createAsyncThunk(
  "analytics/yearly-balance",
  async (params, { dispatch }) => {
    try {
      const response = await analyticsAPI.getYearlyBalance(params);
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch analytics";
      dispatch(showToast({ message: errorMessage, type: "error" }));
      throw error;
    }
  },
);

export const fetchMonthlyBalance = createAsyncThunk(
  "analytics/monthly-balance",
  async (params, { dispatch }) => {
    try {
      const response = await analyticsAPI.getMonthlyBalance(params);
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch analytics";
      dispatch(showToast({ message: errorMessage, type: "error" }));
      throw error;
    }
  },
);

export const fetchBalanceTrend = createAsyncThunk(
  "analytics/balance-trend",
  async (params, { dispatch }) => {
    try {
      const response = await analyticsAPI.getBalanceTrend(params);
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch balance trend";
      dispatch(showToast({ message: errorMessage, type: "error" }));
      throw error;
    }
  },
);

// export const fetchAnalyticsInsights = createAsyncThunk(
//   "analytics/insights",
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await analyticsAPI.getInsights(params);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch analytics",
//       );
//     }
//   },
// );

const initialState = {
  // summary
  summary: null,
  summaryLoading: false,

  // monthly balance
  monthlyBalance: null,
  monthlyLoading: false,

  // yearly balance
  yearlyBalance: null,
  yearlyLoading: false,

  // balance trend
  balanceTrend: null,
  balanceTrendLoading: false,

  insights: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Summary
    builder
      .addCase(fetchSummary.pending, (state) => {
        state.summaryLoading = true;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summaryLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchSummary.rejected, (state) => {
        state.summaryLoading = false;
      });

    // Yearly Balance
    builder
      .addCase(fetchYearlyBalance.pending, (state) => {
        state.yearlyLoading = true;
      })
      .addCase(fetchYearlyBalance.fulfilled, (state, action) => {
        state.yearlyLoading = false;
        state.yearlyBalance = action.payload;
      })
      .addCase(fetchYearlyBalance.rejected, (state) => {
        state.yearlyLoading = false;
      });

    // Monthly Balance
    builder
      .addCase(fetchMonthlyBalance.pending, (state) => {
        state.monthlyLoading = true;
      })
      .addCase(fetchMonthlyBalance.fulfilled, (state, action) => {
        state.monthlyLoading = false;
        state.monthlyBalance = action.payload;
      })
      .addCase(fetchMonthlyBalance.rejected, (state) => {
        state.monthlyLoading = false;
      });

    // Balance Trend
    builder
      .addCase(fetchBalanceTrend.pending, (state) => {
        state.balanceTrendLoading = true;
      })
      .addCase(fetchBalanceTrend.fulfilled, (state, action) => {
        state.balanceTrendLoading = false;
        state.balanceTrend = action.payload;
      })
      .addCase(fetchBalanceTrend.rejected, (state) => {
        state.balanceTrendLoading = false;
      });
  },
});

export default analyticsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transactionAPI } from "../../api/transaction.api";
import { PAGINATION_DEFAULTS } from "../../utils/constants";
import { showToast } from "./toastSlice";

export const fetchTransactions = createAsyncThunk(
  "transaction/fetch",
  async (params, { dispatch }) => {
    try {
      const response = await transactionAPI.getTransactions(params);
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch transactions";

      dispatch(showToast({ message: errorMessage, type: "error" }));
      throw error;
    }
  },
);

const initialState = {
  transactions: [],
  pagination: {
    page: PAGINATION_DEFAULTS.page,
    limit: PAGINATION_DEFAULTS.limit,
    totalCount: 0,
    totalPages: 0,
  },

  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch transactions
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = Array.isArray(action.payload.transactions)
          ? action.payload.transactions
          : [];
        // Keep current page, limit from state; only update counts from API
        state.pagination = {
          page: state.pagination.page,
          limit: state.pagination.limit,
          totalCount: action.payload.totalCount ?? 0,
          totalPages: action.payload.totalPages ?? 0,
        };
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.transactions = [];
        state.pagination = initialState.pagination;
      });
  },
});

export const { setPagination, clearFilters, clearError } =
  transactionSlice.actions;
export default transactionSlice.reducer;

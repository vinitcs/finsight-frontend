import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { accountAPI } from "../../api/account.api";

export const fetchAccounts = createAsyncThunk(
  "account/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountAPI.getUserAccounts();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch accounts",
      );
    }
  },
);

export const createAccount = createAsyncThunk(
  "account/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await accountAPI.addAccount(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create account",
      );
    }
  },
);

export const updateAccountThunk = createAsyncThunk(
  "account/update",
  async ({ accountId, data }, { rejectWithValue }) => {
    try {
      const response = await accountAPI.updateAccount(accountId, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update account",
      );
    }
  },
);

export const deleteAccountThunk = createAsyncThunk(
  "account/delete",
  async (id, { rejectWithValue }) => {
    try {
      await accountAPI.deleteAccount(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete account",
      );
    }
  },
);

const initialState = {
  accounts: [],
  selectedAccounts: {
    dashboard: null,
    transactions: null,
    upload: null,
    analytics: null,
    settings: null,
  },
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    selectAccount: (state, action) => {
      const { section, account } = action.payload;
      state.selectedAccounts[section] = account;
      if (account) {
        localStorage.setItem(`selectedAccountId_${section}`, account.id);
      } else {
        // Store "null" string to distinguish from "never set"
        localStorage.setItem(`selectedAccountId_${section}`, "null");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        // Restore from localStorage immediately to avoid flashing "All Accounts"
        Object.keys(state.selectedAccounts).forEach((section) => {
          const savedId = localStorage.getItem(
            `selectedAccountId_${section}`,
          );
          // If "null" was explicitly saved, keep it as null (All Accounts)
          if (savedId === "null") {
            state.selectedAccounts[section] = null;
          } else if (savedId) {
            // Temporarily store ID, will match with real account in fulfilled
            state.selectedAccounts[section] = { _tempId: savedId };
          }
        });
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload.filter((acc) => !acc.isDeleted);

        // Match temp account objects with real account objects
        Object.keys(state.selectedAccounts).forEach((section) => {
          const selected = state.selectedAccounts[section];
          if (selected && selected._tempId) {
            // Match the temp ID with the real account
            const account = state.accounts.find(
              (acc) => acc.id === selected._tempId,
            );
            state.selectedAccounts[section] = account || state.accounts[0];
          } else if (
            selected === null &&
            state.accounts.length > 0 &&
            !localStorage.getItem(`selectedAccountId_${section}`)
          ) {
            // Only default to first account if nothing was ever saved
            state.selectedAccounts[section] = state.accounts[0];
          }
        });
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts.push(action.payload);
        // Set new account as selected for all sections that don't have selection
        Object.keys(state.selectedAccounts).forEach((section) => {
          if (state.selectedAccounts[section] === null) {
            state.selectedAccounts[section] = action.payload;
          }
        });
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update
    builder
      .addCase(updateAccountThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAccountThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.accounts.findIndex(
          (acc) => acc.id === action.payload.id,
        );
        if (index !== -1) {
          state.accounts[index] = action.payload;
        }
      })
      .addCase(updateAccountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete
    builder.addCase(deleteAccountThunk.fulfilled, (state, action) => {
      state.accounts = state.accounts.filter(
        (acc) => acc.id !== action.payload,
      );
      // Update all sections if deleted account was selected
      Object.keys(state.selectedAccounts).forEach((section) => {
        if (state.selectedAccounts[section]?.id === action.payload) {
          state.selectedAccounts[section] = state.accounts[0] || null;
        }
      });
    });
  },
});

export const { selectAccount, clearError } = accountSlice.actions;
export default accountSlice.reducer;

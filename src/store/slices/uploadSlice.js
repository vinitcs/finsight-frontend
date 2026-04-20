import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadAPI } from "../../api/upload.api";
import { PAGINATION_DEFAULTS } from "../../utils/constants";

export const uploadPDF = createAsyncThunk(
  "upload/pdf",
  async (data, { rejectWithValue }) => {
    try {
      const response = await uploadAPI.uploadPDF(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Upload failed");
    }
  },
);

export const fetchUploads = createAsyncThunk(
  "upload/fetch",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await uploadAPI.getUploads(params);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch uploads",
      );
    }
  },
);

export const deleteUploadThunk = createAsyncThunk(
  "upload/delete",
  async (id, { rejectWithValue }) => {
    try {
      await uploadAPI.deleteUpload(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete upload",
      );
    }
  },
);

const initialState = {
  currentUpload: null,
  uploads: [],
  pagination: {
    page: PAGINATION_DEFAULTS.page,
    limit: PAGINATION_DEFAULTS.limit,
    totalCount: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setCurrentUpload: (state, action) => {
      state.currentUpload = action.payload;
    },
    clearCurrentUpload: (state) => {
      state.currentUpload = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Upload PDF
    builder
      .addCase(uploadPDF.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadPDF.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUpload = action.payload;
      })
      .addCase(uploadPDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch uploads
    builder
      .addCase(fetchUploads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUploads.fulfilled, (state, action) => {
        state.loading = false;
        state.uploads = Array.isArray(action.payload.uploads)
          ? action.payload.uploads
          : [];
        // Keep current page, limit from state; only update counts from API
        state.pagination = {
          page: state.pagination.page,
          limit: state.pagination.limit,
          totalCount: action.payload.totalCount ?? 0,
          totalPages: action.payload.totalPages ?? 0,
        };
      })
      .addCase(fetchUploads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.uploads = [];
        state.pagination = initialState.pagination;
      });

    // Delete upload
    builder.addCase(deleteUploadThunk.fulfilled, (state, action) => {
      state.uploads = state.uploads.filter((u) => u.id !== action.payload);
    });
  },
});

export const {
  setPagination,
  setCurrentUpload,
  clearCurrentUpload,
  clearError,
} = uploadSlice.actions;
export default uploadSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/apiClient";

export const fetchScrollableAlerts = createAsyncThunk(
  "scrollableAlerts/fetchScrollableAlerts",
  async (
    {
      limit = 50,
      paginationToken = null,
      sortColumn = null,
      sortOrder = "asc",
      totalLimit = 1000,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get("/scrollable-alerts", {
        params: { limit, paginationToken, sortColumn, sortOrder, totalLimit },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const scrollableAlertsSlice = createSlice({
  name: "scrollableAlerts",
  initialState: {
    alerts: [],
    loading: false,
    error: null,
    paginationToken: null,
    sortColumn: null,
    sortOrder: "asc",
  },
  reducers: {
    resetScrollableAlerts(state) {
      state.alerts = [];
      state.paginationToken = null;
      state.sortColumn = null;
      state.sortOrder = "asc";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScrollableAlerts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchScrollableAlerts.fulfilled, (state, action) => {
        const { items, nextPaginationToken } = action.payload;
        state.alerts = [...state.alerts, ...items];
        state.paginationToken = nextPaginationToken;
        state.loading = false;
      })
      .addCase(fetchScrollableAlerts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { resetScrollableAlerts } = scrollableAlertsSlice.actions;
export default scrollableAlertsSlice.reducer;

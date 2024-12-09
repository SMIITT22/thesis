import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/apiClient";

export const fetchAlerts = createAsyncThunk(
  "alerts/fetchAlerts",
  async ({ totalLimit }, { getState, dispatch, rejectWithValue }) => {
    try {
      const { alerts } = getState().alerts;

      if (alerts.length >= totalLimit) {
        return alerts.slice(0, totalLimit);
      }
      dispatch(setLoading(true));
      let totalFetched = alerts.length;
      let nextPaginationToken = null;

      while (totalFetched < totalLimit) {
        const limit = Math.min(200, totalLimit - totalFetched);

        const response = await axios.get("/alerts", {
          params: {
            totalLimit,
            limit,
            nextPaginationToken,
          },
        });

        const { items, nextPaginationToken: token } = response.data;

        if (!items.length) break;

        dispatch(addAlerts(items));
        totalFetched += items.length;
        nextPaginationToken = token;

        if (!nextPaginationToken) break;
      }

      dispatch(setPaginationToken(nextPaginationToken));
      dispatch(setLoading(false));
      return getState().alerts.alerts.slice(0, totalLimit);
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.response?.data || "An error occurred"));
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    alerts: [],
    loading: false,
    error: null,
    paginationToken: null,
  },
  reducers: {
    addAlerts(state, action) {
      state.alerts = [...state.alerts, ...action.payload];
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setPaginationToken(state, action) {
      state.paginationToken = action.payload;
    },
    resetAlerts(state) {
      state.alerts = [];
      state.paginationToken = null;
    },
  },
});

export const {
  addAlerts,
  setLoading,
  setError,
  setPaginationToken,
  resetAlerts,
} = alertsSlice.actions;

export default alertsSlice.reducer;

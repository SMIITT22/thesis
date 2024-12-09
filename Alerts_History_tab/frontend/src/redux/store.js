import { configureStore } from "@reduxjs/toolkit";
import alertsReducer from "./slices/alertsSlice";
import scrollableAlertsReducer from "./slices/scrollableAlertsSlice";

const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    scrollableAlerts: scrollableAlertsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;

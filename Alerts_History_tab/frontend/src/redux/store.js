import { configureStore } from "@reduxjs/toolkit";
import alertsReducer from "./slices/alertsSlice";

const store = configureStore({
  reducer: {
    alerts: alertsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;

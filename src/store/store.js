import { configureStore } from "@reduxjs/toolkit";
import gridReducer from "./grid-slice";
const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the warning (not recommended)
    }),
});

export default store;

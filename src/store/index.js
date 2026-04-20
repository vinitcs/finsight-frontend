import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import accountReducer from "./slices/accountSlice";
import transactionReducer from "./slices/transactionSlice";
import uploadReducer from "./slices/uploadSlice";
import analyticsReducer from "./slices/analyticsSlice";
import toastReducer from "./slices/toastSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    transaction: transactionReducer,
    upload: uploadReducer,
    analytics: analyticsReducer,
    toast: toastReducer,
  },
});

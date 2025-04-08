import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slices/bookingSlice";

// in next js we should not make out store as a global , coz , next js run on server , server it is single machine shared where  difrrent user can access

// so if we expose the global store , then it will create on server  , now that store will be shared with all ,

// to avoid that we should wrap the configure store , in a fn "makeStore"  which will be exported , and on calling of makeStore , our redux store will run for only that instance

export const makeStore = () => {
  return configureStore({
    reducer: {
      booking: bookingReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

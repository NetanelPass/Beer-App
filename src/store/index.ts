import { configureStore } from "@reduxjs/toolkit";
import beerReducer from "./beerSlice";
import userReducer from "./userSlice";
import filterReducer from "./filterSlice";
import modalReducer from "./modalSlice";

const store = configureStore({
  reducer: {
    beers: beerReducer,
    user: userReducer,
    filter: filterReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

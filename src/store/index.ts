import { configureStore } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import appSlice from "./app-slice";

const store = configureStore({
    reducer: {
        app: appSlice,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, undefined, AnyAction>;
export default store;

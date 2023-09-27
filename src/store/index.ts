import { configureStore } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { appSliceReducers } from "./app-slice";

const store = configureStore({
    reducer: {
        app: appSliceReducers
    }
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, undefined, AnyAction>;

export { store };
export type { AppDispatch, AppThunk, RootState };

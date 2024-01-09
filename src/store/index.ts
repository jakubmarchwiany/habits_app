import { configureStore } from "@reduxjs/toolkit";
import { UnknownAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { appSliceReducers } from "./app/app.slice";
import { dearSliceReducers } from "./dear/dear.slice";

const store = configureStore({
	reducer: {
		app: appSliceReducers,
		dear: dearSliceReducers
	}
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, undefined, UnknownAction>;

export { store };
export type { AppDispatch, AppThunk, RootState };

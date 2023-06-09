import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Habit = {
    name: string;
    steps: number;
    activities: [string][] | [string, number][];
};

export type UserState = {
    version: number | null;
    userName: string | null;
    habits: Habit[];
};

const initialState: UserState = {
    version: null,
    userName: null,
    habits: [],
};

export type UserData = {
    version: number;
    userName: string;
    habits: Habit[];
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserData>) {
            const { version, userName, habits } = action.payload;
            state.version = version;
            state.userName = userName;
            state.habits = habits;
        },
    },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;

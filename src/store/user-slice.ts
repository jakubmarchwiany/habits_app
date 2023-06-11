import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { findRightIndexByDate } from "components/utils/find_index";

export type Habit = {
    id: string;
    name: string;
    activities: string[];
};

export type UserState = {
    version: number | null;
    userName: string | null;
    // habitsIndex: number[];
    habits: Habit[];
    secondHabits: Habit[];
};

const initialState: UserState = {
    version: null,
    userName: null,
    habits: [],
    secondHabits: [],
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
        setUserData(state, action: PayloadAction<[UserData, UserData]>) {
            const { version, userName, habits } = action.payload[0];
            state.version = version;
            state.userName = userName;
            state.habits = habits;

            state.secondHabits = action.payload[1].habits;
        },
        createHabit(state, action: PayloadAction<Habit>) {
            state.habits.push(action.payload);
        },
        editHabitName(state, action: PayloadAction<{ id: string; newName: string }>) {
            const { id, newName } = action.payload;
            const habit = state.habits.find((habit) => habit.id === id);
            if (habit) habit.name = newName;
        },
        editHabitsOrder(state, action: PayloadAction<{ habitsID: string[] }>) {
            const { habitsID } = action.payload;

            const sortedHabits = [];
            for (const habitId of habitsID) {
                const habit = state.habits.find((h) => h.id === habitId);
                if (habit) {
                    sortedHabits.push(habit);
                }
            }
            state.habits = sortedHabits;
        },
        deleteHabit(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            state.habits = state.habits.filter((habit) => habit.id !== id);
        },
        addActivity(state, action: PayloadAction<{ id: string; date: string }>) {
            const { id, date } = action.payload;
            const habit = state.habits.find((habit) => habit.id === id);

            if (habit) {
                const index = findRightIndexByDate(date, habit.activities);
                habit.activities.splice(index, 0, date);
            }
        },
        deleteActivity(state, action: PayloadAction<{ id: string; date: string }>) {
            const { id, date } = action.payload;
            const habit = state.habits.find((habit) => habit.id === id);
            if (habit) {
                habit.activities = habit.activities.filter((a) => a !== date);
            }
        },
    },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;

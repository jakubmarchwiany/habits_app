import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { findRightIndexByDate } from "utils/find_index";

export type Activity = {
    _id: string;
    date: string;
};

export type Habit = {
    _id: string;
    name: string;
    activities: Activity[];
};

export type UserState = {
    // habitsIndex: number[];
    habits: Habit[];
    secondHabits: Habit[];
};

const initialState: UserState = {
    habits: [],
    secondHabits: [],
};

export type UserData = {
    habits: Habit[];
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<[UserData, UserData]>) {
            const { habits } = action.payload[0];

            state.habits = habits;
            state.secondHabits = action.payload[1].habits;
        },
        createHabit(state, action: PayloadAction<Habit>) {
            state.habits.push(action.payload);
        },
        editHabitName(state, action: PayloadAction<{ id: string; newName: string }>) {
            const { id, newName } = action.payload;
            const habit = state.habits.find((habit) => habit._id === id);
            if (habit) habit.name = newName;
        },
        editHabitsOrder(state, action: PayloadAction<{ habitsID: string[] }>) {
            const { habitsID } = action.payload;

            const sortedHabits = [];
            for (const habitId of habitsID) {
                const habit = state.habits.find((h) => h._id === habitId);
                if (habit) {
                    sortedHabits.push(habit);
                }
            }
            state.habits = sortedHabits;
        },
        deleteHabit(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            state.habits = state.habits.filter((habit) => habit._id !== id);
        },
        addActivity(state, action: PayloadAction<{ id: string; date: string }>) {
            const { id, date } = action.payload;
            const habit = state.habits.find((habit) => habit._id === id);

            if (habit) {
                const index = findRightIndexByDate(date, habit.activities);
                habit.activities.splice(index, 0, date);
            }
        },
        deleteActivity(state, action: PayloadAction<{ id: string; date: string }>) {
            const { id, date } = action.payload;
            const habit = state.habits.find((habit) => habit._id === id);
            if (habit) {
                habit.activities = habit.activities.filter((a) => a !== date);
            }
        },
    },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;

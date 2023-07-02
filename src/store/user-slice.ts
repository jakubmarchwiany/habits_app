import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Habit } from "store/models/habit";

import { findRightIndexByDate } from "utils/find_index";

type UserState = {
    userHabits: Habit[];
    secondHabits: Habit[];
};

const initialState: UserState = {
    userHabits: [],
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
            state.userHabits = action.payload[0].habits;
            state.secondHabits = action.payload[1].habits;
        },
        createHabit(state, action: PayloadAction<Habit>) {
            state.userHabits.push(action.payload);
        },
        editHabitName(state, action: PayloadAction<{ id: string; newName: string }>) {
            const { id, newName } = action.payload;
            const habit = state.userHabits.find((habit) => habit._id === id);
            if (habit) habit.name = newName;
        },
        editHabitsOrder(state, action: PayloadAction<{ habitsID: string[] }>) {
            const { habitsID } = action.payload;

            const sortedHabits = [];
            for (const habitId of habitsID) {
                const habit = state.userHabits.find((h) => h._id === habitId);
                if (habit) {
                    sortedHabits.push(habit);
                }
            }
            state.userHabits = sortedHabits;
        },
        deleteHabit(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            state.userHabits = state.userHabits.filter((habit) => habit._id !== id);
        },
        addActivity(
            state,
            action: PayloadAction<{ habitID: string; activityID: string; date: string }>
        ) {
            const { activityID, date, habitID } = action.payload;
            const habit = state.userHabits.find((habit) => habit._id === habitID);

            if (habit) {
                const index = findRightIndexByDate(date, habit.activities);
                habit.activities.splice(index, 0, { date, _id: activityID });
            }
        },
        deleteActivity(state, action: PayloadAction<{ habitID: string; activityID: string }>) {
            const { habitID, activityID } = action.payload;
            const habit = state.userHabits.find((habit) => habit._id === habitID);
            if (habit) {
                habit.activities = habit.activities.filter((a) => a._id !== activityID);
            }
        },
    },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;

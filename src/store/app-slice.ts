import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Habit } from "store/models/habit";
import { HabitGroup } from "store/models/habitGroup";

import { findRightIndexByDate } from "utils/find_index";

type UserState = {
    myHabits: Habit[];
    myHabitsGroups: HabitGroup[];
    dearHabits: Habit[];
    isUserHabits: boolean;
};

const initialState: UserState = {
    myHabits: [],
    myHabitsGroups: [],
    dearHabits: [],
    isUserHabits: true,
};

export type UserData = {
    habits: Habit[];
    HabitsGroups: HabitGroup[];
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserData>) {
            state.myHabits = action.payload.habits;
            state.myHabitsGroups = action.payload.HabitsGroups;
        },
        setDearData(state, action: PayloadAction<UserData>) {
            state.dearHabits = action.payload.habits;
        },
        toggleHabitsView(state) {
            state.isUserHabits = !state.isUserHabits;
        },
        createHabit(state, action: PayloadAction<Habit>) {
            state.myHabits.push(action.payload);
        },
        editHabitName(state, action: PayloadAction<{ id: string; newName: string }>) {
            const { id, newName } = action.payload;
            const habit = state.myHabits.find((habit) => habit._id === id);
            if (habit) habit.name = newName;
        },
        editHabitsOrder(state, action: PayloadAction<{ habitsID: string[] }>) {
            const { habitsID } = action.payload;

            const sortedHabits = [];
            for (const habitId of habitsID) {
                const habit = state.myHabits.find((h) => h._id === habitId);
                if (habit) {
                    sortedHabits.push(habit);
                }
            }
            state.myHabits = sortedHabits;
        },
        deleteHabit(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            state.myHabits = state.myHabits.filter((habit) => habit._id !== id);
        },
        addActivity(
            state,
            action: PayloadAction<{ habitID: string; activityID: string; date: string }>
        ) {
            const { activityID, date, habitID } = action.payload;
            const habit = state.myHabits.find((habit) => habit._id === habitID);

            if (habit) {
                const index = findRightIndexByDate(date, habit.activities);
                habit.activities.splice(index, 0, { date, _id: activityID });
            }
        },
        deleteActivity(state, action: PayloadAction<{ habitID: string; activityID: string }>) {
            const { habitID, activityID } = action.payload;
            const habit = state.myHabits.find((habit) => habit._id === habitID);
            if (habit) {
                habit.activities = habit.activities.filter((a) => a._id !== activityID);
            }
        },
    },
});
export const appActions = appSlice.actions;
export default appSlice.reducer;

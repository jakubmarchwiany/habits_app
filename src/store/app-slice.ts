/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Habit } from "store/models/habit";
import { HabitGroup } from "store/models/habitGroup";

import { findRightIndexByDate } from "utils/find_index";

type UserState = {
    myHabits: Habit[];
    myHabitGroups: HabitGroup[];
    isDearHabitsDownloaded: boolean;
    dearHabits: Habit[];
    dearHabitGroups: HabitGroup[];
    isMyHabits: boolean;
    showAllHabits: boolean;
};

const initialState: UserState = {
    myHabits: [],
    myHabitGroups: [],
    isDearHabitsDownloaded: false,
    dearHabits: [],
    dearHabitGroups: [],
    isMyHabits: true,
    showAllHabits: false,
};

export type UserData = {
    habits: Habit[];
    habitGroups: HabitGroup[];
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserData>) {
            state.myHabits = action.payload.habits;
            state.myHabitGroups = action.payload.habitGroups;
        },
        setDearData(state, action: PayloadAction<UserData>) {
            state.dearHabits = action.payload.habits;
            state.dearHabitGroups = action.payload.habitGroups;
            state.isDearHabitsDownloaded = true;
        },
        toggleHabitsView(state) {
            state.isMyHabits = !state.isMyHabits;
        },
        setShowAllHabits(state, action: PayloadAction<boolean>) {
            state.showAllHabits = action.payload;
        },
        createHabit(state, action: PayloadAction<Habit>) {
            state.myHabits.push(action.payload);
        },
        editHabit(
            state,
            action: PayloadAction<{
                _id: string;
                name: string;
                description: string;
                periodInDays: number;
            }>
        ) {
            const { _id, name, description, periodInDays } = action.payload;
            const habit = state.myHabits.find((habit) => habit._id === _id);
            if (habit) {
                habit.name = name;
                habit.description = description;
                habit.periodInDays = periodInDays;
            }
        },
        editHabitsOrder(state, action: PayloadAction<HabitGroup[]>) {
            state.myHabitGroups = action.payload;
        },
        deleteHabit(state, action: PayloadAction<{ _id: string }>) {
            const { _id } = action.payload;
            state.myHabits = state.myHabits.filter((habit) => habit._id !== _id);
            state.myHabitGroups.forEach((group) => {
                group.habits = group.habits.filter((habit) => habit !== _id);
            });
        },
        addActivity(
            state,
            action: PayloadAction<{ habitID: string; activityID: string; date: string }>
        ) {
            const { activityID, date, habitID } = action.payload;
            const habit = state.myHabits.find((habit) => habit._id === habitID);

            if (habit) {
                const index = findRightIndexByDate(date, habit.activities);
                console.log(index)

                habit.activities[index] = { date, _id: activityID, done: true };
            }
        },
        deleteActivity(state, action: PayloadAction<{ habitID: string; activityID: string }>) {
            const { habitID, activityID } = action.payload;
            const habit = state.myHabits.find((habit) => habit._id === habitID);
            if (habit) {
                habit.activities.find((a) => a._id === activityID)!.done = false;
            }
        },
    },
});
export const appActions = appSlice.actions;
export default appSlice.reducer;

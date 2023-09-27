import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Habit } from "store/models/habit";
import { HabitGroup } from "store/models/habitGroup";
import { findIndexToDate } from "utils/find_index_to_date";

type UserState = {
    dearHabitGroups: HabitGroup[];
    dearHabits: Habit[];
    isDearHabitsDownloaded: boolean;
    isMyHabits: boolean;
    myHabitGroups: HabitGroup[];
    myHabits: Habit[];
    showAllHabits: boolean;
};

const initialState: UserState = {
    dearHabitGroups: [],
    dearHabits: [],
    isDearHabitsDownloaded: false,
    isMyHabits: true,
    myHabitGroups: [],
    myHabits: [],
    showAllHabits: false
};

export type UserData = {
    habitGroups: HabitGroup[];
    habits: Habit[];
};

const appSlice = createSlice({
    initialState,
    name: "app",
    reducers: {
        addActivity(
            state,
            action: PayloadAction<{ activityID: string; date: string; habitID: string }>
        ) {
            const { activityID, date, habitID } = action.payload;
            const habit = state.myHabits.find((habit) => habit._id === habitID);

            if (habit) {
                const index = findIndexToDate(date, habit.activities);

                console.log(index);

                habit.activities[index] = { _id: activityID, date, done: true };
            }
        },
        createHabit(state, action: PayloadAction<Habit>) {
            state.myHabits.push(action.payload);
        },
        deleteActivity(state, action: PayloadAction<{ activityID: string; habitID: string }>) {
            const { activityID, habitID } = action.payload;
            const habit = state.myHabits.find((habit) => habit._id === habitID);

            if (habit !== undefined) {
                const activity = habit.activities.find((a) => a._id === activityID);

                if (activity !== undefined) {
                    activity.done = false;
                }
            }
        },
        deleteHabit(state, action: PayloadAction<{ _id: string }>) {
            const { _id } = action.payload;

            state.myHabits = state.myHabits.filter((habit) => habit._id !== _id);

            state.myHabitGroups.forEach((group) => {
                group.habits = group.habits.filter((habit) => habit !== _id);
            });
        },
        editHabit(
            state,
            action: PayloadAction<{
                _id: string;
                description: string;
                name: string;
                periodInDays: number;
            }>
        ) {
            const { _id, description, name, periodInDays } = action.payload;
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
        setDearData(state, action: PayloadAction<UserData>) {
            state.dearHabits = action.payload.habits;

            state.dearHabitGroups = action.payload.habitGroups;

            state.isDearHabitsDownloaded = true;
        },
        setShowAllHabits(state, action: PayloadAction<boolean>) {
            state.showAllHabits = action.payload;
        },
        setUserData(state, action: PayloadAction<UserData>) {
            state.myHabits = action.payload.habits;

            state.myHabitGroups = action.payload.habitGroups;
        },
        toggleHabitsView(state) {
            state.isMyHabits = !state.isMyHabits;
        }
    }
});
const appActions = appSlice.actions;
const appSliceReducers = appSlice.reducer;

export { appActions, appSliceReducers };

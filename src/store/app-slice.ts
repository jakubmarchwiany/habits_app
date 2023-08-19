import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Habit } from "store/models/habit";
import { HabitGroup } from "store/models/habitGroup";

import { findRightIndexByDate } from "utils/find_index";

type UserState = {
    myHabits: Habit[];
    myHabitGroups: HabitGroup[];
    dearHabits: Habit[];
    dearHabitGroups: HabitGroup[];
    isMyHabits: boolean;
};

const initialState: UserState = {
    myHabits: [],
    myHabitGroups: [],
    dearHabits: [],
    dearHabitGroups: [],
    isMyHabits: true,
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
        },
        toggleHabitsView(state) {
            state.isMyHabits = !state.isMyHabits;
        },
        createHabit(state, action: PayloadAction<Habit>) {
            state.myHabits.push(action.payload);
        },
        editHabitName(state, action: PayloadAction<{ id: string; newName: string }>) {
            const { id, newName } = action.payload;
            const habit = state.myHabits.find((habit) => habit._id === id);
            if (habit) habit.name = newName;
        },
        editHabitsOrder(state, action: PayloadAction<HabitGroup[]>) {
            state.myHabitGroups = action.payload;
        },
        deleteHabit(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            state.myHabits = state.myHabits.filter((habit) => habit._id !== id);
            state.myHabitGroups.forEach((group) => {
                group.habits = group.habits.filter((habit) => habit !== id);
            })
        },
        addActivity(
            state,
            action: PayloadAction<{ habitID: string; activityID: string; date: string }>
        ) {
            const { activityID, date, habitID } = action.payload;
            const habit = state.myHabits.find((habit) => habit._id === habitID);

            if (habit) {
                const index = findRightIndexByDate(date, habit.activities!);
                habit.activities!.splice(index, 0, { date, _id: activityID });
            }
        },
        deleteActivity(state, action: PayloadAction<{ habitID: string; activityID: string }>) {
            const { habitID, activityID } = action.payload;
            const habit = state.myHabits.find((habit) => habit._id === habitID);
            if (habit) {
                habit.activities = habit.activities!.filter((a) => a._id !== activityID);
            }
        },
    },
});
export const appActions = appSlice.actions;
export default appSlice.reducer;

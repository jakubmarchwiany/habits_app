import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { computeGroup, extendGroup } from "utils/compute";

import { createActivityReducer, deleteActivityReducer } from "./activity/activity.reducers";
import { getShowAllHabits } from "./app.actions";
import { GroupOfHabitsData } from "./habit/habit.actions";
import { createHabitReducer, deleteHabitReducer, updateHabitReducer } from "./habit/habit.reducers";
import { GroupOfHabits } from "./habit/models/group_of_habits.type";
import { Habit } from "./habit/models/habit.type";

export type AppState = {
	userId: string | undefined;
	showAllHabits: boolean | undefined;
	habits: Habit[] | undefined;
	groupsOfHabits: GroupOfHabits[] | undefined;
};

const initialState: AppState = {
	userId: undefined,
	showAllHabits: getShowAllHabits(),
	habits: undefined,
	groupsOfHabits: undefined
};

type SetDataProps = {
	habits: Habit[];
	groupsOfHabits: GroupOfHabits[];
};

const appSlice = createSlice({
	initialState,
	name: "app",
	reducers: {
		setUserId(state, action: PayloadAction<string>) {
			state.userId = action.payload;
		},
		setData(state, action: PayloadAction<SetDataProps>) {
			state.habits = action.payload.habits;

			state.groupsOfHabits = action.payload.groupsOfHabits;
		},
		toggleShowAllHabits(state) {
			if (state.showAllHabits !== undefined) {
				state.showAllHabits = !state.showAllHabits;

				localStorage.setItem("showAllHabits", state.showAllHabits.toString());
			}
		},
		createHabit: createHabitReducer,
		updateHabit: updateHabitReducer,
		deleteHabit: deleteHabitReducer,
		createActivity: createActivityReducer,
		deleteActivity: deleteActivityReducer,
		updateGroups(state, action: PayloadAction<GroupOfHabitsData[]>) {
			const { habits, groupsOfHabits } = state;

			let groupsExt = action.payload.map((g) => extendGroup(g));

			if (habits !== undefined && groupsOfHabits !== undefined) {
				groupsExt = groupsExt.map((g) => computeGroup(g, habits));

				Object.assign(groupsOfHabits, groupsExt);
			}
		}
	}
});

const appActions = appSlice.actions;
const appSliceReducers = appSlice.reducer;

export { appActions, appSliceReducers };

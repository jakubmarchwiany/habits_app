import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { computeGroup, extendGroup } from "utils/compute";

import { createActivityReducer, deleteActivityReducer } from "./activity/activity.reducers";
import { GroupOfHabitsData, getShowAllHabits } from "./habit/habit.actions";
import { createHabitReducer, deleteHabitReducer, updateHabitReducer } from "./habit/habit.reducers";
import { GroupOfHabits } from "./habit/models/group_of_habits.type";
import { Habit } from "./habit/models/habit.type";

export type AppState = {
	groupsOfHabits: GroupOfHabits[] | undefined;
	habits: Habit[] | undefined;
	showAllHabits: boolean | undefined;
};

const initialState: AppState = {
	showAllHabits: getShowAllHabits(),
	habits: undefined,
	groupsOfHabits: undefined
};

type SetDataProps = {
	groupsOfHabits: GroupOfHabits[];
	habits: Habit[];
};

const appSlice = createSlice({
	initialState,
	name: "app",
	reducers: {
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
			const { groupsOfHabits, habits } = state;

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

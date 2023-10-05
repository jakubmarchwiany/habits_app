import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupOfHabits } from "store/app/habit/models/group_of_habits.type";
import { Habit } from "store/app/habit/models/habit.type";

type DearState = {
	groupsOfHabits: GroupOfHabits[] | undefined;
	habits: Habit[] | undefined;
};

const initialState: DearState = {
	groupsOfHabits: undefined,
	habits: undefined
};

type SetDataProps = {
	groupsOfHabits: GroupOfHabits[];
	habits: Habit[];
};

const dearSlice = createSlice({
	initialState,
	name: "dear",
	reducers: {
		setData(state, action: PayloadAction<SetDataProps>) {
			state.habits = action.payload.habits;

			state.groupsOfHabits = action.payload.groupsOfHabits;
		}
	}
});

const dearActions = dearSlice.actions;
const dearSliceReducers = dearSlice.reducer;

export { dearActions, dearSliceReducers };

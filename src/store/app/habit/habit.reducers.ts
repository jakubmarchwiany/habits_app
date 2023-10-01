import { PayloadAction } from "@reduxjs/toolkit";

import { computeGroup, computeHabit } from "../../../utils/compute";
import { AppState } from "../app.slice";
import { GroupOfHabits } from "./models/group_of_habits.type";
import { Habit } from "./models/habit.type";

export function createHabitReducer(state: AppState, action: PayloadAction<Habit>): void {
	if (state.habits !== undefined) {
		state.habits.push(action.payload);
	}
}

export function updateHabitReducer(
	state: AppState,
	action: PayloadAction<{
		_id: string;
		newDescription: string;
		newName: string;
		newPeriodInDays: number;
	}>
): void {
	const { _id, newDescription, newName, newPeriodInDays } = action.payload;
	const { habits, groupsOfHabits } = state;

	const habit = state.habits?.find((h) => h._id === _id);

	if (habit !== undefined) {
		if (
			newPeriodInDays != habit.periodInDays &&
			groupsOfHabits !== undefined &&
			habits !== undefined
		) {
			Object.assign(habit, {
				...habit,
				description: newDescription,
				name: newName,
				periodInDays: newPeriodInDays
			});

			updateHabitAndGroup(habit, groupsOfHabits, habits);
		} else {
			Object.assign(habit, {
				...habit,
				description: newDescription,
				name: newName,
				periodInDays: newPeriodInDays
			});
		}
	}
}

export function deleteHabitReducer(
	state: AppState,
	action: PayloadAction<{
		_id: string;
	}>
): void {
	const { _id } = action.payload;
	const { habits, groupsOfHabits } = state;

	habits?.filter((h) => h._id !== _id);

	const habitGroup = groupsOfHabits?.find((g) => {
		return g.habits.find((h) => h === _id);
	});

	if (habitGroup !== undefined && habits !== undefined) {
		habitGroup.habits = habitGroup.habits.filter((h) => h !== _id);

		const updateGroup = computeGroup(habitGroup, habits);

		Object.assign(habitGroup, updateGroup);
	}
}

export function updateHabitAndGroup(
	habit: Habit,
	groups: GroupOfHabits[],
	allHabits: Habit[]
): void {
	const habitGroup = groups?.find((g) => {
		return g.habits.find((h) => h === habit._id);
	});

	if (habitGroup !== undefined) {
		const updateHabit = computeHabit(habit);

		const updateGroup = computeGroup(habitGroup, allHabits);

		Object.assign(habit, updateHabit);

		Object.assign(habitGroup, updateGroup);
	}
}

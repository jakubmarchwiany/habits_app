import { PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "../app.slice";
import { updateHabitAndGroup } from "../habit/habit.reducers";
import { Activity, ActivityStatus } from "./models/activity.type";

export function createActivityReducer(
	state: AppState,
	action: PayloadAction<{ activity: Activity; habitId: string; oldActivityId: string }>
): void {
	const { activity, habitId, oldActivityId } = action.payload;
	const { groupsOfHabits, habits } = state;

	const habit = habits?.find((h) => h._id === habitId);

	if (habit !== undefined) {
		const oldActivity = habit.activities.find((a) => a._id === oldActivityId);

		if (oldActivity !== undefined && groupsOfHabits !== undefined && habits !== undefined) {
			Object.assign(oldActivity, activity);

			updateHabitAndGroup(habit, groupsOfHabits, habits);
		}
	}
}

export function deleteActivityReducer(
	state: AppState,
	action: PayloadAction<{ activityId: string; habitId: string }>
): void {
	const { activityId, habitId } = action.payload;
	const { groupsOfHabits, habits } = state;

	const habit = habits?.find((h) => h._id === habitId);

	if (habit !== undefined) {
		const oldActivity = habit.activities.find((a) => a._id === activityId);

		if (oldActivity !== undefined) {
			Object.assign(oldActivity, { ...oldActivity, status: ActivityStatus.NOT_DONE });

			if (groupsOfHabits !== undefined && habits !== undefined) {
				updateHabitAndGroup(habit, groupsOfHabits, habits);
			}
		}
	}
}

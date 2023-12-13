import dayjs from "dayjs";
import { NavigateFunction } from "react-router-dom";
import { dearActions } from "store/dear/dear.slice";
import {
	computeActivitiesDoneOrNotDone,
	computeGroup,
	computeHabit,
	extendGroup,
	extendHabit
} from "utils/compute";
import { getFetch, postFetch } from "utils/fetches";
import { ENV } from "utils/validate_env";

import { AppThunk } from "../../index";
import { Activity } from "../activity/models/activity.type";
import { appActions } from "../app.slice";

const { VITE_N_DAYS_FROM_TODAY } = ENV;

export type HabitData = {
	_id: string;
	activities: Activity[];
	description: string;
	name: string;
	periodInDays: number;
};
export type GroupOfHabitsData = { _id: string; habitsIds: string[]; name: string };

type GetHabitsData = {
	groupsOfHabits: GroupOfHabitsData[];
	habits: HabitData[];
};

export const getHabits =
	(myHabits: boolean, setter: (arg0: boolean) => void): AppThunk =>
	(appDispatch) => {
		const dateFrom = dayjs()
			.hour(12)
			.minute(0)
			.second(0)
			.subtract(VITE_N_DAYS_FROM_TODAY - 1, "days");

		getFetch<{ data: GetHabitsData }>(
			`/habits?myHabits=${myHabits}&dateFrom=${dateFrom.toString()}`,
			{
				customError: true
			}
		)
			.then(({ data }) => {
				const { groupsOfHabits, habits } = data;

				let habitsExt = habits.map((h) => extendHabit(h));

				habitsExt = habitsExt.map((h) =>
					computeActivitiesDoneOrNotDone(h, VITE_N_DAYS_FROM_TODAY)
				);

				habitsExt = habitsExt.map((h) => computeHabit(h));

				let groupsExt = groupsOfHabits.map((g) => extendGroup(g));

				groupsExt = groupsExt.map((g) => computeGroup(g, habitsExt));

				if (myHabits) {
					appDispatch(
						appActions.setData({ groupsOfHabits: groupsExt, habits: habitsExt })
					);
				} else {
					appDispatch(
						dearActions.setData({ groupsOfHabits: groupsExt, habits: habitsExt })
					);
				}
				setter(true);
			})
			.catch(() => {
				setter(false);
			});
	};

export const createHabitAction =
	(
		name: string,
		description: string,
		periodInDays: number,
		navigate: NavigateFunction
	): AppThunk =>
	(appDispatch) => {
		postFetch<{ data: { habitId: string } }>(
			{ description, name, periodInDays },
			"/habits/-/create"
		).then(({ data }) => {
			const { habitId } = data;

			const habit: HabitData = {
				_id: habitId,
				activities: [],
				description,
				name,
				periodInDays
			};

			let habitExt = extendHabit(habit);

			habitExt = computeActivitiesDoneOrNotDone(habitExt, VITE_N_DAYS_FROM_TODAY);

			habitExt = computeHabit(habitExt);

			appDispatch(appActions.createHabit(habitExt));

			navigate("/settings/groupsOfHabitsManager");
		});
	};

export const updateHabitAction =
	(_id: string, newName: string, newDescription: string, newPeriodInDays: number): AppThunk =>
	(appDispatch) => {
		postFetch<never>(
			{ newDescription, newName, newPeriodInDays },
			`/habits/${_id}/update`
		).then(() => {
			appDispatch(
				appActions.updateHabit({
					_id,
					newDescription,
					newName,
					newPeriodInDays
				})
			);
		});
	};

export const deleteHabitAction =
	(_id: string): AppThunk =>
	(appDispatch) => {
		postFetch<never>({ _id }, `/habits/${_id}/delete`).then(() => {
			appDispatch(appActions.deleteHabit({ _id }));
		});
	};

export const updateGroupsOfHabits =
	(
		newGroupsOfHabits: { _id: string; habitsIds: string[]; name: string }[],
		navigate: NavigateFunction
	): AppThunk =>
	(appDispatch) => {
		postFetch<{ data: { groupsOfHabits: GroupOfHabitsData[] } }>(
			{ newGroupsOfHabits },
			"/habits/groupsOfHabits/update"
		).then(({ data }) => {
			const { groupsOfHabits } = data;

			appDispatch(appActions.updateGroups(groupsOfHabits));

			navigate("/habits");
		});
	};

export function getShowAllHabits(): boolean {
	const showAllHabits = localStorage.getItem("showAllHabits");

	if (showAllHabits !== null) {
		return Boolean(JSON.parse(showAllHabits));
	} else {
		return false;
	}
}

import dayjs from "dayjs";
import { AppThunk } from "store";
import { dearActions } from "store/dear/dear.slice";
import { getFetch } from "utils/fetches";
import { ENV } from "utils/validate_env";

import {
	computeActivitiesDoneOrNotDone,
	computeGroup,
	computeHabit,
	extandGroup,
	extandHabit
} from "../../utils/compute";
import { Activity } from "./activity/models/activity.type";
import { appActions } from "./app.slice";

const { VITE_N_DAYS_FROM_TODAY } = ENV;

export type HabitData = {
	_id: string;
	activities: Activity[];
	description: string;
	name: string;
	periodInDays: number;
};
export type GroupOfHabitsData = { _id: string; habits: string[]; name: string };

type GetHabitsData = {
	groupsOfHabits: GroupOfHabitsData[];
	habits: HabitData[];
};

export const getHabits =
	(setIsLogged: (arg0: boolean) => void, isUser: boolean): AppThunk =>
	(appDispatch) => {
		const dateFrom = dayjs()
			.startOf("day")
			.subtract(VITE_N_DAYS_FROM_TODAY - 1, "days");

		getFetch<{ data: GetHabitsData }>(
			`/habits?dateFrom=${dateFrom.toString()}&isUser=${isUser}`,
			{
				customError: true
			}
		)
			.then(({ data }) => {
				const { habits, groupsOfHabits } = data;

				let habitsExt = habits.map((h) => extandHabit(h));

				habitsExt = habitsExt.map((h) =>
					computeActivitiesDoneOrNotDone(h, VITE_N_DAYS_FROM_TODAY)
				);

				habitsExt = habitsExt.map((h) => computeHabit(h));

				let groupsExt = groupsOfHabits.map((g) => extandGroup(g));

				groupsExt = groupsExt.map((g) => computeGroup(g, habitsExt));

				if (isUser) {
					appDispatch(
						appActions.setData({ habits: habitsExt, groupsOfHabits: groupsExt })
					);
				} else {
					appDispatch(
						dearActions.setData({ habits: habitsExt, groupsOfHabits: groupsExt })
					);
				}

				setIsLogged(true);
			})
			.catch((e) => {
				console.log(e);

				setIsLogged(false);
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

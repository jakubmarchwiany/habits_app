import { NavigateFunction } from "react-router-dom";
import { computeActivitiesDoneOrNotDone, computeHabit, extandHabit } from "utils/compute";
import { postFetch } from "utils/fetches";
import { ENV } from "utils/validate_env";

import { AppThunk } from "../../index";
import { GroupOfHabitsData, HabitData } from "../app.actions";
import { appActions } from "../app.slice";

const { VITE_N_DAYS_FROM_TODAY } = ENV;

export const createHabitAction =
	(
		name: string,
		description: string,
		periodInDays: number,
		navigate: NavigateFunction
	): AppThunk =>
	(appDispatch) => {
		postFetch<{ data: HabitData }>(
			{ description, name, periodInDays },
			"/habits/habit/create"
		).then(({ data }) => {
			let habitExt = extandHabit(data);

			habitExt = computeActivitiesDoneOrNotDone(habitExt, VITE_N_DAYS_FROM_TODAY);

			habitExt = computeHabit(habitExt);

			appDispatch(appActions.craeteHabit(habitExt));

			navigate("/settings?openGroupManager=true");
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

export const edithabitsOrderAction =
	(habitGroups: { habits: string[]; name: string }[], navigate: NavigateFunction): AppThunk =>
	(appDispatch) => {
		postFetch<{ data: GroupOfHabitsData[] }>({ habitGroups }, "/habits/updateGroups").then(
			({ data }) => {
				appDispatch(appActions.updateGroups(data));

				navigate("/habits");
			}
		);
	};

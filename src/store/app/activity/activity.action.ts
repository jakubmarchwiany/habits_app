import { AppThunk } from "store";
import { postFetch } from "utils/fetches";

import { appActions } from "../app.slice";
import { Activity, ActivityStatus } from "./models/activity.type";

export const createActivityAction =
	(habitId: string, oldActivityId: string, date: string): AppThunk =>
	(appDispatch) => {
		postFetch<{ data: { activityId: string } }>(
			{ _id: habitId, date },
			"/habits/activity/create"
		).then(({ data }) => {
			const { activityId } = data;

			const activity: Activity = {
				_id: activityId,
				date: date,
				status: ActivityStatus.DONE
			};

			appDispatch(appActions.createActivity({ habitId, oldActivityId, activity }));
		});
	};

export const deleteActivityAction =
	(habitId: string, activityId: string): AppThunk =>
	(appDispatch) => {
		postFetch<never>({ _id: activityId }, "/habits/activity/delete").then(() => {
			appDispatch(appActions.deleteActivity({ habitId, activityId }));
		});
	};

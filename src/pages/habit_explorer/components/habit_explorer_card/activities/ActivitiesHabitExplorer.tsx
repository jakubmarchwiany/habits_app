/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Box } from "@mui/material";
import { myConfetti } from "pages/habits/components/habit_card/activities/confetti";
import { Dispatch, SetStateAction } from "react";
import { Activity, ActivityStatus } from "store/app/activity/models/activity.type";
import { Habit } from "store/app/habit/models/habit.type";
import { computeHabit } from "utils/compute";
import { postFetch } from "utils/fetches";

type Props = {
	explorerHabit: Habit;
	setExplorerHabit: Dispatch<SetStateAction<Habit | undefined>>;
};

export function ActivitiesHabitExplorer({ explorerHabit, setExplorerHabit }: Props): JSX.Element {
	const createActivity = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		oldActivityId: string,
		date: string
	): void => {
		myConfetti(e.clientX, e.clientY);

		const habitId = explorerHabit._id;

		postFetch<{ data: { activityId: string } }>(
			{ _id: habitId, date },
			"/habits/activity/create"
		).then(({ data }) => {
			const activity: Activity = {
				_id: data.activityId,
				date: date,
				status: ActivityStatus.DONE
			};

			let tmpHabit = { ...explorerHabit };

			tmpHabit.activities = tmpHabit.activities.map((a) => {
				if (a._id === oldActivityId) {
					return (a = activity);
				}
				return a;
			});

			tmpHabit = computeHabit(tmpHabit);

			setExplorerHabit(tmpHabit);
		});
	};

	const deleteActivity = (activityId: string): void => {
		postFetch<never>({ _id: activityId }, "/habits/activity/delete").then(() => {
			let tmpHabit = { ...explorerHabit };

			tmpHabit.activities = tmpHabit.activities.map((a) => {
				if (a._id === activityId) {
					return (a = { ...a, status: ActivityStatus.NOT_DONE });
				}
				return a;
			});

			tmpHabit = computeHabit(tmpHabit);

			setExplorerHabit(tmpHabit);
		});
	};

	const generateActivities = (): JSX.Element[] => {
		return explorerHabit.activities.map((activity, index) => {
			const { _id, status, date } = activity;

			if (status === ActivityStatus.DONE) {
				return (
					<div
						key={`activity_${_id}_${index}`}
						className={`activity ${status}`}
						data-tooltip={`${date.slice(5, 7)}-${date.slice(8, 10)}`}
						onClick={(): void => {
							deleteActivity(_id);
						}}
					/>
				);
			} else {
				return (
					<div
						key={`activity_${activity._id}_${index}`}
						className={`activity ${status}`}
						data-tooltip={`${date.slice(5, 7)}-${date.slice(8, 10)}`}
						onClick={(e): void => {
							createActivity(e, _id, date.toString());
						}}
					/>
				);
			}
		});
	};

	return (
		<Box className="gridDays" mt={1}>
			{generateActivities()}
		</Box>
	);
}

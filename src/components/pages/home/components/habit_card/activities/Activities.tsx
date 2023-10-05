/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import "./activity.css";

import { Box } from "@mui/material";
import { useAppDispatch } from "hooks/redux";
import { createActivityAction, deleteActivityAction } from "store/app/activity/activity.action";
import { Activity, ActivityStatus } from "store/app/activity/models/activity.type";

import { myConfetti } from "./confetti";

type Props = {
	activities: Activity[];
	habitId: string;
};

export function Activities({ activities, habitId }: Props): JSX.Element {
	const dispatch = useAppDispatch();

	const generateActivities = (): JSX.Element[] => {
		return activities.map((activity, index) => {
			const { _id, status, date } = activity;

			if (status === ActivityStatus.DONE) {
				return (
					<div
						key={`activity_${activity._id}_${index}`}
						className={`activity ${status}`}
						data-tooltip={`${date.slice(5, 7)}-${date.slice(8, 10)}`}
						onClick={(): void => {
							dispatch(deleteActivityAction(habitId, _id));
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
							myConfetti(e.clientX, e.clientY);

							dispatch(createActivityAction(habitId, _id, date));
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

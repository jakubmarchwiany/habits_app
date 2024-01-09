/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box } from "@mui/material";
import { useAppDispatch } from "hooks/redux";
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useNDaysToShow } from "hooks/useNDaysToShow";
import { createActivityAction, deleteActivityAction } from "store/app/activity/activity.action";
import { Activity, ActivityStatus } from "store/app/activity/models/activity.type";

import { myConfetti } from "../confetti";
import "./activity.css";

type Props = {
	activities: Activity[];
	habitId: string;
};

export function Activities({ activities, habitId }: Props): JSX.Element {
	const dispatch = useAppDispatch();
	const nDaysToShow = useNDaysToShow();

	const generateActivities = (): JSX.Element[] => {
		return activities.slice(-nDaysToShow).map((activity, index) => {
			const { _id, date, status } = activity;

			if (status === ActivityStatus.DONE) {
				return (
					<div
						className={`activity ${status}`}
						data-tooltip={`${date.slice(5, 7)}-${date.slice(8, 10)}`}
						key={`activity_${activity._id}_${index}`}
						onClick={(): void => {
							dispatch(deleteActivityAction(habitId, _id));
						}}
					/>
				);
			} else {
				return (
					<div
						className={`activity ${status}`}
						data-tooltip={`${date.slice(5, 7)}-${date.slice(8, 10)}`}
						key={`activity_${activity._id}_${index}`}
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
		<Box className="gridDays" width="100%">
			{generateActivities()}
		</Box>
	);
}

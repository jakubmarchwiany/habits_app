/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box } from "@mui/material";
import { useAppDispatch } from "hooks/redux";
import { createActivityAction, deleteActivityAction } from "store/app/activity/activity.action";
import { Activity, ActivityStatus } from "store/app/activity/models/activity.type";

/* eslint-disable jsx-a11y/no-static-element-interactions */
import "./activityv2.css";
import { myConfetti } from "./confettiv2";

type Props = {
	activities: Activity[];
	habitId: string;
};

export function Activitiesv2({ activities, habitId }: Props): JSX.Element {
	const dispatch = useAppDispatch();

	const generateActivities = (): JSX.Element[] => {
		return activities.map((activity, index) => {
			const { _id, date, status } = activity;

			if (status === ActivityStatus.DONE) {
				return (
					<div
						className={`activityv2 ${status}`}
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
						className={`activityv2 ${status}`}
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
		<Box className="gridDaysv2" width="100%">
			{generateActivities()}
		</Box>
	);
}

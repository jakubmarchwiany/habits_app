/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import "./dear_activity.css";

import { Box } from "@mui/material";
import { Activity, ActivityStatus } from "store/app/activity/models/activity.type";

type Props = {
	activities: Activity[];
};

export function DearActivities({ activities }: Props): JSX.Element {
	const generateActivites = (): JSX.Element[] => {
		return activities.map((activity, index) => {
			const { status, date } = activity;

			if (status === ActivityStatus.DONE) {
				return (
					<div
						key={`activity_${activity._id}_${index}`}
						className={`dear_activity dear_${status}`}
						data-tooltip={`${date.slice(5, 7)}-${date.slice(8, 10)}`}
					/>
				);
			} else {
				return (
					<div
						key={`activity_${activity._id}_${index}`}
						className={`dear_activity dear_${status}`}
						data-tooltip={`${date.slice(5, 7)}-${date.slice(8, 10)}`}
					/>
				);
			}
		});
	};

	return (
		<Box className="gridDays" mt={1}>
			{generateActivites()}
		</Box>
	);
}

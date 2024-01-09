import { Box } from "@mui/material";
import { useNDaysToShow } from "hooks/useNDaysToShow";
import { Activity, ActivityStatus } from "store/app/activity/models/activity.type";

import "./dear_activity.css";

type Props = {
	activities: Activity[];
};

export function DearActivities({ activities }: Props): JSX.Element {
	const nDaysToShow = useNDaysToShow();

	const generateActivities = (): JSX.Element[] => {
		return activities.slice(-nDaysToShow).map((activity, index) => {
			const { date, status } = activity;

			if (status === ActivityStatus.DONE) {
				return (
					<div
						className={`dear_activity dear_${status}`}
						data-tooltip={`${date.slice(5, 7)}-${date.slice(8, 10)}`}
						key={`activity_${activity._id}_${index}`}
					/>
				);
			} else {
				return (
					<div
						className={`dear_activity dear_${status}`}
						data-tooltip={`${date.slice(5, 7)}-${date.slice(8, 10)}`}
						key={`activity_${activity._id}_${index}`}
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

import { Stack, Typography } from "@mui/material";
import { useAppSelector } from "hooks/redux";

import { Activitiesv2 } from "./Activitiesv2";
import "./habitsv2.css";

type Props = {
	_id: string;
};
export function Habitv2({ _id }: Props): JSX.Element {
	const showAllHabits = useAppSelector((s) => s.app.showAllHabits);

	const habit = useAppSelector((s) => {
		return s.app.habits?.find((g) => g._id === _id);
	});

	if (habit === undefined || !(habit.show || showAllHabits)) {
		return <></>;
	}

	const { activities, description, name, periodInDays, score: goalRate } = habit;

	return (
		<Stack direction="row" p={1} py={2}>
			<Stack alignItems="center" direction="row" id="card" mr={1}>
				<Typography sx={{ fontSize: "75px", lineHeight: 1 }}>🌇</Typography>

				<div id="info">
					<Typography mx={2} noWrap variant="h4">
						{name.substring(0, name.length - 2)}
					</Typography>
				</div>
			</Stack>

			<Activitiesv2 activities={activities} habitId={_id} />
		</Stack>
	);
}

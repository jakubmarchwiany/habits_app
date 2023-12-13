import { Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAppSelector } from "hooks/redux";

import { Activities } from "./habit_card/activities/Activities";
import { TopBar } from "./habit_card/top_bar/TopBar";

type Props = {
	_id: string;
};
export function Habit({ _id }: Props): JSX.Element {
	const showAllHabits = useAppSelector((s) => s.app.showAllHabits);
	const habit = useAppSelector((s) => {
		return s.app.habits?.find((g) => g._id === _id);
	});

	if (habit === undefined || !(habit.show || showAllHabits)) {
		return <></>;
	}

	const { activities, description, name, periodInDays, score: goalRate } = habit;

	return (
		<Grid2 md={3} xs={12}>
			<Stack
				p={0.5}
				pt={{ xs: 1 }}
				sx={{
					border: 3.5,
					borderColor: "background.default",
					borderRadius: 4
				}}
			>
				<TopBar
					_id={_id}
					description={description}
					name={name}
					periodInDays={periodInDays}
					score={goalRate}
				/>

				<Activities activities={activities} habitId={_id} />
			</Stack>
		</Grid2>
	);
}

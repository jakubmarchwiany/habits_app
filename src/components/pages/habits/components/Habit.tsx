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

	const { name, description, score: goalRate, periodInDays, activities } = habit;

	return (
		<Grid2 xs={12} md={3}>
			<Stack
				pt={{ xs: 1, md: 1 }}
				boxShadow={5}
				sx={{
					border: 2,
					borderRadius: 3,
					borderColor: "primary.main"
				}}
			>
				<TopBar
					_id={_id}
					name={name}
					description={description}
					score={goalRate}
					periodInDays={periodInDays}
				/>

				<Activities habitId={_id} activities={activities} />
			</Stack>
		</Grid2>
	);
}

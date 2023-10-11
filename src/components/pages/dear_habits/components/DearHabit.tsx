import { Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAppSelector } from "hooks/redux";

import { DearActivities } from "./habit_card/activities/DearActivities";
import { DearTopBar } from "./habit_card/top_bar/DearTopBar";

type Props = {
	_id: string;
};
export function DearHabit({ _id }: Props): JSX.Element {
	const showAllHabits = useAppSelector((s) => s.app.showAllHabits);
	const habit = useAppSelector((s) => {
		return s.dear.habits?.find((g) => g._id === _id);
	});

	if (habit === undefined || !(habit.show || showAllHabits)) {
		return <></>;
	}

	const { name, description, score, periodInDays, activities } = habit;

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
				<DearTopBar
					name={name}
					description={description}
					score={score}
					periodInDays={periodInDays}
				/>

				<DearActivities activities={activities} />
			</Stack>
		</Grid2>
	);
}

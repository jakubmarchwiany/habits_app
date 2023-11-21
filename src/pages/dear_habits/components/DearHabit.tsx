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

	const { activities, description, name, periodInDays, score } = habit;

	return (
		<Grid2 md={3} xs={12}>
			<Stack
				p={0.5}
				pt={{ xs: 1 }}
				sx={{
					border: 3.5,
					borderRadius: 4,
					borderColor: "background.default"
				}}
			>
				<DearTopBar
					description={description}
					name={name}
					periodInDays={periodInDays}
					score={score}
				/>

				<DearActivities activities={activities} />
			</Stack>
		</Grid2>
	);
}

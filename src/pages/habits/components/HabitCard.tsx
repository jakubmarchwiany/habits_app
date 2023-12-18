import { Stack } from "@mui/material";
import { useAppSelector } from "hooks/redux";

import { Activities } from "./Activities";
import { HabitInfo } from "./HabitInfo";
import "./habit_info.css";

type Props = {
	_id: string;
};

export function HabitCard({ _id }: Props): JSX.Element {
	const showAllHabits = useAppSelector((s) => s.app.showAllHabits);

	const habit = useAppSelector((s) => {
		return s.app.habits?.find((g) => g._id === _id);
	});

	if (habit === undefined || !(habit.show || showAllHabits)) {
		return <></>;
	}

	const { activities, description, emoji, name, periodInDays, score: goalRate } = habit;

	return (
		<Stack
			borderRadius={7}
			boxShadow={5}
			direction="row"
			my={1}
			px={2}
			py={1.5}
			sx={{
				background: `linear-gradient(8deg, rgba(0,173, 95,${goalRate / 1.5}) ${
					goalRate * 100 - 5
				}%, rgba(211, 49, 49,${goalRate === 0 ? 0 : (1 - goalRate) / 1.5}) ${
					goalRate * 100
				}%)`
			}}
		>
			<HabitInfo
				description={description}
				emoji={emoji}
				name={name}
				periodInDays={periodInDays}
			/>

			<Activities activities={activities} habitId={_id} />
		</Stack>
	);
}

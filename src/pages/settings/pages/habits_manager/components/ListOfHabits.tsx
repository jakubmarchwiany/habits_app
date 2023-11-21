import { Box, Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Habit } from "store/app/habit/models/habit.type";

type Props = {
	currentHabit: Habit;
	habits: Habit[];
	setCurrentHabit: Dispatch<SetStateAction<Habit>>;
};

export function ListOfHabits({ currentHabit, habits, setCurrentHabit }: Props): JSX.Element {
	const tmpHabits = [...habits];

	const habitsSortedByName = tmpHabits.sort((a, b) => a.name.localeCompare(b.name));

	return (
		<Box overflow="auto" sx={{ backgroundColor: "background.default", height: "100vh" }}>
			<List sx={{ pt: 8 }}>
				{habitsSortedByName.map((h) => {
					return (
						<div key={h._id}>
							<ListItemButton
								onClick={(): void => setCurrentHabit(h)}
								sx={{
									backgroundColor:
										h._id === currentHabit._id ? "primary.main" : "none"
								}}
							>
								<ListItemText primary={h.name} />
							</ListItemButton>
							<Divider />
						</div>
					);
				})}
			</List>
		</Box>
	);
}

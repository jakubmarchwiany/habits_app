import { Box, Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type Props = {
	habits: { _id: string; name: string }[];
	selectedHabitId: string | undefined;
	setSelectedHabitId: Dispatch<SetStateAction<string | undefined>>;
};

export function ListOfHabits({ habits, selectedHabitId, setSelectedHabitId }: Props): JSX.Element {
	const tmpHabits = [...habits];

	const habitsSortedByName = tmpHabits.sort((a, b) => a.name.localeCompare(b.name));

	return (
		<Box overflow="auto" sx={{ backgroundColor: "background.default", height: "100vh" }}>
			<List sx={{ pt: 8 }}>
				{habitsSortedByName.map((h) => {
					return (
						<div key={h._id}>
							<ListItemButton
								onClick={(): void => setSelectedHabitId(h._id)}
								sx={{
									backgroundColor:
										h._id === selectedHabitId ? "primary.main" : "none"
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

import { Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAppSelector } from "hooks/redux";
import { useState } from "react";

import { EditHabit } from "./components/EditHabit";
import { ListOfHabits } from "./components/ListOfHabits";

export function HabitsManagerPage(): JSX.Element {
	const habits = useAppSelector((s) => s.app.habits);
	const [selectedHabitId, setSelectedHabitId] = useState<string | undefined>();

	if (habits === undefined) {
		throw new Error("Nie znaleziono nawyków");
	}

	const habitToEdit = habits.find((h) => h._id === selectedHabitId);

	return (
		<Stack alignItems="center" component="main">
			<Grid2 container height={"100vh"} width={"100%"}>
				<Grid2 md={2} xs={4}>
					<ListOfHabits
						habits={habits}
						selectedHabitId={selectedHabitId}
						setSelectedHabitId={setSelectedHabitId}
					/>
				</Grid2>
				<Grid2 md={10} xs={8}>
					{habitToEdit !== undefined ? (
						<EditHabit habitToEdit={habitToEdit} />
					) : (
						<Typography mt="30vh" textAlign="center" variant="h2">
							Wybierz nawyk do edycji
						</Typography>
					)}
				</Grid2>
			</Grid2>
		</Stack>
	);
}

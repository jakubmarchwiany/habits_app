import { Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAppSelector } from "hooks/redux";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Habit } from "store/app/habit/models/habit.type";

import { ListOfHabits } from "./components/ListOfHabits";

export function HabitsManagerPage(): JSX.Element {
	const habits = useAppSelector((s) => s.app.habits);

	if (habits === undefined) {
		throw new Error("Nie znaleziono nawyków");
	}

	const [currentHabit, setCurrentHabit] = useState<Habit>(habits[0]);

	console.log(currentHabit);

	return (
		<Stack alignItems="center" component="main">
			<Grid2 container height={"100vh"} width={"100%"}>
				<Grid2 xs={2}>
					<ListOfHabits
						currentHabit={currentHabit}
						habits={habits}
						setCurrentHabit={setCurrentHabit}
					/>
				</Grid2>
				<Grid2 xs={10}>
					<Outlet />
					<Stack direction="row" sx={{ display: "flex" }}>
						<Stack sx={{ flexGrow: 10 }}>
							<Typography
								sx={{ py: { xs: 1, md: 3 } }}
								textAlign={"center"}
								typography="h2"
							>
								Ustawienia
							</Typography>
						</Stack>
					</Stack>
				</Grid2>
			</Grid2>
		</Stack>
	);
}

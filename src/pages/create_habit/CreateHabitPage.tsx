import { Stack } from "@mui/material";

import { CreateHabit } from "./components/CreateHabit";

export function CreateHabitPage(): JSX.Element {
	return (
		<Stack
			alignItems="center"
			component="main"
			sx={{
				pb: "15vh",
				pt: { md: 5, xs: 3 }
			}}
		>
			<CreateHabit />
		</Stack>
	);
}

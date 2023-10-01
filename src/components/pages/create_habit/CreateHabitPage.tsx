import { Stack } from "@mui/material";

import { CreateHabit } from "./components/CreateHabit";

export function CreateHabitPage(): JSX.Element {
	return (
		<Stack
			component="main"
			sx={{
				pt: { xs: 3, md: 5 },
				pb: "15vh"
			}}
			alignItems="center"
		>
			<CreateHabit />
		</Stack>
	);
}

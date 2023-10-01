import { Stack } from "@mui/material";

import { GroupsOfHabitsManager } from "./components/group_of_habits_card/GroupsOfHabitsManager";

export function GroupsOfHabitsManagerPage(): JSX.Element {
	return (
		<Stack
			component="main"
			sx={{
				pb: "15vh"
			}}
		>
			<GroupsOfHabitsManager />
		</Stack>
	);
}

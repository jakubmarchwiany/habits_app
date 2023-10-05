import { Stack, Typography } from "@mui/material";
import { ErrorPage } from "components/layouts/ErrorPage";
import { useAppSelector } from "hooks/redux";

import { GroupOfHabits } from "./components/GroupOfHabits";

export function HabitsPage(): JSX.Element {
	const groupsOfHabits = useAppSelector((s) => s.app.groupsOfHabits);

	const generateGroupsOfHabits = (): JSX.Element[] | JSX.Element => {
		if (groupsOfHabits !== undefined && groupsOfHabits.length > 0) {
			return groupsOfHabits.map((g) => (
				<GroupOfHabits key={`group_of_habits_${g._id}`} _id={g._id} />
			));
		} else {
			return <Typography>Nie masz dodanej żadnej grupy</Typography>;
		}
	};

	if (groupsOfHabits === undefined) {
		return <ErrorPage />;
	}

	return (
		<Stack
			component="main"
			sx={{
				pt: { xs: 1, sm: 2 },
				pb: "15vh"
			}}
		>
			{generateGroupsOfHabits()}
		</Stack>
	);
}

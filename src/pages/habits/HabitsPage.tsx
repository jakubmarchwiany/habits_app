import { Stack, Typography } from "@mui/material";
import { useAppSelector } from "hooks/redux";
import { ErrorPage } from "layouts/ErrorPage";
import { ShowAllButton } from "layouts/navigator/components/buttons/ShowAllButton";
import { ToggleHabitsButton } from "layouts/navigator/components/buttons/ToggleHabitsButton";

import { GroupOfHabits } from "./components/GroupOfHabits";

export function HabitsPage(): JSX.Element {
	const groupsOfHabits = useAppSelector((s) => s.app.groupsOfHabits);

	const generateGroupsOfHabits = (): JSX.Element | JSX.Element[] => {
		if (groupsOfHabits !== undefined && groupsOfHabits.length > 0) {
			return groupsOfHabits.map((g) => (
				<GroupOfHabits _id={g._id} key={`group_of_habits_${g._id}`} />
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
				pb: "15vh",
				pt: { sm: 2, xs: 1 }
			}}
		>
			<ToggleHabitsButton />

			<ShowAllButton />

			{generateGroupsOfHabits()}
		</Stack>
	);
}

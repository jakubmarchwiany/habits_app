import { Stack, Typography } from "@mui/material";
import { ErrorPage } from "components/layouts/ErrorPage";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect } from "react";
import { getHabits } from "store/app/app.actions";

import { DearGroupOfHabits } from "./components/DearGroupOfHabits";

export function DearHabitsPage(): JSX.Element {
	const dispatch = useAppDispatch();
	const groupsOfHabits = useAppSelector((state) => state.dear.groupsOfHabits);

	useEffect(() => {
		if (groupsOfHabits === undefined) {
			dispatch(getHabits(() => {}, false));
		}
	}, []);

	if (groupsOfHabits === undefined) {
		return <ErrorPage />;
	}

	const generateGroupsOfHabits = (): JSX.Element[] | JSX.Element => {
		if (groupsOfHabits !== undefined && groupsOfHabits.length > 0) {
			return groupsOfHabits.map((g) => (
				<DearGroupOfHabits key={`group_of_habits_${g._id}`} _id={g._id} />
			));
		} else {
			return <Typography>Nie masz dodanej żadnej grupy</Typography>;
		}
	};

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

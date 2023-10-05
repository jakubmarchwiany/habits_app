import { Stack, Typography } from "@mui/material";
import { ErrorPage } from "components/layouts/ErrorPage";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import { getHabits } from "store/app/habit/habit.actions";

import { LoadingPage } from "../loading/LoadingPage";
import { GroupOfHabits } from "./components/GroupOfHabits";

export function HabitsPage(): JSX.Element {
	const [loading, setIsLoading] = useState(true);
	const userId = useAppSelector((s) => s.app.userId);
	const groupsOfHabits = useAppSelector((s) => s.app.groupsOfHabits);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (userId !== undefined && groupsOfHabits === undefined) {
			dispatch(getHabits(userId, true, setIsLoading));
		}
	}, [userId, groupsOfHabits]);

	const generateGroupsOfHabits = (): JSX.Element[] | JSX.Element => {
		if (groupsOfHabits !== undefined && groupsOfHabits.length > 0) {
			return groupsOfHabits.map((g) => (
				<GroupOfHabits key={`group_of_habits_${g._id}`} _id={g._id} />
			));
		} else {
			return <Typography>Nie masz dodanej żadnej grupy</Typography>;
		}
	};

	if (loading) {
		return <LoadingPage />;
	} else if (groupsOfHabits === undefined) {
		return <ErrorPage />;
	} else {
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
}

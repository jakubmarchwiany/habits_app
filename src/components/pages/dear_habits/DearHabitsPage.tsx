import { Stack, Typography } from "@mui/material";
import { ErrorPage } from "components/layouts/ErrorPage";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import { getHabits } from "store/app/habit/habit.actions";

import { LoadingPage } from "../loading/LoadingPage";
import { DearGroupOfHabits } from "./components/DearGroupOfHabits";

export function DearHabitsPage(): JSX.Element {
	const [loading, setIsLoading] = useState(true);
	const dearId = useAppSelector((s) => s.dear.dearId);
	const groupsOfHabits = useAppSelector((s) => s.dear.groupsOfHabits);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (dearId !== undefined && groupsOfHabits === undefined) {
			dispatch(getHabits(dearId, false, setIsLoading));
		}
	}, []);

	const generateGroupsOfHabits = (): JSX.Element[] | JSX.Element => {
		if (groupsOfHabits !== undefined && groupsOfHabits.length > 0) {
			return groupsOfHabits.map((g) => (
				<DearGroupOfHabits key={`group_of_habits_${g._id}`} _id={g._id} />
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

import { Stack, Typography } from "@mui/material";
import { ErrorPage } from "components/layouts/ErrorPage";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import { getHabits } from "store/app/habit/habit.actions";

import { LoadingPage } from "../loading/LoadingPage";
import { DearGroupOfHabits } from "./components/DearGroupOfHabits";

export function DearHabitsPage(): JSX.Element {
	const [isDownload, setIsDownload] = useState(false);
	const groupsOfHabits = useAppSelector((s) => s.dear.groupsOfHabits);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (groupsOfHabits === undefined) {
			dispatch(getHabits(false, setIsDownload));
		} else {
			setIsDownload(true);
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

	if (groupsOfHabits === undefined) {
		return <LoadingPage />;
	} else if (!isDownload) {
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

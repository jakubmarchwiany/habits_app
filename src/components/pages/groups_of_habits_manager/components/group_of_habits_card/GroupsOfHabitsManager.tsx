import { Button, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ErrorPage } from "components/layouts/ErrorPage";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { edithabitsOrderAction } from "store/app/habit/habit.actions";
import { v4 as uuid } from "uuid";

import { prepareGroups, validateGroups } from "../prepareGroups";
import { GroupOfHabitsItem } from "./group_of_habits_item.type";
import { GroupOfHabitsCard } from "./GroupOfHabitsCard";

export function GroupsOfHabitsManager(): JSX.Element {
	const [groupsOfHabitsCard, setGroupOfHabitsCard] = useState<GroupOfHabitsItem[]>([]);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const habits = useAppSelector((state) => state.app.habits);
	const groupsOfHabits = useAppSelector((state) => state.app.groupsOfHabits);

	useEffect(() => {
		if (habits !== undefined && groupsOfHabits !== undefined) {
			setGroupOfHabitsCard(prepareGroups(habits, groupsOfHabits));
		}
	}, [habits, groupsOfHabits]);

	if (habits === undefined || groupsOfHabits === undefined || groupsOfHabitsCard === undefined) {
		return <ErrorPage />;
	}

	const createNewGroupOfHabits = (): void => {
		const updatedLists = [...groupsOfHabitsCard];

		updatedLists.push({ _id: uuid(), name: "", habits: [] });

		setGroupOfHabitsCard(updatedLists);
	};

	const saveGroupsOfHabits = (): void => {
		if (validateGroups(groupsOfHabitsCard)) {
			console.log(groupsOfHabitsCard);

			const groupsToFetch = groupsOfHabitsCard.map((group) => {
				return { name: group.name, habits: group.habits.map((habit) => habit._id) };
			});

			dispatch(edithabitsOrderAction(groupsToFetch, navigate));
		}
	};

	return (
		<Stack p={1}>
			<Grid2 container spacing={2}>
				{groupsOfHabitsCard.map((group, groupIndex) => (
					<Grid2 xs={12} md={3} key={group._id}>
						<GroupOfHabitsCard
							group={group}
							groupIndex={groupIndex}
							habitGroups={groupsOfHabitsCard}
							setHabitGroups={setGroupOfHabitsCard}
						/>
					</Grid2>
				))}

				<Grid2 xs={12} md={3}>
					<Button
						variant="outlined"
						sx={{
							minHeight: "10vh",
							width: "100%",
							height: "100%",
							border: 2,
							borderColor: "primary.main"
						}}
						onClick={createNewGroupOfHabits}
					>
						Stwórz grupę
					</Button>
				</Grid2>
			</Grid2>
			<Stack direction="row" mt={3}>
				<Button
					variant="contained"
					color="warning"
					onClick={(): void => {
						navigate("/habits");
					}}
					fullWidth
				>
					Anuluj
				</Button>
				<Button variant="contained" onClick={saveGroupsOfHabits} fullWidth>
					Zapisz
				</Button>
			</Stack>
		</Stack>
	);
}

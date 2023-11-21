import { Button, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { ErrorPage } from "layouts/ErrorPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateGroupsOfHabits } from "store/app/habit/habit.actions";
import { v4 as uuid } from "uuid";

import { prepareGroups, validateGroups } from "../prepareGroups";
import { GroupOfHabitsCard } from "./GroupOfHabitsCard";
import { GroupOfHabitsItem } from "./group_of_habits_item.type";

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
			const groupsToFetch = groupsOfHabitsCard.map((group) => {
				return {
					_id: group._id,
					name: group.name,
					habitsIds: group.habits.map((habit) => habit._id)
				};
			});

			dispatch(updateGroupsOfHabits(groupsToFetch, navigate));
		}
	};

	return (
		<Stack p={1}>
			<Grid2 container spacing={2}>
				{groupsOfHabitsCard.map((group, groupIndex) => (
					<Grid2 key={group._id} md={3} xs={12}>
						<GroupOfHabitsCard
							group={group}
							groupIndex={groupIndex}
							habitGroups={groupsOfHabitsCard}
							setHabitGroups={setGroupOfHabitsCard}
						/>
					</Grid2>
				))}

				<Grid2 md={3} xs={12}>
					<Button
						onClick={createNewGroupOfHabits}
						sx={{
							minHeight: "10vh",
							width: "100%",
							height: "100%",
							border: 2,
							borderColor: "primary.main"
						}}
						variant="outlined"
					>
						Stwórz grupę
					</Button>
				</Grid2>
			</Grid2>
			<Stack direction="row" mt={3}>
				<Button
					color="warning"
					fullWidth
					onClick={(): void => {
						navigate("/settings");
					}}
					variant="contained"
				>
					Anuluj
				</Button>
				<Button fullWidth onClick={saveGroupsOfHabits} variant="contained">
					Zapisz
				</Button>
			</Stack>
		</Stack>
	);
}

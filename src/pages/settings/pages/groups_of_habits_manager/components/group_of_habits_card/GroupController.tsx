import { Delete } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import toast from "react-hot-toast";

import { GroupOfHabitsItem } from "./group_of_habits_item.type";

type Props = {
	groupIndex: number;
	habitGroups: GroupOfHabitsItem[];
	name: string;
	setHabitGroups: React.Dispatch<React.SetStateAction<GroupOfHabitsItem[]>>;
};
export function MoveGroupController({
	name,
	groupIndex,
	habitGroups,
	setHabitGroups
}: Props): JSX.Element {
	const moveGroup = (currentIndex: number, newIndex: number): void => {
		const updatedLists = [...habitGroups];
		const [item] = updatedLists.splice(currentIndex, 1);

		updatedLists.splice(newIndex, 0, item);

		setHabitGroups(updatedLists);
	};

	const changeGroupName = (newName: string): void => {
		const updatedLists = [...habitGroups];

		updatedLists[groupIndex].name = newName;

		setHabitGroups(updatedLists);
	};

	const deleteGroup = (): void => {
		if (habitGroups[groupIndex].habits.length > 0) {
			toast.error("przenieś wszystkie nawyki z grupy");

			return;
		}
		const updatedLists = [...habitGroups];

		updatedLists.splice(groupIndex, 1);

		setHabitGroups(updatedLists);
	};

	return (
		<Stack>
			<Stack direction={"row"}>
				<Button
					fullWidth
					variant="outlined"
					onClick={(): void => {
						if (groupIndex > 0) {
							moveGroup(groupIndex, groupIndex - 1);
						}
					}}
					sx={{ color: groupIndex == 0 ? "" : "primary.main" }}
					disabled={groupIndex == 0}
				>
					{"<"}
				</Button>

				<Button
					fullWidth
					variant="outlined"
					onClick={(): void => moveGroup(groupIndex, groupIndex + 1)}
					disabled={groupIndex === habitGroups.length - 1}
					sx={{
						color: groupIndex === habitGroups.length - 1 ? "" : "primary.main"
					}}
				>
					{">"}
				</Button>
			</Stack>
			<TextField
				fullWidth
				label="Nazwa grupy"
				variant="filled"
				value={name}
				onChange={(e): void => changeGroupName(e.target.value)}
				InputProps={{
					endAdornment: (
						<IconButton onClick={(): void => deleteGroup()} color="error">
							<Delete />
						</IconButton>
					)
				}}
			/>
		</Stack>
	);
}

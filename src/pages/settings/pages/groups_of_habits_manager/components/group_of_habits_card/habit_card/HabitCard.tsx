import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { DragEvent } from "react";

import { habitCardItem } from "./habit_card_item.type";

type Props = {
	groupHabitsLength: number;
	groupIndex: number;
	habit: habitCardItem;
	itemIndex: number;
	moveHabitItem: (oldIndex: number, newIndex: number, groupIndex: number) => void;
};

export function HabitItem({
	groupHabitsLength,
	groupIndex,
	habit,
	itemIndex,

	moveHabitItem
}: Props): JSX.Element {
	const dragStart = (
		event: React.DragEvent<HTMLDivElement>,
		habit: habitCardItem,
		oldGroupIndex: number
	): void => {
		event.dataTransfer.setData("text/plain", JSON.stringify([oldGroupIndex, habit]));
	};

	return (
		<Stack
			direction="row"
			draggable
			onDragStart={(e: DragEvent<HTMLDivElement>): void => dragStart(e, habit, groupIndex)}
			sx={{
				pl: 2,
				alignItems: "center",
				justifyContent: "space-between",
				backgroundColor: "hsl(0, 0%, 20%)",
				border: 2,
				my: 0.5,
				borderColor: "primary.main"
			}}
		>
			<Typography>{habit.name}</Typography>
			<Stack>
				<IconButton
					disabled={itemIndex == 0}
					onClick={(): void => {
						if (itemIndex > 0) {
							moveHabitItem(itemIndex, itemIndex - 1, groupIndex);
						}
					}}
					sx={{ color: itemIndex == 0 ? "" : "primary.main", p: 0 }}
				>
					<ArrowDropUp />
				</IconButton>

				<IconButton
					disabled={itemIndex === groupHabitsLength - 1}
					onClick={(): void => moveHabitItem(itemIndex, itemIndex + 1, groupIndex)}
					sx={{
						color: itemIndex === groupHabitsLength - 1 ? "" : "primary.main",
						p: 0
					}}
				>
					<ArrowDropDown />
				</IconButton>
			</Stack>
		</Stack>
	);
}

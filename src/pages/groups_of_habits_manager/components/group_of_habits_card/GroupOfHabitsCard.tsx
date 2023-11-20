import { Stack } from "@mui/material";
import React from "react";

import { GroupOfHabitsItem } from "./group_of_habits_item.type";
import { MoveGroupController } from "./GroupController";
import { habitCardItem } from "./habit_card/habit_card_item.type";
import { HabitItem } from "./habit_card/HabitCard";

type Props = {
	group: GroupOfHabitsItem;
	groupIndex: number;
	habitGroups: GroupOfHabitsItem[];
	setHabitGroups: React.Dispatch<React.SetStateAction<GroupOfHabitsItem[]>>;
};

export function GroupOfHabitsCard({
	habitGroups,
	setHabitGroups,
	group,
	groupIndex
}: Props): JSX.Element {
	const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
		event.preventDefault();
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>, newGroupIndex: number): void => {
		event.preventDefault();

		const itemString = event.dataTransfer.getData("text/plain");
		const item = JSON.parse(itemString) as [number, habitCardItem];

		if (item[0] === newGroupIndex) {
			return;
		}

		const updatedLists = [...habitGroups];

		updatedLists[item[0]].habits = updatedLists[item[0]].habits.filter(
			(i) => i._id !== item[1]._id
		);

		updatedLists[newGroupIndex].habits.push(item[1]);

		setHabitGroups(updatedLists);
	};

	const moveHabitItem = (currentIndex: number, newIndex: number, groupIndex: number): void => {
		const updatedLists = [...habitGroups];
		const [item] = updatedLists[groupIndex].habits.splice(currentIndex, 1);

		updatedLists[groupIndex].habits.splice(newIndex, 0, item);

		setHabitGroups(updatedLists);
	};

	return (
		<Stack
			sx={{ border: 2, borderColor: "primary.main" }}
			key={"Group_" + group._id}
			onDragOver={handleDragOver}
			onDrop={(e): void => handleDrop(e, groupIndex)}
		>
			<MoveGroupController
				name={group.name}
				groupIndex={groupIndex}
				habitGroups={habitGroups}
				setHabitGroups={setHabitGroups}
			/>
			<Stack overflow="auto" height={"35vh"}>
				{group.habits.map((habit, index) => (
					<HabitItem
						key={habit._id}
						habit={habit}
						groupIndex={groupIndex}
						groupHabitsLength={group.habits.length}
						itemIndex={index}
						moveHabitItem={moveHabitItem}
					/>
				))}
			</Stack>
		</Stack>
	);
}

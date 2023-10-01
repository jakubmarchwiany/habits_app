import toast from "react-hot-toast";
import { GroupOfHabits } from "store/app/habit/models/group_of_habits.type";
import { Habit } from "store/app/habit/models/habit.type";
import { v4 as uuid } from "uuid";

import { GroupOfHabitsItem } from "./group_of_habits_card/group_of_habits_item.type";
import { habitCardItem } from "./group_of_habits_card/habit_card/habit_card_item.type";

export function prepareGroups(
	habits: Habit[],
	GroupOfHabits: GroupOfHabits[]
): GroupOfHabitsItem[] {
	const tmpHabits = habits.map((h) => {
		return { _id: h._id, name: h.name };
	}) as habitCardItem[];

	const tmpGroups = GroupOfHabits.map((group) => {
		const groupHabits: habitCardItem[] = [];

		group.habits.forEach((habitId) => {
			const habit = tmpHabits.find((h) => h._id === habitId);

			if (habit) {
				groupHabits.push({ _id: habit._id, name: habit.name });

				tmpHabits.splice(tmpHabits.indexOf(habit), 1);
			}
		});

		return { _id: group._id, name: group.name, habits: groupHabits };
	});

	if (tmpHabits.length !== 0) {
		tmpGroups.push({ _id: uuid(), name: "bez grupy", habits: tmpHabits });
	}

	return tmpGroups;
}

export function validateGroups(groups: GroupOfHabitsItem[]): boolean {
	for (let i = 0; i < groups.length; i++) {
		if (groups[i].name.length === 0) {
			toast.error(
				`Grupa z nawykami (${groups[i].habits.map((m) => m.name).toString()}) nie ma nazwy`
			);

			return false;
		}
		if (groups[i].habits.length === 0) {
			toast.error(`Grupa ${groups[i].name} pusta`);

			return false;
		}
	}

	return true;
}

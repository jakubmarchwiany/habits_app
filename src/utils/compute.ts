import { GOAL_RATE_LEVELS } from "components/pages/home/components/habit_card/top_bar/GoalRate";
import dayjs from "dayjs";
import { GroupOfHabitsData, HabitData } from "store/app/habit/habit.actions";
import { v4 as uuid } from "uuid";

import { Activity, ActivityStatus } from "../store/app/activity/models/activity.type";
import { GroupOfHabits } from "../store/app/habit/models/group_of_habits.type";
import { Habit } from "../store/app/habit/models/habit.type";

export function extendHabit(habit: HabitData): Habit {
	const habitExt: Habit = { ...habit, show: true, goalRate: { level: 0, value: 0 } };

	return habitExt;
}

export function extendGroup(group: GroupOfHabitsData): GroupOfHabits {
	const groupExt: GroupOfHabits = { ...group, show: true };

	return groupExt;
}

export function computeHabit(habit: Habit): Habit {
	habit = computeActivitiesTodayOrDelay(habit);

	habit = computeHabitRate(habit);

	return habit;
}

export function computeGroup(groupOfHabits: GroupOfHabits, allHabits: Habit[]): GroupOfHabits {
	groupOfHabits = computeShowGroup(allHabits, groupOfHabits);

	return groupOfHabits;
}

export function computeActivitiesDoneOrNotDone(habit: Habit, nDays: number): Habit {
	const newActivities = Array<Activity>(nDays);
	const activities = habit.activities;

	let index = 0;
	const subtractDate = dayjs().subtract(nDays - 1, "day");

	for (let i = 0; i < nDays; i++) {
		const currentDate = subtractDate.add(i, "day");

		if (index < activities.length && dayjs(activities[index].date).isSame(currentDate, "day")) {
			newActivities[i] = {
				_id: activities[index]._id,
				date: activities[index].date.split("T")[0],
				status: ActivityStatus.DONE
			};

			index += 1;
		} else {
			newActivities[i] = {
				_id: uuid(),
				date: currentDate.format("YYYY-MM-DD"),
				status: ActivityStatus.NOT_DONE
			};
		}
	}

	habit.activities = newActivities;

	return habit;
}

function computeActivitiesTodayOrDelay(habit: Habit): Habit {
	const { periodInDays, activities } = habit;

	let flagOneActivityDone = false;

	activities.map((a) => {
		if (a.status !== ActivityStatus.DONE) {
			a.status = ActivityStatus.NOT_DONE;
		} else {
			flagOneActivityDone = true;
		}
	});

	if (!flagOneActivityDone) {
		habit.show = true;

		activities[activities.length - 1].status = ActivityStatus.TODAY;

		return habit;
	}

	if (activities[activities.length - 1].status === ActivityStatus.DONE) {
		habit.show = false;

		return habit;
	}

	let daysFromLastActivity = 0;

	for (let i = activities.length - 1; i >= 0; i--) {
		if (activities[i].status === ActivityStatus.DONE) {
			break;
		}

		daysFromLastActivity += 1;
	}

	if (daysFromLastActivity === periodInDays) {
		activities[activities.length - 1].status = ActivityStatus.TODAY;

		habit.show = true;
	} else {
		if (daysFromLastActivity >= periodInDays) {
			const delayIndex = activities.length - 1 - daysFromLastActivity + periodInDays;

			activities[delayIndex].status = ActivityStatus.DELAY;

			activities[activities.length - 1].status = ActivityStatus.TODAY;

			habit.show = true;
		} else {
			habit.show = false;
		}
	}

	return habit;
}

function computeHabitRate(habit: Habit): Habit {
	const { activities } = habit;

	let firstDoneActivity = 0;
	let sumDoneActivities = 0;
	let flagFirstDone = true;

	for (let i = 0; i < activities.length; i++) {
		if (activities[i].status === ActivityStatus.DONE) {
			sumDoneActivities += 1;

			if (flagFirstDone) {
				firstDoneActivity = i;

				flagFirstDone = false;
			}
		}
	}

	if (sumDoneActivities === 0) {
		habit.goalRate = { level: 0, value: 0 };
	} else {
		const daysToCount = activities.length - firstDoneActivity;
		const rate = sumDoneActivities / daysToCount;

		const level = GOAL_RATE_LEVELS.findIndex((threshold) => rate < threshold);

		habit.goalRate = { level: level + 1, value: rate };
	}

	return habit;
}

function computeShowGroup(habits: Habit[], groupOfHabits: GroupOfHabits): GroupOfHabits {
	const { habitsIds: habitsGroup } = groupOfHabits;

	let show = false;

	habitsGroup.map((habitID) => {
		const h = habits.find((h) => habitID === h._id);

		if (h?.show) {
			show = true;
		}
	});

	groupOfHabits.show = show;

	return groupOfHabits;
}

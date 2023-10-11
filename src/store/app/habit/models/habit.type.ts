import { Activity } from "../../activity/models/activity.type";

export type Habit = {
	_id: string;
	name: string;
	description: string;
	periodInDays: number;
	activities: Activity[];
	score: number;
	show: boolean;
};

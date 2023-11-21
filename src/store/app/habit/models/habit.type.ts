import { Activity } from "../../activity/models/activity.type";

export type Habit = {
	_id: string;
	activities: Activity[];
	description: string;
	name: string;
	periodInDays: number;
	score: number;
	show: boolean;
};

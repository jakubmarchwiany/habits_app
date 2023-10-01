import { Activity } from "../../activity/models/activity.type";

export type Habit = {
	_id: string;
	activities: Activity[];
	description: string;
	goalRate: { level: number; value: number };
	name: string;
	periodInDays: number;
	show: boolean;
};

import { Activity } from "store/models/activity";

export type Habit = {
    _id: string;
    activities: Activity[];
    description: string;
    name: string;
    periodInDays: number;
};

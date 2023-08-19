import { Activity } from "store/models/activity";

export type Habit = {
    _id: string;
    name: string;
    description: string;
    periodInDays: number;
    activities: IActivity[];
};

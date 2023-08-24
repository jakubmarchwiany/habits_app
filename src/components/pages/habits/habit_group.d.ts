import { Habit } from "store/models/habit";

export type habitGroupFull = { _id: string; name: string; habits: Habit[] };

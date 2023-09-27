import { habitGroupsFetch } from "components/pages/settings/habit_groups_manager/habit_groups";
import * as dayjs from "dayjs";
import { NavigateFunction } from "react-router-dom";
import { Activity } from "store/models/activity";
import { Habit } from "store/models/habit";
import { HabitGroup } from "store/models/habitGroup";
import { getFetch, postFetch } from "utils/fetches";
import { ENV } from "utils/validate_env";

import { appActions, UserData } from "./app-slice";
import { AppThunk } from "./index";

const { VITE_N_DAYS_FROM_TODAY } = ENV;

export const getHabitsAction =
    (setIsLogged: (arg0: boolean) => void, isMyHabits: boolean): AppThunk =>
    (appDispatch) => {
        const dateFrom = dayjs().startOf("day").subtract(VITE_N_DAYS_FROM_TODAY, "days");

        getFetch<{ data: UserData }>(
            `/user/get_habits?isUser=${isMyHabits}&dateFrom=${dateFrom.toString()}`,
            {
                customError: true
            }
        )
            .then(({ data }) => {
                data.habits = prepareHabits(data.habits);

                if (isMyHabits) {
                    appDispatch(appActions.setUserData(data));
                } else {
                    appDispatch(appActions.setDearData(data));
                }

                setIsLogged(true);
            })
            .catch(() => {
                setIsLogged(false);
            });
    };

const prepareHabits = (habits: Habit[]): Habit[] => {
    const subtractDate = dayjs().subtract(VITE_N_DAYS_FROM_TODAY, "day");

    return habits.map((habit) => {
        let index = 0;

        const activities = Array<Activity>(VITE_N_DAYS_FROM_TODAY);

        for (let i = 0; i < activities.length; i++) {
            const currentDate = subtractDate.add(i, "day");

            if (
                index < habit.activities.length &&
                dayjs(habit.activities[index].date).isSame(currentDate, "day")
            ) {
                activities[i] = {
                    _id: habit.activities[index]._id,
                    date: habit.activities[index].date.split("T")[0],
                    done: true
                };

                index += 1;
            } else {
                activities[i] = {
                    date: currentDate.format("YYYY-MM-DD"),
                    done: false
                };
            }
        }

        habit.activities = activities;

        return habit;
    });
};

export const createHabit =
    (
        name: string,
        description: string,
        periodInDays: number,
        navigate: NavigateFunction
    ): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: Habit }>({ description, name, periodInDays }, "/user/habit/create").then(
            ({ data }) => {
                data = prepareHabits([data])[0];

                appDispatch(appActions.createHabit(data));

                navigate("/settings?openGroupManager=true");
            }
        );
    };

export const editHabitAction =
    (_id: string, name: string, description: string, periodInDays: number): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: UserData }>(
            { _id, description, name, periodInDays },
            "/user/habit/edit"
        ).then(() => {
            appDispatch(appActions.editHabit({ _id, description, name, periodInDays }));
        });
    };

export const deleteHabitAction =
    (_id: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: UserData }>({ _id }, "/user/habit/delete").then(() => {
            appDispatch(appActions.deleteHabit({ _id }));
        });
    };

export const edithabitsOrderAction =
    (habitGroups: habitGroupsFetch[], navigate: NavigateFunction): AppThunk =>
    (appDispatch) => {
        console.log(habitGroups);

        postFetch<{ data: HabitGroup[] }>({ habitGroups }, "/user/habit/create_groups").then(
            ({ data }) => {
                console.log(data);

                appDispatch(appActions.editHabitsOrder(data));

                navigate("/");
            }
        );
    };

export const createActivityAction =
    (habitID: string, date: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: { activityID: string } }>(
            { date, habitID },
            "/user/habit/activity/create"
        ).then(({ data }) => {
            const { activityID } = data;

            appDispatch(appActions.addActivity({ activityID, date, habitID }));
        });
    };

export const deleteActivityAction =
    (habitID: string, activityID: string): AppThunk =>
    (appDispatch) => {
        postFetch<never>({ _id: activityID }, "/user/habit/activity/delete").then(() => {
            appDispatch(appActions.deleteActivity({ activityID, habitID }));
        });
    };

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-types */

import { NavigateFunction } from "react-router-dom";
import { getFetch, postFetch } from "utils/fetches";
import { AppThunk } from "./index";
import { UserData, appActions } from "./app-slice";
import { Habit } from "store/models/habit";
import { habitGroupsFetch } from "components/pages/settings/habit_groups_manager/habit_groups";
import { HabitGroup } from "store/models/habitGroup";
import dayjs from "dayjs";
import { Activity } from "store/models/activity";

const { VITE_DAYS_TO_SHOW } = import.meta.env;

export const getHabitsAction =
    (setIsLogged: Function | undefined, getMyHabits: boolean): AppThunk =>
    (appDispatch) => {
        getFetch<{ data: UserData }>(
            `/user/get_habits?days=${VITE_DAYS_TO_SHOW}&isUser=${getMyHabits}`,
            {
                customError: true,
            }
        )
            .then(({ data }) => {
                data.habits = prepareHabits(data.habits);

                if (getMyHabits) {
                    appDispatch(appActions.setUserData(data));
                } else {
                    appDispatch(appActions.setDearData(data));
                }
                setIsLogged && setIsLogged(true);
            })
            .catch((e) => {
                console.log(e);
                setIsLogged && setIsLogged(false);
            });
    };

const prepareHabits = (habits: Habit[]) => {
    const subtractDate = dayjs().subtract(parseInt(VITE_DAYS_TO_SHOW) - 1, "day");
    return habits.map((habit) => {
        let index = 0;

        const activities = Array<Activity>(parseInt(VITE_DAYS_TO_SHOW));
        for (let i = 0; i < activities.length; i++) {
            const currentDate = subtractDate.add(i, "day");

            if (
                index < habit.activities.length &&
                dayjs(habit.activities[index].date).isSame(currentDate, "day")
            ) {
                activities[i] = {
                    date: habit.activities[index].date.split("T")[0],
                    _id: habit.activities[index]._id,
                    done: true,
                };
                index += 1;
            } else {
                activities[i] = {
                    date: currentDate.format("YYYY-MM-DD"),
                    done: false,
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
        postFetch<{ data: Habit }>({ name, description, periodInDays }, "/user/habit/create").then(
            ({ data }) => {
                appDispatch(appActions.createHabit(data));
                navigate("/");
            }
        );
    };

export const editHabitNameAction =
    (id: string, newName: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: UserData }>({ id, newName }, "/user/habit/edit_name").then(() => {
            appDispatch(appActions.editHabitName({ id, newName }));
        });
    };

export const deleteHabitAction =
    (id: string): AppThunk =>
    (appDispatch) => {
        console.log(id);
        postFetch<{ data: UserData }>({ id }, "/user/habit/delete").then(() => {
            appDispatch(appActions.deleteHabit({ id }));
        });
    };

export const edithabitsOrderAction =
    (habitGroups: habitGroupsFetch[]): AppThunk =>
    (appDispatch) => {
        console.log(habitGroups);
        postFetch<{ data: HabitGroup[] }>({ habitGroups }, "/user/habit/create_groups").then(
            ({ data }) => {
                console.log(data);
                appDispatch(appActions.editHabitsOrder(data));
            }
        );
    };

export const createActivityAction =
    (habitID: string, date: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: { activityID: string } }>(
            { habitID, date },
            "/user/habit/activity/create"
        ).then(({ data }) => {
            const { activityID } = data;
            appDispatch(appActions.addActivity({ habitID, activityID, date }));
        });
    };

export const deleteActivityAction =
    (habitID: string, activityID: string): AppThunk =>
    (appDispatch) => {
        postFetch<never>({ id: activityID }, "/user/habit/activity/delete").then(() => {
            appDispatch(appActions.deleteActivity({ habitID, activityID }));
        });
    };

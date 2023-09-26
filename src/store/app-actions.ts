/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-types */

import { habitGroupsFetch } from "components/pages/settings/habit_groups_manager/habit_groups";
import * as dayjs from "dayjs";
import { NavigateFunction } from "react-router-dom";
import { Activity } from "store/models/activity";
import { Habit } from "store/models/habit";
import { HabitGroup } from "store/models/habitGroup";
import { getFetch, postFetch } from "utils/fetches";
import { ENV } from "utils/validate_env";
import { UserData, appActions } from "./app-slice";
import { AppThunk } from "./index";

const { VITE_N_DAYS_FROM_TODAY } = ENV;

export const getHabitsAction =
    (setIsLogged: Function | undefined, isMyHabits: boolean): AppThunk =>
    (appDispatch) => {
        const dateFrom = dayjs().startOf("day").subtract(VITE_N_DAYS_FROM_TODAY, "days");

        getFetch<{ data: UserData }>(`/user/get_habits?isUser=${isMyHabits}&dateFrom=${dateFrom}`, {
            customError: true
        })
            .then(({ data }) => {
                data.habits = prepareHabits(data.habits);

                if (isMyHabits) {
                    appDispatch(appActions.setUserData(data));
                } else {
                    appDispatch(appActions.setDearData(data));
                }
                setIsLogged && setIsLogged(true);
            })
            .catch((e) => {
                setIsLogged && setIsLogged(false);
            });
    };

const prepareHabits = (habits: Habit[]) => {
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
                    date: habit.activities[index].date.split("T")[0],
                    _id: habit.activities[index]._id,
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
        postFetch<{ data: Habit }>({ name, description, periodInDays }, "/user/habit/create").then(
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
            { _id, name, description, periodInDays },
            "/user/habit/edit"
        ).then(() => {
            appDispatch(appActions.editHabit({ _id, name, description, periodInDays }));
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
        postFetch<never>({ _id: activityID }, "/user/habit/activity/delete").then(() => {
            appDispatch(appActions.deleteActivity({ habitID, activityID }));
        });
    };

/* eslint-disable @typescript-eslint/ban-types */

import { NavigateFunction } from "react-router-dom";
import { getFetch, postFetch } from "utils/fetches";
import { AppThunk } from "./index";
import { UserData, appActions } from "./app-slice";
import { Habit } from "store/models/habit";
import { habitGroupsFetch } from "components/pages/settings/habit_groups_manager/habit_groups";
import { HabitGroup } from "store/models/habitGroup";

const { DAYS_TO_SHOW } = import.meta.env;

export const getUserDataAction =
    (setIsLogged: Function | undefined, isUser: boolean): AppThunk =>
    (appDispatch) => {
        getFetch<{ data: UserData }>(
            `/user/get_habits?days=${parseInt(DAYS_TO_SHOW) / 2}&isUser=${isUser}`,
            {
                customError: true,
            }
        )
            .then(({ data }) => {
                // console.log(data)
                if (isUser) {
                    appDispatch(appActions.setUserData(data));
                } else {
                    appDispatch(appActions.setDearData(data));
                }
                setIsLogged && setIsLogged(true);
            })
            .catch((e) => {
                console.log(e);
                setIsLogged && setIsLogged(true);
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
        postFetch<{ data: HabitGroup[] }>({ habitGroups }, "/user/habit/create_groups").then(({data}) => {
            console.log(data)
            appDispatch(appActions.editHabitsOrder(data));
        });
    };

export const addActivityAction =
    (habitID: string, date: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: { activityID: string } }>(
            { habitID, date },
            "/user/habit/activity/add"
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

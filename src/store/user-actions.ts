/* eslint-disable @typescript-eslint/ban-types */

import { NavigateFunction } from "react-router-dom";
import { getFetch, postFetch } from "utils/fetches";
import { AppThunk } from "./index";
import { UserData, userActions } from "./user-slice";
import { Habit } from "store/models/habit";

export const getUserDataAction =
    (setIsLogged: Function): AppThunk =>
    (appDispatch) => {
        getFetch<{ data: [UserData, UserData] }>("/auth/get_user_data", {
            customError: true,
        })
            .then(({ data }) => {
                appDispatch(userActions.setUserData(data));
                setIsLogged(true);
            })
            .catch((e) => {
                console.log(e);
                setIsLogged(false);
            });
    };

export const createHabit =
    (name: string, navigate: NavigateFunction): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: Habit }>({ name }, "/user/habit/create").then(({ data }) => {
            appDispatch(userActions.createHabit(data));
            navigate("/");
        });
    };

export const editHabitNameAction =
    (id: string, newName: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: UserData }>({ id, newName }, "/user/habit/edit_name").then(() => {
            appDispatch(userActions.editHabitName({ id, newName }));
        });
    };

export const deleteHabitAction =
    (id: string): AppThunk =>
    (appDispatch) => {
        console.log(id);
        postFetch<{ data: UserData }>({ id }, "/user/habit/delete").then(() => {
            appDispatch(userActions.deleteHabit({ id }));
        });
    };

export const edithabitsOrderAction =
    (habitsID: string[]): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: UserData }>({ habitsID }, "/user/habit/edit_order").then(() => {
            appDispatch(userActions.editHabitsOrder({ habitsID }));
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
            appDispatch(userActions.addActivity({ habitID, activityID, date }));
        });
    };

export const deleteActivityAction =
    (habitID: string, activityID: string): AppThunk =>
    (appDispatch) => {
        postFetch<never>({ id: activityID }, "/user/habit/activity/delete").then(() => {
            appDispatch(userActions.deleteActivity({ habitID, activityID }));
        });
    };

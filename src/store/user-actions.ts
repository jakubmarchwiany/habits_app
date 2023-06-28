/* eslint-disable @typescript-eslint/ban-types */

import { getFetch, postFetch } from "utils/fetches";
import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "./index";
import { Habit, UserData, userActions } from "./user-slice";

export const getUserDataAction =
    (setIsLogged: Function): AppThunk =>
    (appDispatch) => {
        getFetch<{ data: [UserData, UserData] }>("/user/data", {
            customError: true,
        })
            .then(({ data }) => {
                appDispatch(userActions.setUserData(data));
                setIsLogged(true);
            })
            .catch((e) => {
                console.log(e)
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
        console.log(id)
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
    (id: string, date: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: UserData }>({ id, date }, "/user/habit/activity/add").then(() => {
            appDispatch(userActions.addActivity({ id, date }));
        });
    };

export const deleteActivityAction =
    (id: string, date: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: UserData }>({ id, date }, "/user/habit/activity/delete").then(() => {
            appDispatch(userActions.deleteActivity({ id, date }));
        });
    };

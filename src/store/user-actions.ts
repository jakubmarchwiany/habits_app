/* eslint-disable @typescript-eslint/ban-types */

import { getFetch, postFetch } from "components/utils/fetches";
import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "./index";
import { Habit, UserData, userActions } from "./user-slice";

export const getUserDataAction =
    (setIsLogged: Function): AppThunk =>
    (appDispatch) => {
        getFetch<{ data: UserData }>("/user/data", {
            customError: true,
        })
            .then(({ data }) => {
                appDispatch(userActions.setUserData(data));
                setIsLogged(true);
            })
            .catch(() => {
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

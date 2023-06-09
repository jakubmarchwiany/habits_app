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
        }).then(({ data }) => {
            appDispatch(userActions.setUserData(data));
            setIsLogged(true);
        });
    };

export const createHabit =
    (name: string, navigate: NavigateFunction): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: Habit }>({ name }, "/user/habit/create", {
            customError: true,
        }).then(({ data }) => {
            appDispatch(userActions.createHabit(data));
            navigate("/");
        });
    };

export const addActivityAction =
    (habitName: string, date: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: UserData }>({ habitName, date }, "/user/habit/activity/add", {
            customError: true,
        }).then(() => {
            console.log("elo");
        });
    };

export const deleteActivityAction =
    (habitName: string, date: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ data: UserData }>({ habitName, date }, "/user/habit/activity/delete", {
            customError: true,
        }).then(() => {
            console.log("elo");
        });
    };

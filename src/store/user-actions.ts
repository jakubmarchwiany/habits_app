/* eslint-disable @typescript-eslint/ban-types */

import { getFetch } from "components/utils/fetches";
import { AppThunk } from "./index";
import { UserData, userActions } from "./user-slice";

export const getUserData =
    (setIsLogged: Function): AppThunk =>
    (appDispatch) => {
        getFetch<{ data: UserData }>("/user/data", {
            customError: true,
        }).then(({ data }) => {
            appDispatch(userActions.setUserData(data));
            setIsLogged(true);
        });
    };

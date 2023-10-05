import { AppThunk } from "store";
import { dearActions } from "store/dear/dear.slice";
import { getFetch } from "utils/fetches";

import { appActions } from "./app.slice";

export const autoLogin =
	(setIsLogged: (arg0: boolean) => void): AppThunk =>
	(appDispatch) => {
		getFetch<{ data: { userId: string; dearId: string } }>(`/auth/auto_login`, {
			customError: true
		})
			.then(({ data }) => {
				const { userId, dearId } = data;

				appDispatch(appActions.setUserId(userId));

				appDispatch(dearActions.setDearId(dearId));

				setIsLogged(true);
			})
			.catch(() => {
				setIsLogged(false);
			});
	};

export function getShowAllHabits(): boolean {
	const showAllHabits = localStorage.getItem("showAllHabits");

	if (showAllHabits !== null) {
		return Boolean(JSON.parse(showAllHabits));
	} else {
		return false;
	}
}

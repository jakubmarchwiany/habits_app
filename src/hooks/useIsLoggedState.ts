import { useAppDispatch } from "hooks/redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { autoLogin } from "store/app/app.actions";

export function useStateIsLogged(): [boolean | undefined] {
	const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (Cookies.get("authorization") !== undefined) {
			dispatch(autoLogin(setIsLogged));
		} else {
			toast.error("Zaloguj się", { duration: 2000 });

			setIsLogged(false);
		}
	}, []);

	return [isLogged];
}

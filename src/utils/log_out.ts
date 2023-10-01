import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { sleeper } from "utils/sleeper";

export async function authorizationFail(): Promise<void> {
	toast.error("Zaloguj się ponownie", { duration: 3000 });

	await sleeper(2);

	deleteCookieAndRefresh();
}

export function deleteCookieAndRefresh(): void {
	Cookies.remove("authorization");

	window.location.href = "/";
}

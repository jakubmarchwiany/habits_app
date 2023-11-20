import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { deleteCookieAndRefresh } from "utils/log_out";
import { sleep } from "utils/sleep";

export function Logout(): JSX.Element {
	const logout = async (): Promise<void> => {
		toast.success("Wylogowano pomyślnie");

		await sleep(500);

		deleteCookieAndRefresh();
	};

	return (
		<Button
			color="error"
			variant="contained"
			onClick={logout}
			sx={{ mt: 0.5, alignSelf: "center" }}
			fullWidth
		>
			Wyloguj się
		</Button>
	);
}

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
			fullWidth
			onClick={logout}
			sx={{ alignSelf: "center", mt: 0.5 }}
			variant="contained"
		>
			Wyloguj się
		</Button>
	);
}

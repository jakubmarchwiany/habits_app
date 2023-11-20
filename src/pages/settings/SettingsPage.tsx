import { Button, Stack, Typography } from "@mui/material";
import { standardSize } from "assets/theme";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteCookieAndRefresh } from "utils/log_out";
import { sleep } from "utils/sleep";

import { ColorThemeSettings } from "./components/ColorThemeSettings";

export function SettingsPage(): JSX.Element {
	const navigate = useNavigate();

	const logout = async (): Promise<void> => {
		toast.success("Wylogowano pomyślnie");

		await sleep(500);

		deleteCookieAndRefresh();
	};

	return (
		<Stack
			component="main"
			sx={{
				pt: { xs: 1, sm: 2 },
				pb: "15vh"
			}}
			alignItems="center"
		>
			<Stack width={standardSize}>
				<Typography typography="h2" textAlign={"center"} sx={{ py: { xs: 1, md: 3 } }}>
					Ustawienia
				</Typography>

				<ColorThemeSettings />

				<Button
					variant="contained"
					onClick={(): void => {
						navigate("/settings/groupsOfHabitsManager");
					}}
					sx={{ mt: 0.5, alignSelf: "center" }}
					fullWidth
				>
					Zarządzaj grupami
				</Button>

				<Button
					color="error"
					variant="contained"
					onClick={logout}
					sx={{ mt: 0.5, alignSelf: "center" }}
					fullWidth
				>
					Wyloguj się
				</Button>
			</Stack>
		</Stack>
	);
}

import { Button, Stack, Typography } from "@mui/material";
import { standardSize } from "assets/theme";
import { useNavigate } from "react-router-dom";

import { ColorThemeSettings } from "./components/ColorThemeSettings";
import { Logout } from "./components/Logout";

export function SettingsPage(): JSX.Element {
	const navigate = useNavigate();

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

				<Logout />
			</Stack>
		</Stack>
	);
}

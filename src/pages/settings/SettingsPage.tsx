import { AllInbox, PublishedWithChanges } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { standardSize } from "assets/theme";
import { MyLinkButton } from "components/my/MyLinkButton";
import { useNavigate } from "react-router-dom";

import { ColorThemeSettings } from "./components/ColorThemeSettings";
import { Logout } from "./components/Logout";

export function SettingsPage(): JSX.Element {
	const navigate = useNavigate();

	return (
		<Stack
			alignItems="center"
			component="main"
			sx={{
				pt: { xs: 1, sm: 2 },
				pb: "15vh"
			}}
		>
			<Stack width={standardSize}>
				<Typography sx={{ py: { xs: 1, md: 3 } }} textAlign={"center"} typography="h2">
					Ustawienia
				</Typography>

				<ColorThemeSettings />

				<MyLinkButton
					startIcon={<PublishedWithChanges />}
					sx={{ mt: 0.5 }}
					text="Zarządzaj nawykami"
					to="/"
				/>

				<MyLinkButton
					startIcon={<AllInbox />}
					sx={{ mt: 0.5 }}
					text="Zarządzaj grupami"
					to="groups-of-habits-manager"
				/>

				<Logout />
			</Stack>
		</Stack>
	);
}

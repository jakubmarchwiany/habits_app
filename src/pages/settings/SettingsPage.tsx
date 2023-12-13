import { AllInbox, PublishedWithChanges } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { standardSize } from "assets/theme";
import { MyLinkButton } from "components/my/MyLinkButton";
import { PAGE } from "layouts/navigator/page";

import { ColorThemeSettings } from "./components/ColorThemeSettings";
import { Logout } from "./components/Logout";

export function SettingsPage(): JSX.Element {
	return (
		<Stack
			alignItems="center"
			component="main"
			sx={{
				pb: "15vh",
				pt: { sm: 2, xs: 1 }
			}}
		>
			<Stack width={standardSize}>
				<Typography sx={{ py: { md: 3, xs: 1 } }} textAlign="center" typography="h2">
					Ustawienia
				</Typography>

				<ColorThemeSettings />

				<MyLinkButton
					startIcon={<PublishedWithChanges />}
					sx={{ mt: 0.5 }}
					text="Zarządzaj nawykami"
					to={PAGE.SETTINGS_HABITS_MANAGER.path}
				/>

				<MyLinkButton
					startIcon={<AllInbox />}
					sx={{ mt: 0.5 }}
					text="Zarządzaj grupami"
					to={PAGE.SETTINGS_GROUPS_OF_HABITS_MANAGER.path}
				/>

				<Logout />
			</Stack>
		</Stack>
	);
}

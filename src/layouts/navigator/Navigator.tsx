import { MenuOpen } from "@mui/icons-material";
import { Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { NavigatorMenu } from "./components/NavigatorMenu";
import { ShowAllButton } from "./components/buttons/ShowAllButton";
import { ToggleHabitsButton } from "./components/buttons/ToggleHabitsButton";

export function Navigator(): JSX.Element {
	const [openDrawer, setOpenDrawer] = useState(false);

	const location = useLocation();

	return (
		<>
			{(location.pathname === "/habits" || location.pathname === "/dear/habits") && (
				<>
					<ToggleHabitsButton />

					<ShowAllButton />
				</>
			)}
			<IconButton
				onClick={(): void => {
					setOpenDrawer(true);
				}}
				sx={{
					position: "fixed",
					left: "1%",
					top: "1%",
					fontSize: "3rem",
					color: "white"
				}}
			>
				<MenuOpen fontSize="inherit" />
			</IconButton>

			<Drawer
				anchor="left"
				onClose={(): void => {
					setOpenDrawer(false);
				}}
				open={openDrawer}
			>
				<NavigatorMenu setOpenDrawer={setOpenDrawer} />
			</Drawer>
		</>
	);
}

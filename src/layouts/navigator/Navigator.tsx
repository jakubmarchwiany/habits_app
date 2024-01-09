import { MenuOpen } from "@mui/icons-material";
import { Drawer, IconButton } from "@mui/material";
import { useState } from "react";

import { NavigatorMenu } from "./components/NavigatorMenu";

export function Navigator(): JSX.Element {
	const [openDrawer, setOpenDrawer] = useState(false);

	return (
		<>
			<IconButton
				onClick={(): void => {
					setOpenDrawer(true);
				}}
				sx={{
					color: "white",
					fontSize: "3rem",
					left: "1%",
					position: "fixed",
					top: "1%"
				}}
			>
				<MenuOpen fontSize="inherit" />
			</IconButton>

			<Drawer
				PaperProps={{ sx: { backgroundColor: "background.default" } }}
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

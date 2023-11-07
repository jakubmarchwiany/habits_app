import { ArrowDropUp, PostAdd, PublishedWithChanges, Settings } from "@mui/icons-material";
import { Drawer, IconButton, List } from "@mui/material";
import { MyListItem } from "components/my/MyListItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ShowAllButton } from "./buttons/ShowAllButton";
import { ToggleHabitsButton } from "./buttons/ToggleHabitsButton";

const actions = [
	{ icon: <PublishedWithChanges />, text: "Nawyki", path: "/habits" },
	{ icon: <PostAdd />, text: "Stwórz nawyk", path: "/habits/create" },
	{ icon: <Settings />, text: "Ustawienia", path: "/settings" }
];

export function Navigator(): JSX.Element {
	const [openDrawer, setOpenDrawer] = useState(false);

	const navigate = useNavigate();

	return (
		<>
			{(location.pathname === "/habits" || location.pathname === "/dear/habits") && (
				<>
					<ToggleHabitsButton />

					<ShowAllButton />
				</>
			)}

			<IconButton
				aria-label="delete"
				size="small"
				onClick={(): void => {
					setOpenDrawer(true);
				}}
				sx={{
					position: "fixed",
					left: "50%",
					top: "95%",
					transform: "translate(-50%, -50%)",
					fontSize: "5rem",
					color: "white"
				}}
			>
				<ArrowDropUp fontSize="inherit" />
			</IconButton>
			<Drawer
				anchor="bottom"
				open={openDrawer}
				onClose={(): void => {
					setOpenDrawer(false);
				}}
			>
				<List>
					{actions.map((action) => (
						<MyListItem
							key={action.path}
							text={action.text}
							icon={action.icon}
							disabled={action.path === location.pathname}
							onClick={(): void => {
								setOpenDrawer(false);

								navigate(action.path);
							}}
						/>
					))}
				</List>
			</Drawer>
		</>
	);
}

import {
	ArrowDropUp,
	CheckBox,
	CheckBoxOutlineBlank,
	Favorite,
	PostAdd,
	PublishedWithChanges,
	Settings
} from "@mui/icons-material";
import { Drawer, IconButton, List } from "@mui/material";
import { MyListItem } from "components/my/MyListItem";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { appActions } from "store/app/app.slice";

const actions = [
	{ icon: <PublishedWithChanges />, text: "Nawyki", path: "/habits" },
	{ icon: <Favorite />, text: "Nawyki Bobcia", path: "/dear/habits" },
	{ icon: <PostAdd />, text: "Stwórz nawyk", path: "/habits/create" },
	{ icon: <Settings />, text: "Ustawienia", path: "/settings" }
];

export function Navigator(): JSX.Element {
	const [openDrawer, setOpenDrawer] = useState(false);

	const showAllHabits = useAppSelector((state) => state.app.showAllHabits);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<>
			<IconButton
				aria-label="delete"
				size="large"
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
					{(location.pathname === "/habits" || location.pathname === "/dear/habits") && (
						<MyListItem
							key={4}
							text={"Wszystkie"}
							icon={showAllHabits ? <CheckBox /> : <CheckBoxOutlineBlank />}
							onClick={(): void => {
								setOpenDrawer(false);

								dispatch(appActions.toggleShowAllHabits());
							}}
						/>
					)}
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

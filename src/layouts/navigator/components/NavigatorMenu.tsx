import { PublishedWithChanges, Settings } from "@mui/icons-material";
import { Box, Divider, List } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import { PAGE } from "../page";
import { NavigateButton } from "./NavigatorButton";

type Props = {
	setOpenDrawer: Dispatch<SetStateAction<boolean>>;
};

export function NavigatorMenu({ setOpenDrawer }: Props): JSX.Element {
	const navigate = useNavigate();

	const navigateAndClose = (to: string): void => {
		navigate(to);

		setOpenDrawer(false);
	};

	return (
		<Box role="presentation" sx={{ width: 225 }}>
			<List>
				<NavigateButton
					icon={<PublishedWithChanges />}
					onClick={(): void => navigateAndClose(PAGE.HABITS.path)}
					path={PAGE.HABITS.path}
					text="Nawyki"
				/>

				{/* <NavigateButton
					icon={<FavoriteBorder />}
					onClick={(): void => navigateAndClose(PAGE.DEAR_HABITS.path)}
					path={PAGE.DEAR_HABITS.path}
					sx={{ pl: 4, pt: "0px", pb: "0px" }}
					text="Bobcia"
				/>

				<NavigateButton
					icon={<FavoriteBorder />}
					onClick={(): void => navigateAndClose(PAGE.DEAR_HABITS.path)}
					path={PAGE.DEAR_HABITS.path}
					sx={{ pl: 4, pt: "0px", pb: "0px" }}
					text="Bobcia"
				/> */}

				<Divider sx={{ borderBottomWidth: 3 }} />

				<NavigateButton
					icon={<PublishedWithChanges />}
					onClick={(): void => navigateAndClose(PAGE.HABITS_CREATE.path)}
					path={PAGE.HABITS_CREATE.path}
					text="Stwórz nawyk"
				/>

				<Divider sx={{ borderBottomWidth: 3 }} />

				<NavigateButton
					icon={<Settings />}
					onClick={(): void => navigateAndClose(PAGE.SETTINGS.path)}
					path={PAGE.SETTINGS.path}
					text="Ustawienia"
				/>
			</List>
		</Box>
	);
}

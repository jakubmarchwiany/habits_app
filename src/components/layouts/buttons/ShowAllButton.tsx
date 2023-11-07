import { DateRange, Today } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAppSelector } from "hooks/redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { appActions } from "store/app/app.slice";

export function ShowAllButton(): JSX.Element {
	const showAllHabits = useAppSelector((state) => state.app.showAllHabits);

	const dispatch = useDispatch();

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent): void => {
			if (event.key == "a") {
				dispatch(appActions.toggleShowAllHabits());
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [location]);

	return (
		<IconButton
			aria-label="delete"
			size="small"
			onClick={(): void => {
				dispatch(appActions.toggleShowAllHabits());
			}}
			sx={{
				position: "fixed",
				left: "1%",
				top: "1%",
				fontSize: "2.5rem",
				color: "white"
			}}
		>
			{showAllHabits ? <DateRange fontSize="inherit" /> : <Today fontSize="inherit" />}
		</IconButton>
	);
}

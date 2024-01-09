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
			if (event.key == "z") {
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
			onClick={(): void => {
				dispatch(appActions.toggleShowAllHabits());
			}}
			size="small"
			sx={{
				color: "white",
				fontSize: "3rem",
				position: "fixed",
				right: "5px",
				top: "1%",
				zIndex: 999
			}}
		>
			{showAllHabits ? <DateRange fontSize="inherit" /> : <Today fontSize="inherit" />}
		</IconButton>
	);
}

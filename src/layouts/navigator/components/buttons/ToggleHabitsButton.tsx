import { FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ToggleHabitsButton(): JSX.Element {
	const navigate = useNavigate();

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent): void => {
			if (event.key == "x") {
				if (location.pathname == "/habits") {
					navigate("/dear/habits");
				} else {
					navigate("/habits");
				}
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
				if (location.pathname === "/habits") {
					navigate("/dear/habits");
				} else {
					navigate("/habits");
				}
			}}
			onKeyDown={(e): void => {
				console.log(e.code);
			}}
			size="small"
			sx={{
				color: location.pathname === "/habits" ? "primary.main" : "#F377E4",
				fontSize: "3rem",
				position: "fixed",
				right: "60px",
				top: "1%",
				zIndex: 999
			}}
		>
			<FavoriteBorder fontSize="inherit" />
		</IconButton>
	);
}

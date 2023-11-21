import { Container, Link as MuiLink, Typography } from "@mui/material";
import { useNavigate, useRouteError } from "react-router-dom";

export function ErrorPage(): JSX.Element {
	const error = useRouteError();

	let message = undefined;

	if (error instanceof Error) {
		message = error.message;
	}

	const navigate = useNavigate();

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				minWidth: "100vw",
				color: "gray"
			}}
		>
			<Typography sx={{ typography: { xs: "h3", md: "h2" } }} textAlign="center">
				Ups...
			</Typography>
			<Typography
				sx={{ typography: { xs: "h6", md: "h5" }, color: "red", mt: { xs: 1, md: 2 } }}
				textAlign="center"
			>
				{message !== undefined ? `"${message}"` : "Coś poszło nie tak"}
			</Typography>

			<MuiLink
				component="button"
				onClick={(): void => {
					navigate(-1);
				}}
				sx={{ typography: { xs: "h6", md: "h4" }, mt: { xs: 2, md: 5 } }}
				variant="body2"
			>
				Wróć do poprzedniej strony
			</MuiLink>

			<MuiLink
				component="button"
				onClick={(): void => {
					navigate("/");
				}}
				sx={{ typography: { xs: "h6", md: "h4" }, mt: { xs: 2, md: 5 }, mb: "20%" }}
				variant="body2"
			>
				Wróć do strony głównej
			</MuiLink>
		</Container>
	);
}

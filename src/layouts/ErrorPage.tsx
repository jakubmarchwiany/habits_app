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
				alignItems: "center",
				color: "gray",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				minHeight: "100vh",
				minWidth: "100vw"
			}}
		>
			<Typography sx={{ typography: { md: "h2", xs: "h3" } }} textAlign="center">
				Ups...
			</Typography>
			<Typography
				sx={{ color: "red", mt: { md: 2, xs: 1 }, typography: { md: "h5", xs: "h6" } }}
				textAlign="center"
			>
				{message !== undefined ? `"${message}"` : "Coś poszło nie tak"}
			</Typography>

			<MuiLink
				component="button"
				onClick={(): void => {
					navigate(-1);
				}}
				sx={{ mt: { md: 5, xs: 2 }, typography: { md: "h4", xs: "h6" } }}
				variant="body2"
			>
				Wróć do poprzedniej strony
			</MuiLink>

			<MuiLink
				component="button"
				onClick={(): void => {
					navigate("/");
				}}
				sx={{ mb: "20%", mt: { md: 5, xs: 2 }, typography: { md: "h4", xs: "h6" } }}
				variant="body2"
			>
				Wróć do strony głównej
			</MuiLink>
		</Container>
	);
}

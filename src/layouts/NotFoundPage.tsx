import { Button, Container, Link as MuiLink, Typography } from "@mui/material";
import { MyLinkButton } from "components/my/MyLinkButton";
import { Link, useNavigate } from "react-router-dom";

export function NotFoundPage(): JSX.Element {
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
			<Typography sx={{ typography: { md: "h2", xs: "h4" } }} textAlign="center">
				Nie znaleziono strony
			</Typography>
			<Typography mt={2} sx={{ typography: { md: "h4", xs: "h6" } }} textAlign="center">
				Ups! Strona, której szukasz, nie została znaleziona.
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

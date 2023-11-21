import { Button, Container, Link as MuiLink, Typography } from "@mui/material";
import { MyLinkButton } from "components/my/MyLinkButton";
import { Link, useNavigate } from "react-router-dom";

export function NotFoundPage(): JSX.Element {
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
			<Typography sx={{ typography: { xs: "h4", md: "h2" } }} textAlign="center">
				Nie znaleziono strony
			</Typography>
			<Typography mt={2} sx={{ typography: { xs: "h6", md: "h4" } }} textAlign="center">
				Ups! Strona, której szukasz, nie została znaleziona.
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

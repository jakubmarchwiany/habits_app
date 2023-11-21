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
			<Typography textAlign="center" sx={{ typography: { xs: "h4", md: "h2" } }}>
				Nie znaleziono strony
			</Typography>
			<Typography textAlign="center" mt={2} sx={{ typography: { xs: "h6", md: "h4" } }}>
				Ups! Strona, której szukasz, nie została znaleziona.
			</Typography>

			<MuiLink
				component="button"
				variant="body2"
				onClick={(): void => {
					navigate(-1);
				}}
				sx={{ typography: { xs: "h6", md: "h4" }, mt: { xs: 2, md: 5 } }}
			>
				Wróć do poprzedniej strony
			</MuiLink>

			<MuiLink
				component="button"
				variant="body2"
				onClick={(): void => {
					navigate("/");
				}}
				sx={{ typography: { xs: "h6", md: "h4" }, mt: { xs: 2, md: 5 }, mb: "20%" }}
			>
				Wróć do strony głównej
			</MuiLink>
		</Container>
	);
}

import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function NotFoundPage(): JSX.Element {
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
			<Typography mb="20%" sx={{ typography: { xs: "h6", md: "h4" }, mt: { xs: 2, md: 5 } }}>
				<Link to="/" style={{ color: "white" }}>
					Wróć do strony głównej
				</Link>
			</Typography>
		</Container>
	);
}

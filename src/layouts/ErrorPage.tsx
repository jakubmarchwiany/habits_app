import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function ErrorPage(): JSX.Element {
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
				Coś poszło nie tak
			</Typography>

			<Typography mb="20%" sx={{ typography: { xs: "h6", md: "h4" }, mt: { xs: 2, md: 5 } }}>
				<Link style={{ color: "white" }} to="/">
					Wróć do strony głównej
				</Link>
			</Typography>
		</Container>
	);
}

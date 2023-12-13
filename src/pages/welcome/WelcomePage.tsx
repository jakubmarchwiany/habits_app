import { Box, CircularProgress, Container } from "@mui/material";

import { Login } from "./components/Login";

type Props = {
	isLogged: boolean | undefined;
};

export function WelcomePage({ isLogged }: Props): JSX.Element {
	return (
		<Container
			component="main"
			maxWidth={false}
			sx={{
				alignItems: "center",
				display: "flex",
				height: "100vh",
				justifyContent: "center"
			}}
		>
			{isLogged === undefined ? (
				<Box>
					<CircularProgress size="15vh" />
				</Box>
			) : (
				<Login />
			)}
		</Container>
	);
}

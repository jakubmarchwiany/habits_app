import { CircularProgress, Stack } from "@mui/material";

export function LoadingPage(): JSX.Element {
	return (
		<Stack
			component="main"
			sx={{
				alignItems: "center",
				height: "100vh",
				justifyContent: "center"
			}}
		>
			<CircularProgress size="15vh" />
		</Stack>
	);
}

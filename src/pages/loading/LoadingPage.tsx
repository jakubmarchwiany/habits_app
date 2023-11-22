import { CircularProgress, Stack } from "@mui/material";

export function LoadingPage(): JSX.Element {
	return (
		<Stack
			component="main"
			sx={{
				justifyContent: "center",
				alignItems: "center",
				height: "100vh"
			}}
		>
			<CircularProgress size="15vh" />
		</Stack>
	);
}

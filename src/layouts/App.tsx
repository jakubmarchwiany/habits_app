import { Stack, ThemeProvider } from "@mui/material";
import { useStateIsLogged } from "hooks/useIsLoggedState";
import { useThemeColor } from "hooks/useThemeColor";
import { Navigator } from "layouts/navigator/Navigator";
import { WelcomePage } from "pages/welcome/WelcomePage";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export function App(): JSX.Element {
	const [isLogged] = useStateIsLogged();
	const theme = useThemeColor();

	return (
		<ThemeProvider theme={theme}>
			{isLogged ? (
				<Stack bgcolor={"background.paper"} color="white">
					<Outlet />
					<Navigator />
				</Stack>
			) : (
				<WelcomePage isLogged={isLogged} />
			)}

			<Toaster
				gutter={10}
				position="top-left"
				reverseOrder
				toastOptions={{
					style: {
						background: theme.palette.background.default,
						color: theme.palette.primary.contrastText,
						maxWidth: "95vw"
					}
				}}
			/>
		</ThemeProvider>
	);
}

import { Stack, ThemeProvider } from "@mui/material";
import { Navigator } from "components/layouts/Navigator";
import { useStateIsLogged } from "hooks/useIsLoggedState";
import { useThemeColor } from "hooks/useThemeColor";
import { WelcomePage } from "pages/welcome/WelcomePage";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export function App(): JSX.Element {
	const [isLogged] = useStateIsLogged();
	const theme = useThemeColor();

	return (
		<ThemeProvider theme={theme}>
			{isLogged ? (
				<Stack color="white" bgcolor={"background.paper"}>
					<Outlet />
					<Navigator />
				</Stack>
			) : (
				<WelcomePage isLogged={isLogged} />
			)}

			<Toaster
				position="top-left"
				gutter={10}
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

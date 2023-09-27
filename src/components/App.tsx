import { Stack, ThemeProvider } from "@mui/material";
import { Navigator } from "components/layouts/Navigator";
import { LoadingPage } from "components/pages/loading_page/LoadingPage";
import { useStateIsLogged } from "hooks/useIsLoggedState";
import { useThemeColor } from "hooks/useThemeColor";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export function App(): JSX.Element {
    const [isLogged] = useStateIsLogged();
    const theme = useThemeColor();

    return (
        <ThemeProvider theme={theme}>
            {isLogged ? (
                <Stack
                    height="100%"
                    minHeight={"100vh"}
                    flexDirection="column"
                    color="primary.contrastText"
                    bgcolor={"background.paper"}
                >
                    <Outlet />
                    <Navigator />
                </Stack>
            ) : (
                <LoadingPage isLogged={isLogged} />
            )}

            <Toaster
                position="bottom-center"
                gutter={10}
                containerStyle={{ marginBottom: "40px" }}
                toastOptions={{
                    style: {
                        background: theme.palette.background.default,
                        color: theme.palette.primary.contrastText,
                        maxWidth: "100vw"
                    }
                }}
            />
        </ThemeProvider>
    );
}

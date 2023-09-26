import { Stack, ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { getTheme } from "assets/theme";
import Navigator from "components/layouts/Navigator";
import LoadingPage from "components/pages/loading_page/LoadingPage";
import dayjs from "dayjs";
import { useAppDispatch } from "hooks/redux";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { getHabitsAction } from "store/app-actions";

function App() {
    const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined);

    const dispatch = useAppDispatch();

    const theme = useMemo(() => {
        const color = localStorage.getItem("themeColor") || "#00AB5f";

        return responsiveFontSizes(createTheme(getTheme(color)));
    }, []);

    useEffect(() => {
        if (Cookies.get("authorization") !== undefined) {
            dispatch(getHabitsAction(setIsLogged, true));
        } else {
            setIsLogged(false);
        }
    }, []);

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
                        minWidth: "250px"
                    }
                }}
            />
        </ThemeProvider>
    );
}

export default App;

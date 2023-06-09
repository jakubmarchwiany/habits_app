import { Stack, ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { getDesignTokens } from "assets/theme";
import Navbar from "components/layouts/Navbar";
import LoadingPage from "components/pages/LoadingPage";
import { useAppDispatch } from "hooks/redux";
import useStateTheme from "hooks/use_state_theme";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { getUserDataAction } from "store/user-actions";

function App() {
    const [mode, setMode] = useStateTheme();
    const [isLogged, setIsLogged] = useState(false);

    const dispatch = useAppDispatch();

    const theme = useMemo(() => {
        return responsiveFontSizes(createTheme(getDesignTokens(mode)));
    }, [mode]);

    useEffect(() => {
        if (Cookies.get("authorization") !== undefined) {
            dispatch(getUserDataAction(setIsLogged));
        } else {
            toast.error("Zaloguj się ponownie", { duration: 3000 });
            setIsLogged(false);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {isLogged ? (
                <>
                    <Stack
                        height="100%"
                        minHeight={"100vh"}
                        flex={1}
                        flexGrow={1}
                        // display="flex"
                        flexDirection="column"
                        color="text.primary"
                        bgcolor={"background.paper"}
                    >
                        <Navbar switchMode={setMode} />
                        <Outlet />
                    </Stack>
                </>
            ) : (
                <LoadingPage />
            )}

            <Toaster
                position="bottom-center"
                gutter={10}
                containerStyle={{ marginBottom: "40px" }}
                toastOptions={{
                    style: {
                        background: theme.palette.background.default,
                        color: theme.palette.text.secondary,
                        minWidth: "250px",
                    },
                }}
            />
        </ThemeProvider>
    );
}

export default App;

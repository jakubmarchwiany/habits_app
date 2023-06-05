import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { getDesignTokens } from "assets/theme";
import Navbar from "components/layouts/Navbar";
import useStateTheme from "hooks/use_state_theme";

import { useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function App() {
    const [mode, setMode] = useStateTheme();

    const theme = useMemo(() => {
        return responsiveFontSizes(createTheme(getDesignTokens(mode)));
    }, [mode]);

    return (
        <ThemeProvider theme={theme}>
            <Navbar switchMode={setMode} />

            <Outlet />
            <Toaster
                position="bottom-center"
                gutter={10}
                // reverseOrder={true}
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

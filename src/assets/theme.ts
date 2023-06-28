import "@fontsource/source-sans-pro";
import { ThemeOptions } from "@mui/material";

export const getTheme = (color: string): ThemeOptions => ({
    palette: {
        primary: {
            main: color,
        },
        secondary: {
            main: "#fff",
        },
        text: {
            primary: "#fff",

        },
        background: {
            default: "#303030",
            paper: "#424242",
        },
        divider: "#D3D3D3",
    },
    typography: {
        fontFamily: ["-apple-system", "Source Sans Pro", "Roboto"].join(","),
        button: {
            textTransform: "none",
            fontSize: "18",
        },
    },
    components: {
        MuiTextField: {
            defaultProps: {
                inputProps: {
                    style: {
                        color: color,
                    },
                },
            },
        },
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 769,
            md: 1024,
            lg: 1216,
            xl: 1408,
        },
    },
});

//Light mode
// "50": "#e4f5fe",
// "100": "#bbe7fb",
// "200": "#92d8f7",
// "300": "#5dbee7",
// "500": "#5ab3de",
// "600": "#51a4ca",
// "700": "#4690af",
// "800": "#3d7c96",
// "900": "#2c5a69",

//Dark mode
// "50": "#e4f5fe",
// "100": "#bbe7fb",
// "200": "#92d8f7",
// "300": "#5dbee7",
// "500": "#5ab3de",
// "600": "#51a4ca",
// "700": "#4690af",
// "800": "#3d7c96",
// "900": "#2c5a69",

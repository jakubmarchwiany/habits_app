import "@fontsource/source-sans-pro";

import { ThemeOptions } from "@mui/material";

export const getTheme = (color: string): ThemeOptions => ({
    palette: {
        background: {
            default: "#303030",
            paper: "#424242"
        },
        divider: "#D3D3D3",
        primary: {
            main: color
        },
        secondary: {
            main: "#fff"
        },
        text: {
            primary: "#fff"
        }
    },
    typography: {
        button: {
            fontSize: "18",
            textTransform: "none"
        },
        fontFamily: ["-apple-system", "Source Sans Pro", "Roboto"].join(",")
    },
    components: {
        MuiTextField: {
            defaultProps: {
                InputLabelProps: {
                    style: {
                        color: "#fff"
                    }
                },
                inputProps: {
                    style: {
                        color: color
                    }
                }
            }
        }
    },
    breakpoints: {
        values: {
            lg: 1216,
            md: 1024,
            sm: 768,
            xl: 1408,
            xs: 0
        }
    }
});

export const standardSize = { lg: "55%", md: "70%", sm: "85%", xl: "40%", xs: "100%" };

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

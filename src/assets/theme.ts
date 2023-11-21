import "@fontsource/source-sans-pro";
import { ThemeOptions } from "@mui/material";

export const getTheme = (color: string): ThemeOptions => ({
	palette: {
		background: {
			default: "#242729",
			paper: "#323638"
		},
		// divider: "#555555",
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
						color
					}
				}
			}
		},
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: "#2c5a69"
				}
			}
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					fontSize: "1rem",
					maxWidth: "50vw"
				}
			}
		}
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 768,
			md: 1024,
			lg: 1216,
			xl: 1408
		}
	}
});

export const standardSize = { xs: "95%", sm: "50%", md: "40%", lg: "35%", xl: "25%" };
export const panelStandardSize = { xs: "95%", sm: "80%", md: "70%", lg: "60%", xl: "50%" };

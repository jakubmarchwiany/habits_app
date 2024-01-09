import "@fontsource/source-sans-pro";
import { ThemeOptions } from "@mui/material";

export const getTheme = (color: string): ThemeOptions => ({
	// breakpoints: {
	// 	values: {
	// 		lg: 1216,
	// 		md: 1024,
	// 		sm: 768,
	// 		xl: 1408,
	// 		xs: 0
	// 	}
	// },

	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: "#2c5a69"
				}
			}
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderBottomWidth: 3
				}
			}
		},
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
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					fontSize: "1rem",
					maxWidth: "50vw"
				}
			}
		}
	},
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
	}
});

export const standardSize = { lg: "35%", md: "40%", sm: "50%", xl: "25%", xs: "95%" };
export const panelStandardSize = { lg: "60%", md: "70%", sm: "80%", xl: "50%", xs: "95%" };

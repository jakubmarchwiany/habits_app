import { useMediaQuery, useTheme } from "@mui/material";

export function useNDaysToShow(): number {
	const theme = useTheme();

	let nDaysToShow: number;
	const isXs = useMediaQuery(theme.breakpoints.down("sm"));
	const isSm = useMediaQuery(theme.breakpoints.down("md"));
	const isMd = useMediaQuery(theme.breakpoints.down("lg"));

	if (isXs) {
		nDaysToShow = 3;
	} else if (isSm) {
		nDaysToShow = 6;
	} else if (isMd) {
		nDaysToShow = 9;
	} else {
		nDaysToShow = 15;
	}

	return nDaysToShow;
}

import { createTheme, responsiveFontSizes, Theme } from "@mui/material";
import { getTheme } from "assets/theme";
import { useMemo } from "react";

export function useThemeColor(): Theme {
    const theme = useMemo(() => {
        const color = localStorage.getItem("themeColor") || "#00AB5f";

        return responsiveFontSizes(createTheme(getTheme(color)));
    }, []);

    return theme;
}

import { useTheme } from "@emotion/react";
import { Box, Theme, Tooltip } from "@mui/material";
import dayjs from "dayjs";

type Props = {
    isDone: boolean;
    size?: string;
    date: dayjs.Dayjs;
    percentComplete: number;
    action: (date: string) => void;
};

function Day({ date, isDone, size = "2vh", action, percentComplete }: Props) {
    const theme = useTheme() as Theme;

    return (
        <Tooltip title={date.format("MM.DD")} onClick={() => action(date.format("YYYY-MM-DD"))}>
            <Box
                flex={1}
                width={size}
                height={size}
                boxShadow={5}
                borderRadius={1}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                    background: `linear-gradient(0deg,${theme.palette.primary.main} ${percentComplete}%,transparent ${percentComplete}%)`,
                }}
            ></Box>
        </Tooltip>
    );
}

export default Day;

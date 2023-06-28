import { MoreTime } from "@mui/icons-material";
import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Day from "components/pages/habits/Day";
import dayjs from "dayjs";
import { useAppSelector } from "hooks/redux";
import { useState } from "react";
import "./day.css";

type Props = {
    habitIndex: number;
};

function HabitPanel({ habitIndex }: Props) {
    const [nDays, setNDays] = useState(14);

    const theme = useTheme();

    const { name, _id: id, activities } = useAppSelector((state) => state.user.secondHabits[habitIndex]);

    const generateActivityDays = () => {
        const days = Array(nDays);
        const currentDate = dayjs();
        let index = activities.length - 1;

        for (let i = 0; i < nDays; i++) {
            const date = currentDate.subtract(i, "day");

            const isActivityDone =
                activities.length !== 0 &&
                index >= 0 &&
                date.isSame(dayjs(activities[index]), "day");

            const dayKey = `${id}-grid-${i}`;

            days[i] = (
                <div
                    key={dayKey}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Day
                        isDone={isActivityDone}
                        date={date}
                        key={dayKey + "day"}
                        color={theme.palette.primary.main}
                    />
                </div>
            );

            if (isActivityDone) {
                index--;
            }
        }
        return days.reverse();
    };

    const handleNDaysChange = () => {
        if (nDays === 14) {
            setNDays(42);
        } else {
            setNDays(14);
        }
    };

    return (
        <Stack py={2} px={1} boxShadow={5} sx={{ border: 1, borderRadius: 5, borderColor: "pink" }}>
            <Grid2 container mb={2}>
                <Grid2 xs={10} xsOffset={1}>
                    <Typography variant="h4" textAlign="center">
                        {name}
                    </Typography>
                </Grid2>
                <Grid2 xs={1} display={"flex"} justifyContent={"end"}>
                    <IconButton onClick={handleNDaysChange}>
                        <MoreTime
                            sx={{ color: nDays === 14 ? "white" : "primary.main" }}
                            fontSize="medium"
                        />
                    </IconButton>
                </Grid2>
            </Grid2>

            <div className="gridDays">{generateActivityDays()}</div>
        </Stack>
    );
}

export default HabitPanel;

import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Day from "components/pages/habits/Day";
import dayjs from "dayjs";
import { useAppSelector } from "hooks/redux";
import "./day.css";
import { useState } from "react";

type Props = {
    habitIndex: number;
};

function HabitPanel({ habitIndex }: Props) {
    const [nDays, setNDays] = useState(21);

    const theme = useTheme();
    const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));

    const { name, id, activities } = useAppSelector((state) => state.user.secondHabits[habitIndex]);

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

    return (
        <Stack py={2} px={1} boxShadow={5} sx={{ border: 1, borderRadius: 5, borderColor: "pink" }}>
            <Typography variant="h4" textAlign="center" mb={2}>
                {name}
            </Typography>

            <div className="gridDays">{generateActivityDays()}</div>
        </Stack>
    );
}

export default HabitPanel;

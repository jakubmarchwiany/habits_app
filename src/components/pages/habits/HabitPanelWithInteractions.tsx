/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MoreTime } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import Day from "components/pages/habits/Day";
import HabitSettings from "components/pages/habits/settings/HabitSettings";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useState } from "react";
import { addActivityAction, deleteActivityAction } from "store/app-actions";
import "./day.css";

type Props = {
    habitID: string;
};

const { VITE_N_DAYS } = import.meta.env;

function HabitPanelWithInteractions({ habitID }: Props) {
    const habit = useAppSelector((state) => {
        return state.app.myHabits.find((habit) => habit._id === habitID)!;
    });
    const [showMoreDays, setShowMoreDays] = useState<boolean>(false);
    
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const generateActivityDays = () => {
        const nDays = showMoreDays ? parseInt(VITE_N_DAYS) : parseInt(VITE_N_DAYS) / 2;

        const days = Array(nDays);
        const currentDate = dayjs();
        let index = habit.activities.length - 1;

        for (let i = 0; i < nDays; i++) {
            const date = currentDate.subtract(i, "day");

            const isActivityDone =
                habit!.activities.length !== 0 &&
                index >= 0 &&
                date.isSame(dayjs(habit.activities[index].date), "day");

            const dayKey = `${habitID}-grid-${i}`;

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
                        id={isActivityDone ? habit!.activities[index]._id : undefined}
                        isDone={isActivityDone}
                        date={date}
                        action={isActivityDone ? deleteActivity : addActivity}
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

    const addActivity = (date: string, id: string) => {
        dispatch(addActivityAction(habitID, date));
    };

    const deleteActivity = (date: string, id: string) => {
        dispatch(deleteActivityAction(habitID, id!));
    };

    return (
        <Stack
            px={{ xs: 0.5, md: 1 }}
            py={{ xs: 0, md: 1 }}
            pb={{ xs: 1, md: 2 }}
            boxShadow={5}
            sx={{ border: 2, borderRadius: 5, borderColor: "primary.main" }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <IconButton onClick={() => setShowMoreDays((prev) => !prev)} sx={{ p: 0 }}>
                    <MoreTime
                        sx={{
                            color: showMoreDays ? "primary.main" : "white",
                            fontSize: { xs: "1rem", md: "1.5rem" },
                        }}
                    />
                </IconButton>
                <Typography
                    textAlign="center"
                    sx={{ wordBreak: "break-word", typography: { xs: "h6", md: "h5" } }}
                >
                    {habit!.name}
                </Typography>
                <HabitSettings id={habitID} />
            </Box>

            <Box className="gridDays" mt={{ xs: "0%", md: "3%" }}>
                {generateActivityDays()}
            </Box>
        </Stack>
    );
}

export default HabitPanelWithInteractions;

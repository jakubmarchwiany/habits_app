/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MoreTime } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import confetti from "canvas-confetti";
import Day from "components/pages/habits/habitCard/Day";
import DayDone from "components/pages/habits/habitCard/DayDone";
import HabitSettings from "components/pages/habits/habitCard/settings/HabitSettings";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useState } from "react";
import { createActivityAction, deleteActivityAction } from "store/app-actions";
import "./day.css";

type Props = {
    habitID: string;
};

const { VITE_DAYS_TO_SHOW } = import.meta.env;

function HabitCardFull({ habitID }: Props) {
    const habit = useAppSelector((state) => {
        return state.app.myHabits.find((habit) => habit._id === habitID)!;
    });

    const [showMoreDays, setShowMoreDays] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const generateActivityDays = () => {
        // const nDays = showMoreDays ? parseInt(VITE_DAYS_TO_SHOW) : parseInt(VITE_DAYS_TO_SHOW) / 2;

        const days = habit.activities.map((activity, index) => {
            if (activity.done) {
                return (
                    <DayDone
                        key={habit.name + index}
                        _id={activity._id!}
                        date={activity.date}
                        deleteActivity={deleteActivity}
                    />
                );
            } else {
                return (
                    <Day
                        key={habit.name + index}
                        date={activity.date}
                        createActivity={createActivity}
                    />
                );
            }
        });

        return days;
    };

    const createActivity = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, date: string) => {
        confetti({
            particleCount: 20,
            startVelocity: 15,
            spread: 360,
            ticks: 75,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        });
        dispatch(createActivityAction(habitID, date));
    };

    const deleteActivity = (_id: string) => {
        dispatch(deleteActivityAction(habitID, _id));
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
                <HabitSettings id={habitID} name={habit.name} />
            </Box>

            <Box className="gridDays" mt={{ xs: "0%", md: "3%" }}>
                {generateActivityDays()}
            </Box>
        </Stack>
    );
}

export default HabitCardFull;

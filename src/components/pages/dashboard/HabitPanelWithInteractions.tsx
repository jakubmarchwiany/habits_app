import { MoreTime } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import Day from "components/pages/dashboard/Day";
import HabitSettings from "components/pages/dashboard/settings/HabitSettings";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useState } from "react";

import "./day.css";
import { addActivityAction, deleteActivityAction } from "store/app-actions";

type Props = {
    habitIndex: number;
};

const { VITE_N_DAYS } = import.meta.env;

function HabitPanelWithInteractions({ habitIndex }: Props) {
    const [isMoreDays, setIsMoreDays] = useState<boolean>(false);
    const theme = useTheme();

    const {
        name,
        _id: habitID,
        activities,
    } = useAppSelector((state) => state.app.userHabits[habitIndex]);

    const dispatch = useAppDispatch();

    const generateActivityDays = () => {
        const nDays = isMoreDays ? parseInt(VITE_N_DAYS) : parseInt(VITE_N_DAYS) / 2;

        const days = Array(nDays);
        const currentDate = dayjs();
        let index = activities.length - 1;

        for (let i = 0; i < nDays; i++) {
            const date = currentDate.subtract(i, "day");

            const isActivityDone =
                activities.length !== 0 &&
                index >= 0 &&
                date.isSame(dayjs(activities[index].date), "day");

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
                        id={isActivityDone ? activities[index]._id : undefined}
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
                <IconButton onClick={() => setIsMoreDays((prev) => !prev)} sx={{ p: 0 }}>
                    <MoreTime
                        sx={{
                            color: isMoreDays ? "primary.main" : "white",
                            fontSize: { xs: "1rem", md: "1.5rem" },
                        }}
                    />
                </IconButton>
                <Typography
                    textAlign="center"
                    sx={{ wordBreak: "break-word", typography: { xs: "h6", md: "h5" } }}
                >
                    {name}
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

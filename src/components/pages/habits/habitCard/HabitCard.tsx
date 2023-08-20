/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MoreTime } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useState } from "react";
import "./day.css";

const StyledDIV = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));

type Props = {
    habitID: string;
};

const { VITE_DAYS_TO_SHOW } = import.meta.env;

function HabitCard({ habitID }: Props) {
    const habit = useAppSelector((state) => {
        return state.app.dearHabits.find((habit) => habit._id === habitID)!;
    });

    const [showMoreDays, setShowMoreDays] = useState<boolean>(false);

    const generateActivityDays = () => {
        // const nDays = showMoreDays ? parseInt(VITE_DAYS_TO_SHOW) : parseInt(VITE_DAYS_TO_SHOW) / 2;

        const days = habit.activities.map((activity, index) => {
            if (activity.done) {
                return (
                    <StyledDIV
                        key={habit._id + index}
                        className={`day`}
                        data-tooltip={activity.date.slice(5)}
                    />
                );
            } else {
                return (
                    <div
                        key={habit._id + index}
                        className={`day`}
                        data-tooltip={activity.date.slice(5)}
                    />
                );
            }
        });

        return days;
    };

    return (
        <Stack
            px={{ xs: 0.5, md: 1 }}
            py={{ xs: 0, md: 1 }}
            pb={{ xs: 1, md: 2 }}
            boxShadow={5}
            sx={{ border: 2, borderRadius: 5, borderColor: "#FFB6C1" }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div />
                <Typography
                    textAlign="center"
                    sx={{ wordBreak: "break-word", typography: { xs: "h6", md: "h5" } }}
                >
                    {habit.name}
                </Typography>
                <IconButton onClick={() => setShowMoreDays((prev) => !prev)} sx={{ p: 0 }}>
                    <MoreTime
                        sx={{
                            color: showMoreDays ? "primary.main" : "white",
                            fontSize: { xs: "1rem", md: "1.5rem" },
                        }}
                    />
                </IconButton>
            </Box>

            <Box className="gridDays" mt={{ xs: "0%", md: "3%" }}>
                {generateActivityDays()}
            </Box>
        </Stack>
    );
}

export default HabitCard;

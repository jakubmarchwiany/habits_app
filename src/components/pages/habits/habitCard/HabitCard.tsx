/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MoreTime } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import "./day.css";
import GoalRate from "components/pages/habits/habitCard/GoalRate";

const StyledDIV = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));

type Props = {
    habitID: string;
};

function HabitCard({ habitID }: Props) {
    const habit = useAppSelector((state) => {
        return state.app.dearHabits.find((habit) => habit._id === habitID)!;
    });
    const [goalRate, setGoalRate] = useState<number>(0);

    const generateActivityDays = () => {
        const days = habit.activities.map((activity, index) => {
            if (activity.done) {
                return (
                    <StyledDIV
                        key={habit._id + index}
                        className={`day`}
                        sx={{ cursor: "default" }}
                        data-tooltip={activity.date.slice(5)}
                    />
                );
            } else {
                return (
                    <div
                        key={habit._id + index}
                        className={`day`}
                        style={{ cursor: "default" }}
                        data-tooltip={activity.date.slice(5)}
                    />
                );
            }
        });

        return days;
    };

    useEffect(() => {
        calculateGoalRate();
    }, [habit]);

    const calculateGoalRate = () => {
        let sumDone = 0;
        let sumAll = 0;
        let flag = false;
        habit.activities.map((a) => {
            if (a.done) {
                sumDone += 1;
                flag = true;
            }

            if (flag) {
                sumAll += 1;
            }
        });

        const rate = (sumDone / sumAll) * habit.periodInDays;
        setGoalRate(rate);
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
                <GoalRate rate={goalRate} />
            </Box>

            <Box className="gridDays" mt={{ xs: "0%", md: "3%" }}>
                {generateActivityDays()}
            </Box>
        </Stack>
    );
}

export default HabitCard;

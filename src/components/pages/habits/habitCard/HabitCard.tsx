/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Stack, Typography, styled } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import GoalRate from "components/pages/habits/habitCard/GoalRate";
import { useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import "./day.css";

const StyledDIV = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));

type Props = {
    habitID: string;
    flagIndex: number;
    setShowFlag: (index: number, value: boolean) => void;
};

function HabitCard({ habitID, flagIndex, setShowFlag }: Props) {
    const habit = useAppSelector((state) => {
        return state.app.dearHabits.find((habit) => habit._id === habitID)!;
    });
    const [goalRate, setGoalRate] = useState<number>(0);
    const [shouldDoToday, setShouldDoToday] = useState<boolean>(false);

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

        const lastActivity = habit.activities[habit.activities.length - 1];
        if (!lastActivity.done && shouldDoToday) {
            days[habit.activities.length - 1] = (
                <Box
                    key={`${habit.name}-${habit.activities.length - 1}`}
                    className={`day`}
                    data-tooltip={lastActivity.date.slice(5)}
                    sx={{
                        animation: "blink 2s infinite",
                        "@keyframes blink": {
                            "0%, 100%": {
                                backgroundColor: "",
                            },
                            "50%": {
                                backgroundColor: "primary.main",
                            },
                        },
                    }}
                />
            );
        }

        return days;
    };

    useEffect(() => {
        calculateGoalRate();
        calculateIsTodayToDo();
    }, [habit]);

    const calculateGoalRate = () => {
        let sumDone = 0;
        let sumAll = 0;

        for (const activity of habit.activities) {
            if (activity.done) {
                sumDone += 1;
                sumAll += 1;
            } else if (sumDone > 0) {
                sumAll += 1;
            }
        }

        const rate = sumDone > 0 ? (sumDone / sumAll) * habit.periodInDays : 1;
        setGoalRate(rate);
    };

    const calculateIsTodayToDo = () => {
        if (habit.activities[habit.activities.length - 1].done) {
            setShouldDoToday(false);
            setShowFlag(flagIndex, false);
        } else {
            const habitLength = habit.activities.length;
            const periodInDays = habit.periodInDays;

            for (let i = habitLength - 2; i >= habitLength - periodInDays; i--) {
                if (habit.activities[i].done) {
                    setShouldDoToday(false);
                    setShowFlag(flagIndex, false);

                    return;
                }
            }
            setShouldDoToday(true);
            setShowFlag(flagIndex, true);
        }
    };

    return (
        <Grid2 xs={12} md={3} key={"habit_panel_" + habit}>
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
                    <GoalRate rate={goalRate} />

                    <Typography
                        textAlign="center"
                        sx={{ wordBreak: "break-word", typography: { xs: "h6", md: "h5" } }}
                    >
                        {habit.name}
                    </Typography>
                    <div />
                </Box>

                <Box className="gridDays" mt={{ xs: "0%", md: "3%" }}>
                    {generateActivityDays()}
                </Box>
            </Stack>
        </Grid2>
    );
}

export default HabitCard;

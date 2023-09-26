/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "./day.css";

import { Box, Stack, Tooltip, Typography, Zoom } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import confetti from "canvas-confetti";
import Day from "components/pages/habits/habitCard/Day";
import DayDone from "components/pages/habits/habitCard/DayDone";
import GoalRate from "components/pages/habits/habitCard/GoalRate";
import HabitSettings from "components/pages/habits/habitCard/settings/HabitSettings";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import { createActivityAction, deleteActivityAction } from "store/app-actions";
import { Activity } from "store/models/activity";

type Props = {
    flagIndex: number;
    habitID: string;
    setShowFlag: (index: number, value: boolean) => void;
};

function HabitCardFull({ habitID, flagIndex, setShowFlag }: Props) {
    const [goalRate, setGoalRate] = useState<number>(0);
    const [shouldDoToday, setShouldDoToday] = useState<boolean>(false);
    const habit = useAppSelector((state) => {
        return state.app.myHabits.find((habit) => habit._id === habitID)!;
    });
    const showAllHabits = useAppSelector((state) => state.app.showAllHabits);

    const dispatch = useAppDispatch();

    const generateActivityDays = () => {
        const renderDayComponent = (activity: Activity, index: number) => {
            const CommonProps = {
                id: `${habit.name}-${index}`,
                key: `${habit.name}-${index}`,
                date: activity.date
            };

            if (activity.done) {
                return (
                    <DayDone {...CommonProps} _id={activity._id!} deleteActivity={deleteActivity} />
                );
            } else {
                return <Day {...CommonProps} createActivity={createActivity} />;
            }
        };

        const days = habit.activities.map((activity, index) => renderDayComponent(activity, index));
        console.log(days);
        const lastActivity = habit.activities[habit.activities.length - 1];
        if (!lastActivity.done && shouldDoToday) {
            days[habit.activities.length - 1] = (
                <Box
                    key={`${habit.name}-${habit.activities.length - 1}`}
                    onClick={(event) => createActivity(event, lastActivity.date)}
                    className={`day`}
                    data-tooltip={lastActivity.date.slice(5)}
                    sx={{
                        animation: "blink 2s infinite",
                        "@keyframes blink": {
                            "0%, 100%": {
                                backgroundColor: ""
                            },
                            "50%": {
                                backgroundColor: "primary.main"
                            }
                        }
                    }}
                />
            );
        }

        const activities = [...habit.activities];

        const dateLastDoneActivity = activities.reverse().findIndex((activity) => activity.done);

        if (
            dateLastDoneActivity === -1 ||
            dateLastDoneActivity === 0 ||
            dateLastDoneActivity === 1 ||
            dateLastDoneActivity - habit.periodInDays <= 0
        )
            return days;

        if (!activities[dateLastDoneActivity - habit.periodInDays].done) {
            const index = days.length - dateLastDoneActivity - 1 + habit.periodInDays;

            days[index] = (
                <Box
                    key={`${habit.name}-${index}`}
                    onClick={(event) => createActivity(event, habit.activities[index].date)}
                    className={`day`}
                    data-tooltip={habit.activities[index].date.slice(5)}
                    sx={{
                        animation: "blinkk 2s infinite",
                        "@keyframes blinkk": {
                            "0%, 100%": {
                                backgroundColor: ""
                            },
                            "50%": {
                                backgroundColor: "red"
                            }
                        }
                    }}
                />
            );
        }

        return days;
    };

    const createActivity = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, date: string) => {
        confetti({
            particleCount: 20,
            startVelocity: 15,
            spread: 360,
            ticks: 75,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
        });
        dispatch(createActivityAction(habitID, date));
    };

    const deleteActivity = (_id: string) => {
        dispatch(deleteActivityAction(habitID, _id));
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

    const show = showAllHabits ? true : shouldDoToday ? true : false;

    return (
        show && (
            <Grid2
                xs={12}
                md={3}
                key={"habit_panel_" + habit._id}
                sx={{ display: showAllHabits ? "" : shouldDoToday ? "" : "none" }}
            >
                <Stack
                    pt={{ xs: 1, md: 1 }}
                    boxShadow={5}
                    sx={{
                        border: 2,
                        borderRadius: 3,
                        borderColor: "primary.main"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            mx: 1,
                            alignItems: "center"
                        }}
                    >
                        <GoalRate rate={goalRate} />
                        <Tooltip
                            title={
                                <>
                                    <Typography variant="h6">Opis</Typography>
                                    <Typography variant="body1">{habit.description}</Typography>

                                    <Typography variant="h6">
                                        Powtarzany co {habit.periodInDays} dni
                                    </Typography>
                                </>
                            }
                            placement="top"
                            TransitionComponent={Zoom}
                            sx={{ fontSize: "50px" }}
                        >
                            <Typography
                                textAlign="center"
                                sx={{
                                    wordBreak: "break-word",
                                    typography: { xs: "h4", md: "h4" }
                                    // color: habit.activities.slice(-1)[0].done ? "primary.main" : "white",
                                }}
                            >
                                {habit.name}
                            </Typography>
                        </Tooltip>
                        <HabitSettings habit={habit} />
                    </Box>

                    <Box className="gridDays" mt={1}>
                        {generateActivityDays()}
                    </Box>
                </Stack>
            </Grid2>
        )
    );
}

export default HabitCardFull;

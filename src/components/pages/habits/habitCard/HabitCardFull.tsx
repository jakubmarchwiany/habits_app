/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Stack, Typography } from "@mui/material";
import confetti from "canvas-confetti";
import Day from "components/pages/habits/habitCard/Day";
import DayDone from "components/pages/habits/habitCard/DayDone";
import GoalRate from "components/pages/habits/habitCard/GoalRate";
import HabitSettings from "components/pages/habits/habitCard/settings/HabitSettings";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import { createActivityAction, deleteActivityAction } from "store/app-actions";
import "./day.css";
import { Activity } from "store/models/activity";

type Props = {
    habitID: string;
};

function HabitCardFull({ habitID }: Props) {
    const [goalRate, setGoalRate] = useState<number>(0);
    const [shouldDoToday, setShouldDoToday] = useState<boolean>(false);
    const habit = useAppSelector((state) => {
        return state.app.myHabits.find((habit) => habit._id === habitID)!;
    });

    const dispatch = useAppDispatch();

    const generateActivityDays = () => {
        const renderDayComponent = (activity: Activity, index: number) => {
            const CommonProps = {
                key: `${habit.name}-${index}`,
                date: activity.date,
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
        } else {
            const habitLength = habit.activities.length;
            const periodInDays = habit.periodInDays;

            for (let i = habitLength - 2; i >= habitLength - periodInDays; i--) {
                if (habit.activities[i].done) {
                    setShouldDoToday(false);
                    return;
                }
            }
            setShouldDoToday(true);
        }
    };

    return (
        <Stack
            px={{ xs: 0.5, md: 1 }}
            py={{ xs: 0, md: 1 }}
            pb={{ xs: 1, md: 2 }}
            boxShadow={5}
            sx={{
                border: 2,
                borderRadius: 5,
                borderColor: "primary.main",
            }}
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
                    sx={{
                        wordBreak: "break-word",
                        typography: { xs: "h6", md: "h5" },
                        // color: habit.activities.slice(-1)[0].done ? "primary.main" : "white",
                    }}
                >
                    {habit!.name}
                </Typography>

                <HabitSettings id={habitID} name={habit.name} />
            </Box>

            <Box className="gridDays" id={"grid-" + habit._id} mt={{ xs: "0%", md: "3%" }}>
                {generateActivityDays()}
            </Box>
        </Stack>
    );
}

export default HabitCardFull;

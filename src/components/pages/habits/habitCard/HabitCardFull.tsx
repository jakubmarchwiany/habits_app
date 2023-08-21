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
        const days: JSX.Element[] = [];
        for (let index = 0; index < habit.activities.length; index++) {
            const activity = habit.activities[index];
            if (activity.done) {
                days.push(
                    <DayDone
                        key={habit.name + index}
                        _id={activity._id!}
                        date={activity.date}
                        deleteActivity={deleteActivity}
                    />
                );
            } else {
                days.push(
                    <Day
                        key={habit.name + index}
                        date={activity.date}
                        createActivity={createActivity}
                    />
                );
            }
        }

        const lastActivity = habit.activities[habit.activities.length - 1];
        if (!lastActivity.done && shouldDoToday)
            days[habit.activities.length - 1] = (
                <Box
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

    const calculateIsTodayToDo = () => {
        const tmp = habit.activities.slice(habit.periodInDays).reverse();

        let flag = true;
        for (let i = 0; i < habit.periodInDays; i++) {
            if (tmp[i].done) flag = false;
        }

        setShouldDoToday(flag);
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

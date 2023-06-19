import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Day from "components/pages/habits/Day";
import HabitSettings from "components/pages/habits/HabitSettings";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useState } from "react";
import { addActivityAction, deleteActivityAction } from "store/user-actions";
import "./day.css";

type Props = {
    habitIndex: number;
};

function HabitPanelWithInteractions({ habitIndex }: Props) {
    const [nDays, setNDays] = useState(21);
    const theme = useTheme();
    const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));

    const { name, id, activities } = useAppSelector((state) => state.user.habits[habitIndex]);

    const dispatch = useAppDispatch();

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

    const addActivity = (date: string) => {
        dispatch(addActivityAction(id, date));
    };

    const deleteActivity = (date: string) => {
        dispatch(deleteActivityAction(id, date));
    };

    const handleNDaysChange = () => {
        if (nDays === 21) {
            setNDays(42);
        } else {
            setNDays(21);
        }
    };

    return (
        <Stack
            py={2}
            px={1}
            boxShadow={5}
            sx={{ border: 1, borderRadius: 5, borderColor: "primary.main" }}
        >
            <Grid2 container mb={2}>
                <Grid2 xs={10} xsOffset={1}>
                    <Typography variant="h4" textAlign="center">
                        {name}
                    </Typography>
                </Grid2>
                <Grid2 xs={1} display={"flex"} justifyContent={"end"}>
                    <HabitSettings id={id} nDays={nDays} changeNDays={handleNDaysChange} />
                </Grid2>
            </Grid2>

            <div className="gridDays">{generateActivityDays()}</div>
        </Stack>
    );
}

export default HabitPanelWithInteractions;

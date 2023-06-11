import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Day from "components/pages/dashboard/Day";
import HabitSettings from "components/pages/dashboard/HabitSettings";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { addActivityAction, deleteActivityAction } from "store/user-actions";
import "./day.css";

type Props = {
    habitIndex: number;
    isYours: boolean;
};

let DAY_TO_DISPLAY = 60;

function HabitPanel({ habitIndex, isYours }: Props) {
    const theme = useTheme();
    const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));

    if (greaterThanMid) {
        DAY_TO_DISPLAY = 60;
    } else {
        DAY_TO_DISPLAY = 30;
    }

    const { name, id, activities } = useAppSelector((state) => {
        if (isYours) {
            return state.user.habits[habitIndex];
        } else;
        {
            return state.user.secondHabits[habitIndex];
        }
    });

    const dispatch = useAppDispatch();

    const generateActivityDays = () => {
        const days = Array(DAY_TO_DISPLAY);
        const currentDate = dayjs();
        let index = activities.length - 1;

        for (let i = 0; i < DAY_TO_DISPLAY; i++) {
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
        if (!isYours) return;
        dispatch(addActivityAction(id, date));
    };

    const deleteActivity = (date: string) => {
        if (!isYours) return;

        dispatch(deleteActivityAction(id, date));
    };

    return (
        <Stack p={2} boxShadow={5} borderRadius={3} mb={2}>
            <Grid2 container mb={3}>
                <Grid2 xs={10} xsOffset={1}>
                    <Typography variant="h4" textAlign="center">
                        {name}
                    </Typography>
                </Grid2>
                <Grid2 xs={1}>
                    <HabitSettings id={id} />
                </Grid2>
            </Grid2>

            <div className="gridDays">{generateActivityDays()}</div>
        </Stack>
    );
}

export default HabitPanel;

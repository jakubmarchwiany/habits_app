import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Day from "components/pages/dashboard/Day";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { addActivityAction, deleteActivityAction } from "store/user-actions";
import "./day.css";

type Props = {
    habitIndex: number;
};

let DAY_TO_DISPLAY = 60;

function HabitPanel({ habitIndex }: Props) {
    const theme = useTheme();
    const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));

    if (greaterThanMid) {
        DAY_TO_DISPLAY = 60;
    } else {
        DAY_TO_DISPLAY = 30;
    }

    const { name, id, activities } = useAppSelector((state) => state.user.habits[habitIndex]);
    console.log("rendering habit panel" + name);
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
        dispatch(addActivityAction(id, date));
    };

    const deleteActivity = (date: string) => {
        dispatch(deleteActivityAction(id, date));
    };

    return (
        <Stack p={3} boxShadow={5} borderRadius={3} mb={2}>
            <Typography variant="h5" textAlign="center" mb={3}>
                {name}
            </Typography>

            <div className="gridDays">{generateActivityDays()}</div>
        </Stack>
    );
}

export default HabitPanel;

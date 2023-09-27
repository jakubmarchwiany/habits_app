/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import "../habits/habitCard/day.css";

import { Box, Stack, styled, useMediaQuery, useTheme } from "@mui/material";
import confetti from "canvas-confetti";
import dayjs from "dayjs";
import { useAppDispatch } from "hooks/redux";
import { appActions } from "store/app-slice";
import { Activity as IActivity } from "store/models/activity";
import { Habit } from "store/models/habit";
import { postFetch } from "utils/fetches";
import { findIndexToDate } from "utils/find_index_to_date";
import { ENV } from "utils/validate_env";

type Props = {
    activity: IActivity[];
    habit: Habit;
    nDays: number;
    setActivity: React.Dispatch<React.SetStateAction<IActivity[]>>;
};

const StyledDIV = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main
}));

const { VITE_N_DAYS_FROM_TODAY } = ENV;

export function Activity({ nDays, habit, activity, setActivity }: Props): JSX.Element {
    const generateActivityDays = (): JSX.Element[] => {
        let index = 0;
        const subtractDate = dayjs().subtract(nDays, "day");
        const days = Array<JSX.Element>(nDays);

        for (let i = 0; i < days.length; ++i) {
            const currentDate = subtractDate.add(i, "day");
            const CommonProps = {
                key: `${habit._id}-${i}`,
                date: currentDate.format("YYYY-MM-DD")
            };

            if (index < activity.length && dayjs(activity[index].date).isSame(currentDate, "day")) {
                const { _id } = activity[index];

                if (_id !== undefined) {
                    days[i] = (
                        <StyledDIV
                            {...CommonProps}
                            onClick={(): void => deleteActivity(_id, CommonProps.date)}
                            className={`day`}
                            data-tooltip={CommonProps.date.slice(5)}
                        />
                    );
                }
                index += 1;
            } else {
                days[i] = (
                    <div
                        {...CommonProps}
                        onClick={(event): void => createActivity(event, CommonProps.date)}
                        className={`day`}
                        data-tooltip={CommonProps.date.slice(5)}
                    />
                );
            }
        }

        return days;
    };

    const dispatch = useAppDispatch();

    const createActivity = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        date: string
    ): void => {
        confetti({
            particleCount: 20,
            startVelocity: 15,
            spread: 360,
            ticks: 75,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
        });

        const habitID = habit._id;

        postFetch<{ data: { activityID: string } }>(
            { habitID, date },
            "/user/habit/activity/create"
        ).then(({ data }) => {
            if (Math.abs(dayjs(date).diff(dayjs(), "day")) < VITE_N_DAYS_FROM_TODAY) {
                const activityID = data.activityID;

                dispatch(appActions.addActivity({ habitID, activityID, date }));
            }
            const index = findIndexToDate(date, activity);
            const tmp = [...activity];

            tmp.splice(index, 0, { date, done: true, _id: data.activityID });

            setActivity(tmp);
        });
    };

    const deleteActivity = (_id: string, date: string): void => {
        postFetch<never>({ _id }, "/user/habit/activity/delete").then(() => {
            if (Math.abs(dayjs(date).diff(dayjs(), "day")) < VITE_N_DAYS_FROM_TODAY) {
                const habitID = habit._id;
                const activityID = _id;

                dispatch(appActions.deleteActivity({ habitID, activityID }));
            }
            let tmp = [...activity];

            tmp = tmp.filter((activity) => activity._id !== _id);

            setActivity(tmp);
        });
    };
    const theme = useTheme();
    const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));

    let columns: number;

    if (greaterThanMid) {
        if (nDays > 93) {
            columns = 18;
        } else {
            columns = 14;
        }
    } else {
        if (nDays > 93) {
            columns = 14;
        } else {
            columns = 7;
        }
    }

    return (
        <Stack width={"100%"}>
            <Box
                mt={{ xs: "0%", md: "5%" }}
                sx={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${columns}, minmax(2vw, auto))`,
                    mt: { xs: 3, md: 5 }
                }}
            >
                {/* <Box className="gridDays" mt={1}> */}
                {generateActivityDays()}
            </Box>
        </Stack>
    );
}

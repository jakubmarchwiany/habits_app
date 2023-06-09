import { Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Day from "components/dashboard/Day";
import * as dayjs from "dayjs";
import { useAppDispatch } from "hooks/redux";
import { addActivityAction, deleteActivityAction } from "store/user-actions";
import { Habit } from "store/user-slice";

type Props = {
    habit: Habit;
};

function Habit({ habit }: Props) {
    const { name, steps, activities } = habit;

    const dispatch = useAppDispatch();

    const generateDays = () => {
        let selectDate = dayjs();
        selectDate = selectDate.subtract(28, "day");

        let index = 0;
        const length = activities.length;
        const days = [];

        for (let i = 0; i < 28; i++) {
            if (index < length && selectDate.isSame(dayjs(activities[index][0]), "day")) {
                let percentComplete;
                if (steps > 1 && activities[index][1] !== undefined) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

                    days.push(
                        <Grid2 xs={1}>
                            <Day
                                isDone={true}
                                date={selectDate}
                                action={addActivity}
                                percentComplete={(activities[index][1]! / steps) * 100}
                            />
                        </Grid2>
                    );
                } else {
                    days.push(
                        <Grid2 xs={1}>
                            <Day
                                isDone={true}
                                date={selectDate}
                                action={deleteActivity}
                                percentComplete={100}
                            />
                        </Grid2>
                    );
                }

                index++;
            } else {
                days.push(
                    <Grid2 xs={1}>
                        <Day
                            isDone={false}
                            date={selectDate}
                            action={addActivity}
                            percentComplete={0}
                        />
                    </Grid2>
                );
            }
            selectDate = selectDate.add(1, "day");
        }
        return days;
    };

    const addActivity = (date: string) => {
        dispatch(addActivityAction(name, date));
    };

    const deleteActivity = (date: string) => {
        dispatch(deleteActivityAction(name, date));
    };

    const generateToday = () => {
        if (
            activities.length > 0 &&
            dayjs().isSame(dayjs(activities[activities.length - 1][0]), "day")
        ) {
            if (steps > 1 && activities[activities.length - 1][1] !== undefined) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

                return (
                    <Day
                        size="11vh"
                        isDone={true}
                        date={dayjs()}
                        action={addActivity}
                        percentComplete={(activities[activities.length - 1][1]! / steps) * 100}
                    />
                );
            } else {
                return (
                    <Day
                        size="11vh"
                        isDone={true}
                        date={dayjs()}
                        action={deleteActivity}
                        percentComplete={100}
                    />
                );
            }
        } else {
            return (
                <Day
                    size="11vh"
                    isDone={true}
                    date={dayjs()}
                    action={addActivity}
                    percentComplete={0}
                />
            );
        }
    };

    return (
        <Stack p={3} boxShadow={5} width="15vw" borderRadius={4}>
            <Typography typography="h5">{name}</Typography>
            <Stack direction="row" spacing={1} mt={2}>
                <Grid2 container columns={7} rowSpacing={1} spacing={1} width={"10vw"}>
                    {generateDays()}
                </Grid2>
                {generateToday()}
            </Stack>
        </Stack>
    );
}

export default Habit;

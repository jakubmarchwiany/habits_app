import { Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Day from "components/dashboard/Day";
import * as dayjs from "dayjs";
import { Habit } from "store/user-slice";

type Props = {
    habit: Habit;
};

function HabitFrame({ habit }: Props) {
    const { name, numberOfActivitiesPerDay, activities } = habit;

    const generateDays = () => {
        let selectData = dayjs();
        selectData = selectData.subtract(30, "day");

        let index = 0;
        const length = activities.length;

        const days = [];
        for (let i = 0; i < 31; i++) {
            if (index < length) {
                if (selectData.isSame(dayjs(activities[index][0]), "day")) {
                    days.push(
                        <Grid2>
                            <Day isDone={true} />
                        </Grid2>
                    );

                    index++;
                } else {
                    days.push(
                        <Grid2>
                            <Day />
                        </Grid2>
                    );
                }
            } else {
                days.push(
                    <Grid2>
                        <Day />
                    </Grid2>
                );
            }
            selectData = selectData.add(1, "day");
        }
        return days;
    };

    return (
        <Stack p={3} boxShadow={5} width="15vw" borderRadius={4}>
            <Typography typography="h5">{name}</Typography>
            <Grid2 container columns={7} rowSpacing={1} spacing={1} mt={2}>
                {generateDays()}
            </Grid2>
        </Stack>
    );
}

export default HabitFrame;

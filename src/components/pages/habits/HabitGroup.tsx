import { Divider, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import HabitCard from "components/pages/habits/habitCard/HabitCard";
import HabitCardFull from "components/pages/habits/habitCard/HabitCardFull";
import { useAppSelector } from "hooks/redux";

import { HabitGroup } from "store/models/habitGroup";

type Props = {
    group: HabitGroup;
};

function HabitGroup({ group }: Props) {
    const isUserHabits = useAppSelector((state) => state.app.isMyHabits);

    const generateHabits = () => {
        if (isUserHabits) {
            return group.habits.map((habit) => {
                return (
                    <Grid2 xs={12} md={3} key={"habit_panel_" + habit}>
                        <HabitCardFull habitID={habit} />
                    </Grid2>
                );
            });
        } else {
            return group.habits.map((habit) => {
                return (
                    <Grid2 xs={12} md={3} key={"habit_panel_" + habit}>
                        <HabitCard habitID={habit} />
                    </Grid2>
                );
            });
        }
    };

    return (
        <Stack>
            <Divider
                sx={{
                    fontSize: "2rem",
                }}
            >
                {group.name}
            </Divider>
            <Grid2
                container
                spacing={2}
                key={"group_grid_" + group._id}
                mx={{ xs: 1, md: 3 }}
                mt={3}
                mb={1}
            >
                {generateHabits()}
            </Grid2>
        </Stack>
    );
}

export default HabitGroup;

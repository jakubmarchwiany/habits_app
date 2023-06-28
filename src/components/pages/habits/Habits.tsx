import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import HabitPanel from "components/pages/habits/HabitPanel";
import HabitPanelWithInteractions from "components/pages/habits/HabitPanelWithInteractions";
import { useAppSelector } from "hooks/redux";

function Dashboard() {
    const habitsIds = useAppSelector((state) => state.user.habits.length);
    const secondHabitsIds = useAppSelector((state) => state.user.secondHabits.length);

    const generateHabitsWithInteractions = (habitsIds: number) => {
        return Array.from({ length: habitsIds }, (_, i) => (
            <Grid2 xs={6} md={4} key={"grid-my-habit" + i}>
                <HabitPanelWithInteractions key={"myHabit" + i} habitIndex={i} />
            </Grid2>
        ));
    };

    const generateHabits = (habitsIds: number) => {
        return Array.from({ length: habitsIds }, (_, i) => (
            <Grid2 xs={12} key={"grid-not-my-habit" + i}>
                <HabitPanel key={"habit" + i} habitIndex={i} />
            </Grid2>
        ));
    };

    return (
        <Grid2
            component="main"
            container
            sx={{
                px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
                py: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
            }}
            columns={20}
        >
            <Grid2 xs={20} md={14}>
                <Box>
                    <Grid2 container columns={12} spacing={2}>
                        {generateHabitsWithInteractions(habitsIds)}
                    </Grid2>
                </Box>
            </Grid2>

            <Grid2 xs={20} md={5} mdOffset={1}>
                <Box>
                    <Grid2 container columns={12} spacing={2}>
                        {generateHabits(secondHabitsIds)}
                    </Grid2>
                </Box>
            </Grid2>
        </Grid2>
    );
}

export default Dashboard;

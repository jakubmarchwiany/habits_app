import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import HabitPanel from "components/pages/dashboard/HabitPanel";
import { useAppSelector } from "hooks/redux";

function Dashboard() {
    const habitsIds = useAppSelector((state) => state.user.habits.length);

    const generateHabits = () => {
        return Array.from({ length: habitsIds }, (_, i) => (
            <HabitPanel key={"habit" + i} habitIndex={i} />
        ));
    };

    return (
        <Grid2
            component="main"
            container
            sx={{
                mx: { xs: 3, sm: 10, md: 5, lg: 5, xl: 10 },
                py: { xs: 1, sm: 2, md: 10, lg: 4, xl: 5 },
            }}
        >
            <Grid2 xs={12} md={5}>
                {generateHabits()}
            </Grid2>
            {/* <Grid2 xs={12} mdOffset={2} md={5}>
                {habits &&
                    habits.map((habit) => {
                        return <HabitPanel key={habit.id} habit={habit} />;
                    })}
            </Grid2> */}
        </Grid2>
    );
}

export default Dashboard;

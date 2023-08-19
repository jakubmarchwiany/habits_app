import { Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Switcher from "components/layouts/Switcher";
import HabitPanel from "components/pages/dashboard/HabitPanel";
import HabitPanelWithInteractions from "components/pages/dashboard/HabitPanelWithInteractions";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect } from "react";
import { getUserDataAction } from "store/app-actions";

function Dashboard() {
    const isUserHabits = useAppSelector((state) => state.app.isUserHabits);
    const habitsIds = useAppSelector((state) => state.app.myHabits.length);
    const secondHabitsIds = useAppSelector((state) => state.app.dearHabits.length);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isUserHabits) {
            if (secondHabitsIds === 0) {
                dispatch(getUserDataAction(undefined, false));
            }
        }
    }, [isUserHabits]);

    const generateHabitsWithInteractions = (habitsIds: number) => {
        return Array.from({ length: habitsIds }, (_, i) => (
            <Grid2 xs={12} md={3} key={"grid_my_habit" + i}>
                <HabitPanelWithInteractions key={"my_habit" + i} habitIndex={i} />
            </Grid2>
        ));
    };

    const generateHabits = (habitsIds: number) => {
        return Array.from({ length: habitsIds }, (_, i) => (
            <Grid2 xs={12} md={3} key={"grid_dear_habit" + i}>
                <HabitPanel key={"dear_habit" + i} habitIndex={i} />
            </Grid2>
        ));
    };

    return (
        <Stack
            component="main"
            sx={{
                px: { xs: 1, md: 3 },
                py: { xs: 1, md: 3 },
            }}
        >
            <Grid2 container spacing={{ xs: 1, md: 3 }}>
                {isUserHabits
                    ? generateHabitsWithInteractions(habitsIds)
                    : generateHabits(secondHabitsIds)}
            </Grid2>
            <Switcher />
        </Stack>
    );
}

export default Dashboard;

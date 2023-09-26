import { Stack } from "@mui/material";
import HabitGroup from "components/pages/habits/HabitGroup";
import { useAppSelector } from "hooks/redux";

function Habits() {
    const habitGroups = useAppSelector((state) => {
        return state.app.isMyHabits ? state.app.myHabitGroups : state.app.dearHabitGroups;
    });

    const generateHabitGroups = () => {
        return habitGroups.slice(0, 1).map((group) => {
            return <HabitGroup group={group} key={"habit_group_" + group._id} />;
        });
    };

    return (
        <Stack
            component="main"
            sx={{
                pt: { xs: 0, sm: 2 },
                pb: "15vh"
            }}
        >
            {generateHabitGroups()}
        </Stack>
    );
}

export default Habits;

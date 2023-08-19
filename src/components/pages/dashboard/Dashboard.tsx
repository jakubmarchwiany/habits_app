import { Stack } from "@mui/material";
import Switcher from "components/layouts/Switcher";
import HabitGroup from "components/pages/dashboard/HabitGroup";
import { useAppSelector } from "hooks/redux";

function Dashboard() {
    const habitGroups = useAppSelector((state) => {
        return state.app.isMyHabits ? state.app.myHabitGroups : state.app.dearHabitGroups;
    });

    const generateHabitGroups = () => {
        return habitGroups.map((group) => {
            return <HabitGroup group={group} key={"habit_group_" + group._id} />;
        });
    };

    return (
        <Stack component="main">
            {generateHabitGroups()}

            <Switcher />
        </Stack>
    );
}

export default Dashboard;

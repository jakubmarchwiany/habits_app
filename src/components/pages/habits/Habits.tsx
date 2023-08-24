import { Stack } from "@mui/material";
import ShowAllSwitcher from "components/layouts/ShowAllSwitcher";
import UserSwitcher from "components/layouts/UserSwitcher";

import HabitGroup from "components/pages/habits/HabitGroup";
import { useAppSelector } from "hooks/redux";

function Habits() {
    const habitGroups = useAppSelector((state) => {
        return state.app.isMyHabits ? state.app.myHabitGroups : state.app.dearHabitGroups;
    });

    const generateHabitGroups = () => {
        return habitGroups.map((group) => {
            return <HabitGroup group={group} key={"habit_group_" + group._id} />;
        });
    };

    return (
        <Stack
            component="main"
            sx={{
                pt: 1,
                pb: "15vh",
            }}
        >
            {generateHabitGroups()}

            <UserSwitcher />
            <ShowAllSwitcher />
        </Stack>
    );
}

export default Habits;

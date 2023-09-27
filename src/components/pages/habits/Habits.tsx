import { Stack } from "@mui/material";
import { HabitGroupPanel } from "components/pages/habits/HabitGroup";
import { useAppSelector } from "hooks/redux";

export function Habits(): JSX.Element {
    const habitGroups = useAppSelector((state) => {
        return state.app.isMyHabits ? state.app.myHabitGroups : state.app.dearHabitGroups;
    });

    const generateHabitGroups = (): JSX.Element[] => {
        return habitGroups.slice(0, 1).map((group) => {
            return <HabitGroupPanel group={group} key={"habit_group_" + group._id} />;
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

import { Stack } from "@mui/material";
import HabitFrame from "components/dashboard/HabitFrame";
import { useAppSelector } from "hooks/redux";

function Dashboard() {
    const user = useAppSelector((state) => state.user);

    return (
        <Stack
            component="main"
            display="flex"
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"center"}
        >
            {user && (
                <>
                    {user.habits.map((habit) => {
                        return <HabitFrame key={habit.name} habit={habit} />;
                    })}
                </>
            )}
        </Stack>
    );
}

export default Dashboard;

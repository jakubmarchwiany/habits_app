import { Stack } from "@mui/material";
import HabitPanel from "components/dashboard/HabitPanel";
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
                        return <HabitPanel key={habit.id} habit={habit} />;
                    })}
                </>
            )}
        </Stack>
    );
}

export default Dashboard;

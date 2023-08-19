import { Divider, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import HabitPanelWithInteractions from "components/pages/dashboard/HabitPanelWithInteractions";
import { HabitGroup } from "store/models/habitGroup";

type Props = {
    group: HabitGroup;
};

function HabitGroup({ group }: Props) {
    const generateHabits = () => {
        return group.habits.map((habit) => {
            return (
                <Grid2 xs={12} md={3} key={"habit_panel_" + habit}>
                    <HabitPanelWithInteractions habitID={habit} />
                </Grid2>
            );
        });
    };

    return (
        <>
            <Divider
                sx={{
                    my: { xs: 1, md: 3 },
                    fontSize: "2rem",
                    // color: "primary.main",
                    // "&::before": {
                    //     borderTopColor: "primary.main",
                    // },
                    // "&::after": {
                    //     borderTopColor: "primary.main",
                    // },
                }}
            >
                {group.name}
            </Divider>
            <Grid2 container spacing={2} key={"group_grid_" + group._id} mx={{ xs: 1, md: 3 }}>
                {generateHabits()}
            </Grid2>
        </>
    );
}

export default HabitGroup;

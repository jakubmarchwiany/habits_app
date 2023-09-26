import { Divider, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import HabitCard from "components/pages/habits/habitCard/HabitCard";
import HabitCardFull from "components/pages/habits/habitCard/HabitCardFull";
import { useAppSelector } from "hooks/redux";
import { useState } from "react";
import { HabitGroup } from "store/models/habitGroup";

type Props = {
    group: HabitGroup;
};

export default function HabitGroupPanel({ group }: Props) {
    const isUserHabits = useAppSelector((state) => state.app.isMyHabits);
    const showAllHabits = useAppSelector((state) => state.app.showAllHabits);

    const [showFlags, setShowFlags] = useState<boolean[]>(Array(group.habits.length).fill(false));

    const generateHabits = () => {
        if (isUserHabits) {
            return group.habits.map((habit, index) => {
                return (
                    <HabitCardFull
                        key={"habitcardfull_" + habit}
                        habitID={habit}
                        flagIndex={index}
                        setShowFlag={setShowFlag}
                    />
                );
            });
        } else {
            return group.habits.map((habit, index) => {
                return (
                    <HabitCard
                        key={"habidcard_" + habit}
                        habitID={habit}
                        flagIndex={index}
                        setShowFlag={setShowFlag}
                    />
                );
            });
        }
    };

    const setShowFlag = (index: number, value: boolean) => {
        setShowFlags((prev) => {
            const newShowFlags = [...prev];
            newShowFlags[index] = value;

            return newShowFlags;
        });
    };

    const showGroup = showAllHabits || showFlags.some((flag) => flag);

    return (
        <Stack sx={{ display: showGroup ? "" : "none" }}>
            <Divider
                sx={{
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    "&.MuiDivider-root": {
                        "&::before": {
                            borderTopWidth: { xs: 3, md: 4 }
                        },
                        "&::after": {
                            borderTopWidth: { xs: 3, md: 4 }
                        }
                    }
                }}
            >
                {group.name}
            </Divider>

            <Grid2
                container
                spacing={{ xs: 1, md: 2 }}
                rowSpacing={2}
                id={"habit_group_grid_" + group._id}
                key={"habit_group_grid_" + group._id}
                mx={{ xs: 1, md: 3 }}
                mt={1.5}
                mb={1}
            >
                {generateHabits()}
            </Grid2>
        </Stack>
    );
}

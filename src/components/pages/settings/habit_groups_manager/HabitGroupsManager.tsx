import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { standardSize } from "assets/theme";
import { habitGroups } from "components/pages/settings/habit_groups_manager/habit_groups";
import { habitItem } from "components/pages/settings/habit_groups_manager/habit_item";
import { HabitGroup } from "components/pages/settings/habit_groups_manager/HabitGroup";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { edithabitsOrderAction } from "store/app-actions";
import { v4 as uuid } from "uuid";

export function HabitGroupsManager(): JSX.Element {
    const [habitGroups, setHabitGroups] = useState<habitGroups[]>([]);

    const habits = useAppSelector((state) => state.app.myHabits);
    const myHabitGroups = useAppSelector((state) => state.app.myHabitGroups);

    const navigate = useNavigate();

    useEffect(() => {
        prepareGroups();
    }, []);

    const dispatch = useAppDispatch();

    const prepareGroups = (): void => {
        const tmpHabits = habits.map((h) => {
            return { _id: h._id, name: h.name };
        }) as habitItem[];

        const tmpGroups = myHabitGroups.map((group) => {
            const groupHabits: habitItem[] = [];

            group.habits.forEach((habitId) => {
                const habit = tmpHabits.find((h) => h._id === habitId);

                if (habit) {
                    groupHabits.push({ _id: habit._id, name: habit.name });

                    tmpHabits.splice(tmpHabits.indexOf(habit), 1);
                }
            });

            return { _id: group._id, name: group.name, habits: groupHabits };
        });

        tmpGroups.push({ _id: uuid(), name: "bez grupy", habits: tmpHabits });

        setHabitGroups(tmpGroups);
    };

    const addNewGroup = (): void => {
        const updatedLists = [...habitGroups];

        updatedLists.push({ _id: uuid(), name: "nowa grupa", habits: [] });

        setHabitGroups(updatedLists);
    };

    const handleSave = (): void => {
        for (let i = 0; i < habitGroups.length; i++) {
            if (habitGroups[i].habits.length === 0) {
                toast.error("Grupa musi zawierać przynajmniej jeden nawyk");

                return;
            }
        }

        const groupsToFetch = habitGroups.map((group) => {
            return { name: group.name, habits: group.habits.map((habit) => habit._id) };
        });

        dispatch(edithabitsOrderAction(groupsToFetch, navigate));
    };

    return (
        <>
            <Grid2 container spacing={3} mt={1}>
                {habitGroups.map((group, groupIndex) => (
                    <HabitGroup
                        key={group._id}
                        group={group}
                        groupIndex={groupIndex}
                        habitGroups={habitGroups}
                        setHabitGroups={setHabitGroups}
                    />
                ))}

                <Grid2 xs={3}>
                    <Button
                        variant="outlined"
                        sx={{
                            width: "100%",
                            height: "100%",
                            border: 2,
                            borderColor: "primary.main"
                        }}
                        onClick={addNewGroup}
                    >
                        Stwórz grupę
                    </Button>
                </Grid2>
            </Grid2>
            <Button
                variant="contained"
                onClick={handleSave}
                sx={{ mt: { xs: 1, md: 3 }, alignSelf: "center", width: standardSize }}
            >
                Zapisz
            </Button>
        </>
    );
}

import { Delete } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { habitGroups } from "components/pages/settings/habit_groups_manager/habit_groups";
import { habitItem } from "components/pages/settings/habit_groups_manager/habit_item";
import { HabitItem } from "components/pages/settings/habit_groups_manager/HabitItem";
import React from "react";
import toast from "react-hot-toast";

type Props = {
    group: habitGroups;
    groupIndex: number;
    habitGroups: habitGroups[];
    setHabitGroups: React.Dispatch<React.SetStateAction<habitGroups[]>>;
};

export function HabitGroup({ habitGroups, setHabitGroups, group, groupIndex }: Props): JSX.Element {
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, newGroupIndex: number): void => {
        event.preventDefault();

        const itemString = event.dataTransfer.getData("text/plain");
        const item = JSON.parse(itemString) as [number, habitItem];

        if (item[0] === newGroupIndex) {
            return;
        }

        const updatedLists = [...habitGroups];

        updatedLists[item[0]].habits = updatedLists[item[0]].habits.filter(
            (i) => i._id !== item[1]._id
        );

        updatedLists[newGroupIndex].habits.push(item[1]);

        setHabitGroups(updatedLists);
    };

    const changeGroupName = (newName: string, groupIndex: number): void => {
        const updatedLists = [...habitGroups];

        updatedLists[groupIndex].name = newName;

        setHabitGroups(updatedLists);
    };

    const deleteGroup = (groupIndex: number): void => {
        if (habitGroups[groupIndex].habits.length > 0) {
            toast.error("przenieś wszystkie nawyki z grupy");

            return;
        }
        const updatedLists = [...habitGroups];

        updatedLists.splice(groupIndex, 1);

        setHabitGroups(updatedLists);
    };

    const moveGroup = (currentIndex: number, newIndex: number): void => {
        const updatedLists = [...habitGroups];
        const [item] = updatedLists.splice(currentIndex, 1);

        updatedLists.splice(newIndex, 0, item);

        setHabitGroups(updatedLists);
    };

    const handleDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        habit: habitItem,
        oldGroupIndex: number
    ): void => {
        event.dataTransfer.setData("text/plain", JSON.stringify([oldGroupIndex, habit]));
    };

    const moveHabitItem = (currentIndex: number, newIndex: number, groupIndex: number): void => {
        const updatedLists = [...habitGroups];
        const [item] = updatedLists[groupIndex].habits.splice(currentIndex, 1);

        updatedLists[groupIndex].habits.splice(newIndex, 0, item);

        setHabitGroups(updatedLists);
    };

    return (
        <Grid2
            xs={12}
            md={3}
            key={group._id}
            onDragOver={handleDragOver}
            onDrop={(e): void => handleDrop(e, groupIndex)}
        >
            <Stack
                height={"40vh"}
                sx={{ border: 2, borderColor: "primary.main" }}
                key={"Group_" + group._id}
            >
                <Stack direction={"row"}>
                    <TextField
                        sx={{ width: "90%" }}
                        label="Nazwa grupy"
                        variant="filled"
                        value={group.name}
                        onChange={(e): void => changeGroupName(e.target.value, groupIndex)}
                    />
                    <IconButton
                        color="error"
                        aria-label="directions"
                        onClick={(): void => deleteGroup(groupIndex)}
                    >
                        <Delete />
                    </IconButton>
                </Stack>
                <Stack overflow="auto">
                    {group.habits.map((habit, index) => (
                        <HabitItem
                            key={habit._id}
                            habit={habit}
                            groupIndex={groupIndex}
                            groupHabitsLength={group.habits.length}
                            itemIndex={index}
                            handleDragStart={handleDragStart}
                            moveHabitItem={moveHabitItem}
                        />
                    ))}
                </Stack>
            </Stack>

            <Stack direction="row">
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={(): void => {
                        if (groupIndex > 0) {
                            moveGroup(groupIndex, groupIndex - 1);
                        }
                    }}
                    sx={{ color: groupIndex == 0 ? "" : "primary.main" }}
                    disabled={groupIndex == 0}
                >
                    {"<"}
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    onClick={(): void => moveGroup(groupIndex, groupIndex + 1)}
                    disabled={groupIndex === habitGroups.length - 1}
                    sx={{
                        color: groupIndex === habitGroups.length - 1 ? "" : "primary.main"
                    }}
                >
                    {">"}
                </Button>
            </Stack>
        </Grid2>
    );
}

import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface group {
    name: string;
    habits: string[];
}

function HabitsOrderManager() {
    const [groupsLists, setGroupsList] = useState<group[]>([
        {
            name: "rano",
            habits: ["spanie", "bieganie", "Item 3", "Item 3", "Item 3", "Item 3", "Item 3"],
        },
        { name: "po południ", habits: [] },
        { name: "dla zdrowia", habits: [] },
    ]);

    const handleDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        habit: string,
        oldGroupIndex: number
    ) => {
        event.dataTransfer.setData("text/plain", JSON.stringify([oldGroupIndex, habit]));
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, newGroupIndex: number) => {
        event.preventDefault();
        const itemString = event.dataTransfer.getData("text/plain");
        const item: [number, string] = JSON.parse(itemString);

        if (item[0] === newGroupIndex) return;

        const updatedLists = [...groupsLists];
        updatedLists[item[0]].habits = updatedLists[item[0]].habits.filter((i) => i !== item[1]);
        updatedLists[newGroupIndex].habits.push(item[1]);

        setGroupsList(updatedLists);
    };

    const moveHabitItem = (currentIndex: number, newIndex: number, groupIndex: number) => {
        const updatedLists = [...groupsLists];
        const [item] = updatedLists[groupIndex].habits.splice(currentIndex, 1);
        updatedLists[groupIndex].habits.splice(newIndex, 0, item);
        setGroupsList(updatedLists);
    };

    const changeGroupName = (newName: string, groupIndex: number) => {
        const updatedLists = [...groupsLists];
        updatedLists[groupIndex].name = newName;
        setGroupsList(updatedLists);
    };
    const addGroup = () => {
        const updatedLists = [...groupsLists];
        updatedLists.push({ name: "nowa grupa", habits: [] });
        setGroupsList(updatedLists);
    };
    const deleteGroup = (groupIndex: number) => {
        if (groupsLists[groupIndex].habits.length > 0) {
            toast.error("przenieś wszystkie nawyki z grupy");
            return;
        }
        const updatedLists = [...groupsLists];
        updatedLists.splice(groupIndex, 1);
        setGroupsList(updatedLists);
    };

    return (
        <Grid2 container spacing={3} mt={1}>
            {groupsLists.map((group, groupIndex) => (
                <Grid2
                    xs={12}
                    md={3}
                    key={"group list " + groupIndex}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, groupIndex)}
                >
                    <Stack height={"40vh"} sx={{ border: 2, borderColor: "primary.main" }}>
                        <Stack direction={"row"}>
                            <TextField
                                sx={{ width: "90%" }}
                                label="Nazwa grupy"
                                variant="filled"
                                value={group.name}
                                onChange={(e) => changeGroupName(e.target.value, groupIndex)}
                            />
                            <IconButton
                                color="error"
                                aria-label="directions"
                                onClick={() => deleteGroup(groupIndex)}
                            >
                                <Delete />
                            </IconButton>
                        </Stack>
                        <Stack overflow="auto">
                            {group.habits.map((item, index) => (
                                <Stack
                                    direction={"row"}
                                    key={item}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, item, groupIndex)}
                                    sx={{
                                        pl: 2,
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        backgroundColor: "hsl(0, 0%, 20%)",
                                        border: 2,
                                        my: 0.5,
                                        borderColor: "primary.main",
                                    }}
                                >
                                    <Typography>{item}</Typography>
                                    <Stack>
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                index > 0 &&
                                                moveHabitItem(index, index - 1, groupIndex)
                                            }
                                            disabled={index == 0}
                                            sx={{ p: 0 }}
                                        >
                                            Góra
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() =>
                                                moveHabitItem(index, index + 1, groupIndex)
                                            }
                                            disabled={index === group.habits.length - 1}
                                            sx={{ p: 0 }}
                                        >
                                            Dół
                                        </Button>
                                    </Stack>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </Grid2>
            ))}

            <Grid2 xs={3}>
                <Button
                    variant="outlined"
                    sx={{
                        width: "100%",
                        height: "100%",
                        border: 2,
                        borderColor: "primary.main",
                    }}
                    onClick={addGroup}
                >
                    Dodaj grupę
                </Button>
            </Grid2>
        </Grid2>
    );
}
export default HabitsOrderManager;

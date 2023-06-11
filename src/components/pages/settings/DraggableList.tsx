/* eslint-disable @typescript-eslint/no-unused-vars */
import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import { edithabitsOrderAction } from "store/user-actions";

const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export default function DraggableList() {
    const habitsRedux = useAppSelector((state) => state.user.habits);
    const [habits, setHabits] = useState<{ id: string; name: string }[]>([]);
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const habitList = habitsRedux.map((habit) => {
            return {
                id: habit.id,
                name: habit.name,
            };
        });

        setHabits(habitList);
    }, [habitsRedux]);

    const onDragEnd = (result: DropResult) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(habits, result.source.index, result.destination.index);

        setHabits(reorderedItems);
    };

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: 5 * 2,
        margin: `0 0 ${5}px 0`,

        // change background colour if dragging
        background: isDragging ? "primary.main" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle,
    });

    const handleSave = () => {
        dispatch(edithabitsOrderAction(habits.map((habit) => habit.id)));
        setOpen(false);
    };

    return (
        <Box alignItems={"center"} justifyContent={"center"}>
            <Button variant="outlined" onClick={() => setOpen(!open)} fullWidth sx={{ my: 3 }}>
                {open ? "Anuluj" : "Zmień kolejność nawyków"}
            </Button>
            {open && (
                <>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <Box ref={provided.innerRef}>
                                    {habits?.map((item: { id: string; name: string }, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <Box
                                                    width={300}
                                                    borderRadius={1}
                                                    ref={provided.innerRef}
                                                    sx={{
                                                        cursor: "grab",
                                                    }}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <Typography variant="h5" textAlign="center">
                                                        {item.name}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Box>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <Button variant="outlined" onClick={handleSave} fullWidth sx={{ my: 3 }}>
                        Zapisz
                    </Button>
                </>
            )}
        </Box>
    );
}

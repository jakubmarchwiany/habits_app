import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { habitItem } from "components/pages/settings/habit_groups_manager/habit_item";
import { DragEvent } from "react";

type Props = {
    itemIndex: number;
    groupIndex: number;
    habit: habitItem;
    groupHabitsLength: number;
    moveHabitItem: (oldIndex: number, newIndex: number, groupIndex: number) => void;
    handleDragStart: (e: DragEvent<HTMLDivElement>, habit: habitItem, groupIndex: number) => void;
};

function HabitItem({
    itemIndex,
    habit,
    groupIndex,
    groupHabitsLength,
    handleDragStart,
    moveHabitItem,
}: Props) {
    return (
        <Stack
            direction={"row"}
            draggable
            onDragStart={(e: DragEvent<HTMLDivElement>) => handleDragStart(e, habit, groupIndex)}
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
            <Typography>{habit.name}</Typography>
            <Stack>
                <IconButton
                    onClick={() =>
                        itemIndex > 0 && moveHabitItem(itemIndex, itemIndex - 1, groupIndex)
                    }
                    sx={{ color: itemIndex == 0 ? "" : "primary.main", p: 0 }}
                    disabled={itemIndex == 0}
                >
                    <ArrowDropUp />
                </IconButton>

                <IconButton
                    onClick={() => moveHabitItem(itemIndex, itemIndex + 1, groupIndex)}
                    disabled={itemIndex === groupHabitsLength - 1}
                    sx={{
                        color: itemIndex === groupHabitsLength - 1 ? "" : "primary.main",
                        p: 0,
                    }}
                >
                    <ArrowDropDown />
                </IconButton>
            </Stack>
        </Stack>
    );
}

export default HabitItem;

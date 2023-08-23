import { Settings } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import EditHabitDialog from "components/pages/habits/habitCard/settings/EditHabitDialog";
import { useAppDispatch } from "hooks/redux";
import * as React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteHabitAction, editHabitAction } from "store/app-actions";
import { Habit } from "store/models/habit";

type Props = {
    habit: Habit;
};

function HabitSettings({ habit }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [editHabitOpen, setEditHabitOpen] = React.useState(false);
    const open = Boolean(anchorEl);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const openHabitSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeHabitSettings = () => {
        setAnchorEl(null);
    };

    const openEditHabitDialog = () => {
        setEditHabitOpen(true);
    };

    const editHabitHandle = (name?: string, description?: string, periodInDays?: number) => {
        setEditHabitOpen(false);

        if (name && periodInDays)
            dispatch(editHabitAction(habit._id, name, description!, periodInDays));

        closeHabitSettings();
    };

    const deleteHabit = () => {
        dispatch(deleteHabitAction(habit._id));
        closeHabitSettings();
    };

    const showHabit = () => {
        navigate(`/habit/${habit._id}`);
    }

    return (
        <>
            <IconButton onClick={openHabitSettings} sx={{ p: 0 }}>
                <Settings sx={{ color: "white", fontSize: { xs: "1rem", md: "1.5rem" } }} />
            </IconButton>
            {open && (
                <>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={closeHabitSettings}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={showHabit}>Pokaż wszystko</MenuItem>
                        <MenuItem onClick={openEditHabitDialog}>Edytuj</MenuItem>
                        <MenuItem
                            onClick={() => toast.error("Kliknij dwukrotnie by usunać nawyk")}
                            onDoubleClick={deleteHabit}
                        >
                            Usuń
                        </MenuItem>
                    </Menu>

                    {editHabitOpen && (
                        <EditHabitDialog habit={habit} editHabitHandle={editHabitHandle} />
                    )}
                </>
            )}
        </>
    );
}

export default HabitSettings;

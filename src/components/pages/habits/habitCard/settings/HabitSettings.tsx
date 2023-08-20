import { Settings } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ChangeNameDialog from "components/pages/habits/habitCard/settings/ChangeNameDialog";
import { useAppDispatch } from "hooks/redux";
import * as React from "react";
import { toast } from "react-hot-toast";
import { deleteHabitAction, editHabitNameAction } from "store/app-actions";

type Props = {
    id: string;
};

function HabitSettings({ id }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [changeNameOpen, setChangeNameOpen] = React.useState(false);

    const open = Boolean(anchorEl);

    const dispatch = useAppDispatch();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openChaneNameDialog = () => {
        setChangeNameOpen(true);
    };

    const handleActionChangeNameDialog = (newName: string) => {
        setChangeNameOpen(false);
        if (newName === "") return;
        dispatch(editHabitNameAction(id, newName));
    };

    const handleDeleteHabit = () => {
        dispatch(deleteHabitAction(id));
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
                <Settings sx={{ color: "white", fontSize: { xs: "1rem", md: "1.5rem" } }} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={openChaneNameDialog}>Zmień nazwę</MenuItem>
                <MenuItem
                    onClick={() => toast("Kliknij dwukrotnie by usunać nawyk")}
                    onDoubleClick={handleDeleteHabit}
                >
                    Usuń
                </MenuItem>
            </Menu>

            {changeNameOpen && <ChangeNameDialog action={handleActionChangeNameDialog} />}
        </>
    );
}

export default HabitSettings;

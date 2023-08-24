import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import React, { useEffect } from "react";
import { appActions } from "store/app-slice";

function ShowAllSwitcher() {
    const showAllHabits = useAppSelector((state) => state.app.showAllHabits);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const showAllHabits = localStorage.getItem("showAllHabits");

        if (showAllHabits === null) {
            localStorage.setItem("showAllHabits", "true");
            dispatch(appActions.setShowAllHabits(true));
        } else {
            dispatch(appActions.setShowAllHabits(JSON.parse(showAllHabits)));
        }
    }, []);

    const toggleHabitsView = async () => {
        localStorage.setItem("showAllHabits", (!showAllHabits).toString());

        dispatch(appActions.setShowAllHabits(!showAllHabits));
    };

    const icon = showAllHabits ? <Visibility /> : <VisibilityOff />;

    return (
        <Fab
            sx={{
                backgroundColor: showAllHabits ? "primary.main" : "",
                "&:hover": {
                    backgroundColor: showAllHabits ? "" : "primary.main",
                },
                position: "fixed",
                width: { xs: "2rem", md: "2.5rem" },
                height: { xs: "2rem", md: "2.5rem" },
                top: "10px",
                left: "10px",
            }}
            onClick={toggleHabitsView}
        >
            <Tooltip
                title={
                    showAllHabits ? "Pokaż nawyki do zrobienia dzisiaj" : "Pokaż wszystkie nawyki"
                }
                placement="right"
            >
                {React.cloneElement(icon, {
                    sx: {
                        width: { xs: "1rem", md: "1.5rem" },
                        height: { xs: "1rem", md: "1.5rem" },
                        color: "white",
                    },
                })}
            </Tooltip>
        </Fab>
    );
}

export default ShowAllSwitcher;

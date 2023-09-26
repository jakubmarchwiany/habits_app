import {
    ArrowDropUp,
    Dashboard,
    Favorite,
    PostAdd,
    Settings,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getHabitsAction } from "store/app-actions";
import { appActions } from "store/app-slice";

enum Actions {
    Create = "Dodaj nawyk",
    Settings = "Ustawienia",
    habits = "Nawyki"
}

const actions = [
    { icon: <Dashboard />, name: Actions.habits, path: "/" },
    { icon: <PostAdd />, name: Actions.Create, path: "/create_habit" },
    { icon: <Settings />, name: Actions.Settings, path: "/settings" }
];

function Navigator() {
    const [open, setOpen] = useState(false);
    const isUserHabits = useAppSelector((state) => state.app.isMyHabits);
    const isDearHabitsDownloaded = useAppSelector((state) => state.app.isDearHabitsDownloaded);
    const showAllHabits = useAppSelector((state) => state.app.showAllHabits);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const showAllHabits = localStorage.getItem("showAllHabits");

        if (showAllHabits !== null) {
            const boolean = JSON.parse(showAllHabits) as boolean;

            dispatch(appActions.setShowAllHabits(boolean));
        } else {
            localStorage.setItem("showAllHabits", "true");
            dispatch(appActions.setShowAllHabits(true));
        }
    }, []);

    const togggleShowAllHabits = () => {
        localStorage.setItem("showAllHabits", (!showAllHabits).toString());

        dispatch(appActions.setShowAllHabits(!showAllHabits));
    };

    const toggleDrawer = (isOpen: boolean) => () => {
        setOpen(isOpen);
    };

    const toggleHabitsView = (): void => {
        if (!isDearHabitsDownloaded) {
            dispatch(getHabitsAction(() => {}, false));
        }

        dispatch(appActions.toggleHabitsView());
    };

    const handleClick = (action: string) => {
        switch (action) {
            case Actions.habits:
                navigate("/");
                break;
            case Actions.Create:
                navigate("/create_habit");
                break;
            case Actions.Settings:
                navigate("/settings");
                break;
            case "UserSwitcher":
                toggleHabitsView();
                break;
            case "ShowAllSwitcher":
                togggleShowAllHabits();
                break;
            default:
        }
    };

    return (
        <>
            <IconButton
                aria-label="delete"
                size="large"
                onClick={toggleDrawer(true)}
                sx={{
                    position: "fixed",
                    left: "50%",
                    top: "95%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "5rem",
                    color: "white",
                    boxShadow: 0,
                    borderRadius: 0
                }}
            >
                <ArrowDropUp fontSize="inherit" />
            </IconButton>
            <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
                <List>
                    {actions.map(
                        (action) =>
                            action.path !== location.pathname && (
                                <ListItem
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end"
                                    }}
                                    button
                                    key={action.name}
                                    onClick={() => {
                                        toggleDrawer(false)();
                                        handleClick(action.name);
                                    }}
                                >
                                    <ListItemIcon sx={{ color: "white" }}>
                                        {action.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={action.name} />
                                </ListItem>
                            )
                    )}

                    {location.pathname === "/" && (
                        <>
                            <ListItem
                                button
                                key={"UserSwitcher"}
                                onClick={() => {
                                    toggleDrawer(false)();
                                    handleClick("UserSwitcher");
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: "white"
                                    }}
                                >
                                    <Favorite />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        isUserHabits
                                            ? "Zobacz nawyki bobcia"
                                            : "Wróć do swoich nawyków"
                                    }
                                />
                            </ListItem>
                            <ListItem
                                button
                                key={"ShowAllSwitcher"}
                                onClick={() => {
                                    toggleDrawer(false)();
                                    handleClick("ShowAllSwitcher");
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: "white"
                                    }}
                                >
                                    {showAllHabits ? <Visibility /> : <VisibilityOff />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        showAllHabits ? "Do zrobienia dzisiaj" : "Wszystkie nawyki"
                                    }
                                />
                            </ListItem>
                        </>
                    )}
                </List>
            </Drawer>
        </>
    );
}

export default Navigator;

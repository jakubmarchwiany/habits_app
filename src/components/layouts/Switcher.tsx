import { Favorite } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getHabitsAction } from "store/app-actions";
import { appActions } from "store/app-slice";

function Switcher() {
    const isUserHabits = useAppSelector((state) => state.app.isMyHabits);
    const isDearHabitsDownloaded = useAppSelector((state) => state.app.isDearHabitsDownloaded);

    const dispatch = useAppDispatch();

    const toggleHabitsView = async () => {
        if (!isDearHabitsDownloaded) {
            dispatch(getHabitsAction(undefined, false));
        }

        dispatch(appActions.toggleHabitsView());
    };

    return (
        <Fab
            sx={{
                backgroundColor: isUserHabits ? "primary.main" : "#FFB6C1",
                "&:hover": {
                    backgroundColor: isUserHabits ? "#FFB6C1" : "primary.main",
                },
                position: "fixed",
                width: { xs: "2rem", md: "2.5rem" },
                height: { xs: "2rem", md: "2.5rem" },
                bottom: "2%",
                left: "1%",
            }}
            onClick={toggleHabitsView}
        >
            <Favorite
                sx={{
                    width: { xs: "1rem", md: "1.5rem" },
                    height: { xs: "1rem", md: "1.5rem" },
                    color: "white",
                }}
                fontSize="small"
            />
        </Fab>
    );
}

export default Switcher;

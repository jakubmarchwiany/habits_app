import { Button, Stack, Typography } from "@mui/material";
import { standardSize } from "assets/theme";
import ColorThemeSettings from "components/pages/settings/ColorThemeSettings";
import HabitGroupsManager from "components/pages/settings/habit_groups_manager/HabitGroupsManager";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteCookieAndRefresh } from "utils/authorization_fail";
import { sleep } from "utils/sleep";

function Settings() {
    const [isHabitGroupsManagerOpen, setIsHabitGroupsManagerOpen] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.get("openGroupManager") === "true") {
            setIsHabitGroupsManagerOpen(true);
        }
    });

    const loguout = async () => {
        toast.success("Wylogowano pomyślnie");
        await sleep(500);
        deleteCookieAndRefresh();
    };

    return (
        <Stack
            component="main"
            sx={{
                px: { xs: 1, md: 3 },
                py: { xs: 1, md: 3 }
            }}
        >
            {!isHabitGroupsManagerOpen && (
                <>
                    <Typography typography="h2" textAlign={"center"} sx={{ py: { xs: 1, md: 3 } }}>
                        Ustawienia
                    </Typography>
                    <ColorThemeSettings />
                </>
            )}
            <Button
                variant="contained"
                onClick={() => setIsHabitGroupsManagerOpen((prev) => !prev)}
                sx={{ mt: 0.5, alignSelf: "center", width: standardSize }}
            >
                {isHabitGroupsManagerOpen ? "Zamknij" : "Zarządzaj kolejnością nawyków"}
            </Button>

            {isHabitGroupsManagerOpen && <HabitGroupsManager />}

            {!isHabitGroupsManagerOpen && (
                <Button
                    color="warning"
                    variant="contained"
                    onClick={loguout}
                    sx={{ mt: 0.5, alignSelf: "center", width: standardSize }}
                >
                    Wyloguj się
                </Button>
            )}
        </Stack>
    );
}

export default Settings;

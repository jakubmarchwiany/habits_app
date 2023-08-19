import { Button, Stack, Typography } from "@mui/material";
import { standardSize } from "assets/theme";
import ColorThemeSettings from "components/pages/settings/ColorThemeSettings";
import HabitGroupsManager from "components/pages/settings/habit_groups_manager/HabitGroupsManager";
import { useState } from "react";

function Settings() {
    const [isHabitGroupsManagerOpen, setIsHabitGroupsManagerOpen] = useState(false);

    return (
        <Stack
            component="main"
            sx={{
                px: { xs: 1, md: 3 },
                py: { xs: 1, md: 3 },
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
        </Stack>
    );
}

export default Settings;

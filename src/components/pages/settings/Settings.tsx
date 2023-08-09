import { Button, Stack, Typography } from "@mui/material";
import ColorThemeSettings from "components/pages/settings/ColorThemeSettings";
import HabitsOrderManager from "components/pages/settings/habits_order_manager/HabitsOrderManager";
import { useState } from "react";

function Settings() {
    const [isHabitOrderManagerOpen, setIsHabitOrderManagerOpen] = useState(false);

    return (
        <Stack
            component="main"
            sx={{
                px: { xs: 1, md: 3 },
                py: { xs: 1, md: 3 },
            }}
        >
            {!isHabitOrderManagerOpen && (
                <>
                    <Typography typography="h2" textAlign={"center"}>
                        Ustawienia
                    </Typography>
                    <ColorThemeSettings />
                </>
            )}

            <Button variant="contained" onClick={() => setIsHabitOrderManagerOpen((prev) => !prev)}>
                {isHabitOrderManagerOpen ? "Zamknij" : "Zarządzaj kolejnością nawyków"}
            </Button>
            {isHabitOrderManagerOpen && <HabitsOrderManager />}
        </Stack>
    );
}

export default Settings;

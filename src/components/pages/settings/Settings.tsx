import { Button, Stack, Typography } from "@mui/material";
import ColorThemeSettings from "components/pages/settings/SaveColorThemeTextField";
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
            // sx={{
            //     px: { xs: 5, sm: 30, md: 40, lg: 30, xl: 90 },
            // }}
            // alignItems={"center"}
            // justifyContent={"center"}
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

import { Stack, Typography } from "@mui/material";
import DraggableList from "components/pages/settings/DraggableList";
import ColorThemeSettings from "components/pages/settings/SaveColorThemeTextField";

function Settings() {
    return (
        <Stack
            component="main"
            // sx={{
            //     px: { xs: 5, sm: 30, md: 40, lg: 30, xl: 90 },
            // }}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Typography typography="h2" my={5}>
                Ustawienia
            </Typography>

            <ColorThemeSettings />

            <DraggableList />
        </Stack>
    );
}

export default Settings;

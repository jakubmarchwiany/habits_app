import { Stack, Typography } from "@mui/material";

function Settings() {
    return (
        <Stack
            component="main"
            display="flex"
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Typography typography="h2" mt={5}>
                Ustawienia
            </Typography>
        </Stack>
    );
}

export default Settings;

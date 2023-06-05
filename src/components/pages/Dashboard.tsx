import { Stack, Typography } from "@mui/material";

function Dashboard() {
    return (
        <Stack
            component="main"
            display="flex"
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Typography typography="h2" mt={5}>
                Panel główny
            </Typography>
        </Stack>
    );
}

export default Dashboard;

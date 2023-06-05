import { Stack, Switch, Typography } from "@mui/material";
import useStateUser, { User } from "hooks/use_state_user";

function Settings() {
    const [user, setUser] = useStateUser();

    console.log(user);
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

            <Typography typography="h5" mt={3}>
                Kto korzysta z aplikacji?
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                <Typography>Kuba</Typography>
                <Switch checked={user === User.Julia && true} onChange={setUser} />
                <Typography>Julka</Typography>
            </Stack>
        </Stack>
    );
}

export default Settings;

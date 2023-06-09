import { LockOpenOutlined } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { postFetch } from "components/utils/fetches";
import { sleeper } from "components/utils/sleeper";
import Cookies from "js-cookie";
import { SyntheticEvent, useState } from "react";

type Props = {
    isLogged: boolean | undefined;
};

function LoadingPage({ isLogged }: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event: SyntheticEvent) => {
        event.preventDefault();

        postFetch<{ token: string }>({ username, password }, `/auth/login`, {
            customError: true,
        })
            .then(async ({ token }) => {
                Cookies.set("authorization", token, {
                    expires: 31,
                    path: "/",
                });
                await sleeper(2);
                window.location.reload();
            })
            .catch(() => {
                setUsername("");
                setPassword("");
            });
    };

    return (
        <Container
            component="main"
            maxWidth={false}
            sx={{
                justifyContent: "center",
                backgroundColor: "#424242",
                display: "flex",
                height: "100vh",
                pt: "5%",
                px: { xs: "10%", sm: "20%", md: "30%", lg: "35%", xl: "40%" },
            }}
        >
            {isLogged === undefined ? (
                <Box>
                    <CircularProgress size={"15vh"} />
                </Box>
            ) : (
                <Stack alignItems={"center"} m={0}>
                    <Avatar
                        sx={{
                            mb: 2,
                            bgcolor: "primary.main",
                            width: "70px",
                            height: "70px",
                            color: "white",
                        }}
                    >
                        <LockOpenOutlined fontSize="large" />
                    </Avatar>

                    <Typography component="h1" variant="h4" color="white">
                        Zaloguj się
                    </Typography>
                    <Stack component={"form"} onSubmit={handleLogin}>
                        <TextField
                            label="Nazwa użytkownika"
                            value={username}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setUsername(event.target.value);
                            }}
                            sx={{ mt: 5 }}
                        />
                        <TextField
                            label="Hasło"
                            type="password"
                            value={password}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword(event.target.value);
                            }}
                            sx={{ mt: 2, mb: 1 }}
                        />
                        <Button type="submit" variant="contained">
                            Zaloguj
                        </Button>
                    </Stack>
                </Stack>
            )}
        </Container>
    );
}
export default LoadingPage;

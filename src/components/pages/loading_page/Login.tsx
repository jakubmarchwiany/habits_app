import { LockOpenOutlined } from "@mui/icons-material";
import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import React, { SyntheticEvent, useState } from "react";
import { postFetch } from "utils/fetches";
import { sleep } from "utils/sleeper";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event: SyntheticEvent) => {
        event.preventDefault();

        postFetch<{ token: string }>({ username, password }, `/auth/login`).then(
            async ({ token }) => {
                Cookies.set("authorization", token, {
                    expires: 31,
                    path: "/",
                });
                await sleep(1000);
                window.location.reload();
            }
        );
    };

    return (
        <Stack alignItems={"center"}>
            <Avatar
                sx={{
                    bgcolor: "primary.main",
                    width: "5rem",
                    height: "5rem",
                    color: "white",
                }}
            >
                <LockOpenOutlined fontSize="large" />
            </Avatar>

            <Typography variant="h4" color="white" mt={1}>
                Zaloguj się
            </Typography>
            <Stack component={"form"} onSubmit={handleLogin} mt={2}>
                <TextField
                    label="Nazwa użytkownika"
                    value={username}
                    variant="filled"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setUsername(event.target.value);
                    }}
                />
                <TextField
                    label="Hasło"
                    type="password"
                    variant="filled"
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(event.target.value);
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={username == "" || password == ""}
                >
                    Zaloguj
                </Button>
            </Stack>
        </Stack>
    );
}
export default Login;

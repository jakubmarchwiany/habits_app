import { LockOpenOutlined } from "@mui/icons-material";
import {
	Avatar,
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import Cookies from "js-cookie";
import React, { SyntheticEvent, useState } from "react";
import { postFetch } from "utils/fetches";
import { sleep } from "utils/sleep";

export function Login(): JSX.Element {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	const handleLogin = (event: SyntheticEvent): void => {
		event.preventDefault();

		postFetch<{ data: { token: string } }>({ password, username }, `/auth/login`).then(
			async ({ data }) => {
				const { token } = data;

				Cookies.set("authorization", token, {
					expires: rememberMe ? 31 : undefined,
					path: "/"
				});

				await sleep(1000);

				window.location.reload();
			}
		);
	};

	return (
		<Stack alignItems="center">
			<Avatar
				sx={{
					bgcolor: "primary.main",
					color: "white",
					height: "5rem",
					width: "5rem"
				}}
			>
				<LockOpenOutlined fontSize="large" />
			</Avatar>

			<Typography color="white" mt={1} variant="h4">
				Zaloguj się
			</Typography>
			<Stack component="form" mt={2} onSubmit={handleLogin}>
				<TextField
					label="Nazwa użytkownika"
					onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
						setUsername(event.target.value);
					}}
					value={username}
					variant="filled"
				/>
				<TextField
					label="Hasło"
					onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
						setPassword(event.target.value);
					}}
					type="password"
					value={password}
					variant="filled"
				/>
				<Button
					disabled={username == "" || password == ""}
					type="submit"
					variant="contained"
				>
					Zaloguj
				</Button>
				<FormControlLabel
					control={
						<Checkbox
							onChange={(e): void => setRememberMe(e.target.checked)}
							value={rememberMe}
						/>
					}
					label="Zapamiętaj mnie"
					sx={{ color: "white" }}
				/>
			</Stack>
		</Stack>
	);
}

import { Button, Stack, TextField, Typography, styled } from "@mui/material";
import { standardSize } from "assets/theme";
import { useAppDispatch } from "hooks/redux";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHabitAction } from "store/app/habit/habit.actions";

import { EmojiSelector } from "./EmojiSelector";

const TextFieldNumber = styled(TextField)(() => ({
	"& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
		display: "none"
	},
	"& input[type=number]": {
		MozAppearance: "textfield"
	}
}));

export function CreateHabit(): JSX.Element {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [periodInDays, setPeriodInDays] = useState<number>(1);
	const [emoji, setEmoji] = useState<string | undefined>(undefined);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current !== null) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<Stack
			component="form"
			onSubmit={(e: FormEvent<HTMLFormElement>): void => {
				e.preventDefault();

				if (name !== undefined && emoji !== undefined) {
					dispatch(createHabitAction(name, description, periodInDays, emoji, navigate));
				}
			}}
			width={standardSize}
		>
			<Typography textAlign="center" typography="h2">
				Stwórz nawyk
			</Typography>

			<TextField
				autoComplete="off"
				inputRef={inputRef}
				label="Nazwa nawyku"
				onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
					setName(event.target.value);
				}}
				sx={{ mt: { md: 3, xs: 3 } }}
				value={name}
				variant="filled"
			/>

			<TextField
				label="Opis nawyku"
				multiline
				onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
					setDescription(event.target.value);
				}}
				placeholder="Opisz swój nawyk np. (3 litry wody dziennie)"
				rows={4}
				value={description}
				variant="filled"
			/>

			<TextFieldNumber
				InputProps={{ inputProps: { max: 31, min: 1 } }}
				label="Co ile dni powtarzać?"
				onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
					if (parseInt(event.target.value) < 1) {
						setPeriodInDays(1);
					} else if (parseInt(event.target.value) > 31) {
						setPeriodInDays(31);
					} else {
						setPeriodInDays(parseInt(event.target.value));
					}
				}}
				type="number"
				value={periodInDays}
				variant="filled"
			/>

			<EmojiSelector emoji={emoji} setEmoji={setEmoji} />

			<Button
				disabled={name === "" || emoji === undefined || Number.isNaN(periodInDays)}
				fullWidth
				type="submit"
				variant="contained"
			>
				Stwórz
			</Button>
		</Stack>
	);
}

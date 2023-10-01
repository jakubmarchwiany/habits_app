import { Button, Stack, styled, TextField, Typography } from "@mui/material";
import { standardSize } from "assets/theme";
import { useAppDispatch } from "hooks/redux";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHabitAction } from "store/app/habit/habit.actions";

const TextFieldNumber = styled(TextField)(() => ({
	"& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
		display: "none"
	},
	"& input[type=number]": {
		MozAppearance: "textfield"
	}
}));

export function CreateHabit(): JSX.Element {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [periodInDays, setPeriodInDays] = useState(1);

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
			width={standardSize}
			component={"form"}
			onSubmit={(e: FormEvent<HTMLFormElement>): void => {
				e.preventDefault();

				dispatch(createHabitAction(name, description, periodInDays, navigate));
			}}
		>
			<Typography typography="h2" textAlign={"center"}>
				Stwórz nawyk
			</Typography>

			<TextField
				label="Nazwa nawyku"
				value={name}
				variant="filled"
				autoComplete="off"
				inputRef={inputRef}
				onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
					setName(event.target.value);
				}}
				sx={{ mt: { xs: 3, md: 3 } }}
			/>

			<TextField
				label="Opis nawyku"
				variant="filled"
				placeholder="Opisz swój nawyk np. (3 litry wody dziennie)"
				value={description}
				multiline
				rows={4}
				onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
					setDescription(event.target.value);
				}}
			/>

			<TextFieldNumber
				label="Co ile dni powtarzać?"
				variant="filled"
				type="number"
				value={periodInDays}
				onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
					if (parseInt(event.target.value) < 1) {
						setPeriodInDays(1);
					} else if (parseInt(event.target.value) > 31) {
						setPeriodInDays(31);
					} else {
						setPeriodInDays(parseInt(event.target.value));
					}
				}}
				InputProps={{ inputProps: { min: 1, max: 31 } }}
			/>

			<Button
				variant="contained"
				type="submit"
				disabled={name === "" || Number.isNaN(periodInDays)}
				fullWidth
			>
				Stwórz
			</Button>
		</Stack>
	);
}

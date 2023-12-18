import { Button, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { standardSize } from "assets/theme";
import { useAppDispatch } from "hooks/redux";
import { EmojiSelector } from "pages/create_habit/components/EmojiSelector";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteHabitAction, updateHabitAction } from "store/app/habit/habit.actions";
import { Habit } from "store/app/habit/models/habit.type";

type Props = {
	habitToEdit: Habit;
};

export function EditHabit({ habitToEdit }: Props): JSX.Element {
	const { description, emoji, name, periodInDays } = habitToEdit;

	const [newName, setNewName] = useState<string>(name);
	const [newDescription, setNewDescription] = useState<string>(description);
	const [newPeriodInDays, setNewPeriodInDays] = useState<number>(periodInDays);
	const [newEmoji, setNewEmoji] = useState<string>(emoji);

	const dispatch = useAppDispatch();

	useEffect(() => {
		setNewName(name);

		setNewDescription(description);

		setNewPeriodInDays(periodInDays);

		setNewEmoji(emoji);
	}, [habitToEdit]);

	return (
		<Stack
			alignItems="center"
			component="main"
			sx={{
				pb: "15vh",
				pt: { sm: 2, xs: 1 }
			}}
		>
			<Stack width={standardSize}>
				<Typography sx={{ py: { md: 3, xs: 1 } }} textAlign="center" typography="h2">
					Edycja nawyku
				</Typography>
				<TextField
					autoComplete="off"
					label="Nazwa nawyku"
					onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
						setNewName(event.target.value);
					}}
					value={newName}
					variant="filled"
				/>

				<TextField
					label="Opis nawyku"
					multiline
					onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
						setNewDescription(event.target.value);
					}}
					placeholder="Opisz swój nawyk np. (3 litry wody dziennie)"
					rows={4}
					value={newDescription}
					variant="filled"
				/>

				<TextField
					InputProps={{ inputProps: { max: 31, min: 1 } }}
					label="Co ile dni powtarzać?"
					onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
						if (parseInt(event.target.value) < 1) {
							setNewPeriodInDays(1);
						} else if (parseInt(event.target.value) > 31) {
							setNewPeriodInDays(31);
						} else {
							setNewPeriodInDays(parseInt(event.target.value));
						}
					}}
					type="number"
					value={newPeriodInDays}
					variant="filled"
				/>

				<EmojiSelector emoji={newEmoji} setEmoji={setNewEmoji} />

				<Button
					disabled={
						name === newName &&
						description === newDescription &&
						periodInDays === newPeriodInDays &&
						emoji === newEmoji
					}
					fullWidth
					onClick={(): void => {
						dispatch(
							updateHabitAction(
								habitToEdit._id,
								newName,
								newDescription,
								newPeriodInDays,
								newEmoji
							)
						);
					}}
					variant="contained"
				>
					edytuj
				</Button>
				<Button
					color="error"
					fullWidth
					onClick={(): void => {
						toast.error("Kliknij dwukrotnie by usunąć nawyk");
					}}
					onDoubleClick={(): void => {
						toast.remove();

						dispatch(deleteHabitAction(habitToEdit._id));
					}}
					sx={{ mt: 5 }}
					variant="contained"
				>
					usuń
				</Button>
			</Stack>
		</Stack>
	);
}

import { Button, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { standardSize } from "assets/theme";
import { useAppDispatch } from "hooks/redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteHabitAction, updateHabitAction } from "store/app/habit/habit.actions";
import { Habit } from "store/app/habit/models/habit.type";

type Props = {
	habitToEdit: Habit;
};

export function EditHabit({ habitToEdit }: Props): JSX.Element {
	const { description, name, periodInDays } = habitToEdit;

	const [newName, setNewName] = useState(habitToEdit.name);
	const [newDescription, setNewDescription] = useState(habitToEdit.description);
	const [newPeriodInDays, setNewPeriodInDays] = useState(habitToEdit.periodInDays);

	const dispatch = useAppDispatch();

	useEffect(() => {
		setNewName(name);

		setNewDescription(description);

		setNewPeriodInDays(periodInDays);
	}, [habitToEdit]);

	return (
		<Stack
			alignItems="center"
			component="main"
			sx={{
				pt: { xs: 1, sm: 2 },
				pb: "15vh"
			}}
		>
			<Stack width={standardSize}>
				<Typography sx={{ py: { xs: 1, md: 3 } }} textAlign="center" typography="h2">
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
					InputProps={{ inputProps: { min: 1, max: 31 } }}
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
				<Button
					disabled={
						habitToEdit.name === newName &&
						habitToEdit.description === newDescription &&
						habitToEdit.periodInDays === newPeriodInDays
					}
					fullWidth
					onClick={(): void => {
						dispatch(
							updateHabitAction(
								habitToEdit._id,
								newName,
								newDescription,
								newPeriodInDays
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

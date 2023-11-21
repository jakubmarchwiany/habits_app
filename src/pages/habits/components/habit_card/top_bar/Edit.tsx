import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useAppDispatch } from "hooks/redux";
import { useState } from "react";
import { updateHabitAction } from "store/app/habit/habit.actions";

type Props = {
	_id: string;
	description: string;
	name: string;
	periodInDays: number;
	setIsShow: (arg0: boolean) => void;
};

export function Edit({ _id, description, name, periodInDays, setIsShow }: Props): JSX.Element {
	const [newName, setNewName] = useState(name);
	const [newDescription, setNewDescription] = useState(description);
	const [newPeriodInDays, setNewPeriodInDays] = useState(periodInDays);

	const dispatch = useAppDispatch();

	const handleUpdateHabit = (): void => {
		dispatch(updateHabitAction(_id, newName, newDescription, newPeriodInDays));

		setIsShow(false);
	};

	return (
		<Dialog fullWidth open={true}>
			<DialogTitle textAlign="center" variant="h3">
				Edytuj nawyk
			</DialogTitle>
			<DialogContent>
				<Stack>
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
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button fullWidth onClick={(): void => setIsShow(false)}>
					Anuluj
				</Button>
				<Button disabled={name.length === 0} fullWidth onClick={handleUpdateHabit}>
					Zmień
				</Button>
			</DialogActions>
		</Dialog>
	);
}

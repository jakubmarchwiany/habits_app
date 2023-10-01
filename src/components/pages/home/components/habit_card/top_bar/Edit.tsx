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
		<Dialog open={true} fullWidth>
			<DialogTitle textAlign="center" variant="h3">
				Edytuj nawyk
			</DialogTitle>
			<DialogContent>
				<Stack>
					<TextField
						label="Nazwa nawyku"
						value={newName}
						variant="filled"
						autoComplete="off"
						onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
							setNewName(event.target.value);
						}}
					/>

					<TextField
						label="Opis nawyku"
						variant="filled"
						placeholder="Opisz swój nawyk np. (3 litry wody dziennie)"
						value={newDescription}
						multiline
						rows={4}
						onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
							setNewDescription(event.target.value);
						}}
					/>

					<TextField
						label="Co ile dni powtarzać?"
						variant="filled"
						type="number"
						value={newPeriodInDays}
						onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
							if (parseInt(event.target.value) < 1) {
								setNewPeriodInDays(1);
							} else if (parseInt(event.target.value) > 31) {
								setNewPeriodInDays(31);
							} else {
								setNewPeriodInDays(parseInt(event.target.value));
							}
						}}
						InputProps={{ inputProps: { min: 1, max: 31 } }}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button fullWidth onClick={(): void => setIsShow(false)}>
					Anuluj
				</Button>
				<Button fullWidth onClick={handleUpdateHabit} disabled={name.length === 0}>
					Zmień
				</Button>
			</DialogActions>
		</Dialog>
	);
}

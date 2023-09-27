import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Habit } from "store/models/habit";

type Props = {
    editHabitHandle: (name?: string, description?: string, periodInDays?: number) => void;
    habit: Habit;
};

export function EditHabitDialog({ habit, editHabitHandle: action }: Props): JSX.Element {
    const [name, setName] = useState(habit.name);
    const [description, setDescription] = useState(habit.description || "");
    const [periodInDays, setPeriodInDays] = useState(habit.periodInDays);

    const handleEditHabit = (): void => {
        action(name, description, periodInDays);
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
                        value={name}
                        variant="filled"
                        autoComplete="off"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                            setName(event.target.value);
                        }}
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

                    <TextField
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
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button fullWidth onClick={(): void => action()}>
                    Anuluj
                </Button>
                <Button fullWidth onClick={handleEditHabit} disabled={name.length === 0}>
                    Zmień
                </Button>
            </DialogActions>
        </Dialog>
    );
}

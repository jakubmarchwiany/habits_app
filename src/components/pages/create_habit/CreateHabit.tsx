import { Button, Stack, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "hooks/redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHabit } from "store/app-actions";

export function CreateHabit(): JSX.Element {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [periodInDays, setPeriodInDays] = useState(1);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleCreateHabit = (): void => {
        dispatch(createHabit(name, description, periodInDays, navigate));
    };

    return (
        <Stack
            component="main"
            sx={{
                px: { xs: 1, md: 3 },
                py: { xs: 1, md: 3 }
            }}
            alignItems="center"
        >
            <Typography typography="h3">Stwórz nawyk</Typography>

            <TextField
                label="Nazwa nawyku"
                value={name}
                variant="filled"
                autoComplete="off"
                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                    setName(event.target.value);
                }}
                sx={{ mt: { xs: 1, md: 3 }, width: { xs: "90%", md: "25%" } }}
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
                sx={{ width: { xs: "90%", md: "25%" } }}
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
                sx={{ width: { xs: "90%", md: "25%" } }}
            />

            <Button
                variant="contained"
                onClick={handleCreateHabit}
                sx={{ mt: 0.5, width: { xs: "90%", md: "25%" } }}
                disabled={name === ""}
            >
                Stwórz
            </Button>
        </Stack>
    );
}

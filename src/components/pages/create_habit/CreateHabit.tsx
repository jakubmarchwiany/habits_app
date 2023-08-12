import { Button, Stack, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "hooks/redux";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createHabit } from "store/app-actions";

function CreateHabit() {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [periodInDays, setPeriodInDays] = React.useState(1);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleCreateHabit = () => {
        dispatch(createHabit(name, description, periodInDays, navigate));
    };

    return (
        <Stack
            component="main"
            sx={{
                px: { xs: 1, md: 3 },
                py: { xs: 1, md: 3 },
            }}
            alignItems="center"
        >
            <Typography typography="h3">Stwórz nawyk</Typography>

            <TextField
                label="Nazwa nawyku"
                value={name}
                variant="filled"
                autoComplete="off"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setName(event.target.value);
                }}
                sx={{ mt: { xs: 1, md: 3 }, width: { xs: "90%", md: "25%" } }}
            />

            <TextField
                label="Opis nawyku"
                variant="filled"
                value={description}
                multiline
                rows={4}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setDescription(event.target.value);
                }}
                sx={{ width: { xs: "90%", md: "25%" } }}
            />

            <TextField
                label="Co ile dni powtarzać?"
                variant="filled"
                type="number"
                value={periodInDays}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (parseInt(event.target.value) < 1) setPeriodInDays(1);
                    else if (parseInt(event.target.value) > 31) setPeriodInDays(31);
                    else setPeriodInDays(parseInt(event.target.value));
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

export default CreateHabit;

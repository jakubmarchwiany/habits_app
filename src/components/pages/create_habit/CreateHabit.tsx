import { Button, Stack, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "hooks/redux";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createHabit } from "store/app-actions";


function CreateHabit() {
    const [habitName, setHabitName] = React.useState("");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleCreateHabit = () => {
        dispatch(createHabit(habitName, navigate));
    };

    return (
        <Stack
            component="main"
            sx={{
                px: { xs: 10, sm: 30, md: 40, lg: 50, xl: 70 },
            }}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Typography typography="h2" mt={5}>
                Stwórz nawyk
            </Typography>

            <TextField
                label="Nazwa nawyku"
                value={habitName}
                fullWidth
                autoComplete="off"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setHabitName(event.target.value);
                }}
                sx={{ mt: 5 }}
            />

            <Button
                fullWidth
                variant="contained"
                onClick={handleCreateHabit}
                sx={{ mt: 1 }}
                disabled={habitName === ""}
            >
                Stwórz
            </Button>
        </Stack>
    );
}

export default CreateHabit;

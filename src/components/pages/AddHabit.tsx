import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";

function AddHabit() {
    const [habitName, setHabitName] = React.useState("");

    const handleAddHabit = () => {
        console.log(habitName);
    };

    return (
        <Stack
            component="main"
            display="flex"
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Typography typography="h2" mt={5}>
                Dodaj nawyk
            </Typography>
            <TextField
                label="Nazwa nawyku"
                value={habitName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setHabitName(event.target.value);
                }}
                sx={{ mt: 5 }}
            />
            <Button onClick={handleAddHabit} variant="contained" sx={{ mt: 1 }}>
                Dodaj
            </Button>
        </Stack>
    );
}

export default AddHabit;

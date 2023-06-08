import { Button, Stack, TextField, Typography } from "@mui/material";
import { postFetch } from "components/utils/fetches";
import React from "react";
import { useNavigate } from "react-router-dom";

function AddHabit() {
    const [habitName, setHabitName] = React.useState("");
    const [habitActivityPerDay, setHabitActivityPerDay] = React.useState(1);

    const navigate = useNavigate();

    const handleAddHabit = () => {
        postFetch(
            { name: habitName, numberOfActivitiesPerDay: habitActivityPerDay },
            "/user/habit/add"
        ).then(() => {
            navigate("/");
        });
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
                Dodaj nawyk
            </Typography>

            <TextField
                label="Nazwa nawyku"
                value={habitName}
                fullWidth
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setHabitName(event.target.value);
                }}
                sx={{ mt: 5 }}
            />
            <TextField
                color="primary"
                type="number"
                InputProps={{
                    inputProps: {
                        max: 100,
                        min: 1,
                    },
                }}
                label="Nazwa nawyku"
                value={habitActivityPerDay}
                fullWidth
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setHabitActivityPerDay(parseInt(event.target.value));
                }}
                sx={{ mt: 5 }}
            />

            <Button
                fullWidth
                variant="contained"
                onClick={handleAddHabit}
                sx={{ mt: 1 }}
                disabled={habitName === ""}
            >
                Dodaj
            </Button>
        </Stack>
    );
}

export default AddHabit;

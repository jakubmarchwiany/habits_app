import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

type Props = {
    name: string;
    action: (newName: string) => void;
};

export default function ChangeNameDialog({ name, action }: Props) {
    const [newName, setNewName] = useState(name);

    return (
        <Dialog open={true}>
            <DialogTitle textAlign="center" variant="h3">
                Zmiana nazwy
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Nazwa nawyku"
                    value={newName}
                    fullWidth
                    autoComplete="off"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNewName(event.target.value);
                    }}
                    sx={{ mt: 5 }}
                />
            </DialogContent>
            <DialogActions>
                <Button fullWidth onClick={() => action("")}>
                    Anuluj
                </Button>
                <Button fullWidth onClick={() => action(newName)}>
                    Zmień
                </Button>
            </DialogActions>
        </Dialog>
    );
}

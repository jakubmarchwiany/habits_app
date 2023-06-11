import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ColorThemeSettings() {
    const [themeColor, setThemeColor] = useState("");

    const handleSave = () => {
        localStorage.setItem("themeColor", themeColor);

        toast.success("Zapisano kolor motywu");
    };

    useEffect(() => {
        const color = localStorage.getItem("themeColor");

        if (color) {
            setThemeColor(color);
        }
    }, []);

    return (
        <TextField
            label="Kolor motywu"
            variant="outlined"
            value={themeColor}
            autoComplete="off"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setThemeColor(event.target.value);
            }}
            InputProps={{
                // startAdornment: <InputAdornment position="start">#</InputAdornment>,
                endAdornment: (
                    <IconButton onClick={handleSave}>
                        <SaveIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                ),
            }}
        />
    );
}

export default ColorThemeSettings;

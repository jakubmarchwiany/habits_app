import Box from "@mui/material/Box";

import { Add, Home, Settings } from "@mui/icons-material";
import { SpeedDial, SpeedDialIcon } from "@mui/material";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useNavigate } from "react-router-dom";

enum Actions {
    Dashboard = "Nawyki",
    Add = "Dodaj nawyk",
    Settings = "Ustawienia",
}

const actions = [
    { icon: <Home />, name: Actions.Dashboard },
    { icon: <Add />, name: Actions.Add },
    { icon: <Settings />, name: Actions.Settings },
];

function SpeedDialNavigator() {
    const navigate = useNavigate();

    const handleClick = (action: string) => {
        console.log(action);
        switch (action) {
            case Actions.Dashboard:
                navigate("/");
                break;
            case Actions.Add:
                navigate("/create_habit");
                break;
            case Actions.Settings:
                navigate("/settings");
                break;
            default:
        }
    };

    return (
        <Box sx={{ position: "fixed", bottom: "5vh", right: "5vh" }}>
            <SpeedDial
                ariaLabel="SpeedDial"
                icon={<SpeedDialIcon />}
                sx={{
                    "& .MuiFab-primary": {
                        width: { md: 70 },
                        height: { md: 70 },
                    },
                }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleClick(action.name)}
                        sx={{ width: 50, height: 50, color: "white" }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
export default SpeedDialNavigator;

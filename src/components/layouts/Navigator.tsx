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

function Navigator() {
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
        <Box sx={{ position: "fixed", bottom: "2%", right: "1%" }}>
            <SpeedDial
                ariaLabel="SpeedDial"
                icon={<SpeedDialIcon />}
                sx={{
                    "& .MuiFab-primary": {
                        width: { xs: "2.5rem", md: "3.5rem" },
                        height: { xs: "2.5rem", md: "3.5rem" },
                    },
                }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleClick(action.name)}
                        sx={{
                            width: { xs: "2rem", md: "2.5rem" },
                            height: { xs: "2rem", md: "2.5rem" },
                            color: "white",
                        }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
export default Navigator;

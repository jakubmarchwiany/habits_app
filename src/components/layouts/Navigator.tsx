import { Dashboard, PostAdd, Settings } from "@mui/icons-material";
import { SpeedDial, SpeedDialIcon } from "@mui/material";
import Box from "@mui/material/Box";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useNavigate } from "react-router-dom";

enum Pages {
    habits = "Nawyki",
    Create = "Dodaj nawyk",
    Settings = "Ustawienia",
}

const actions = [
    { icon: <Dashboard />, name: Pages.habits },
    { icon: <PostAdd />, name: Pages.Create },
    { icon: <Settings />, name: Pages.Settings },
];

function Navigator() {
    const navigate = useNavigate();

    const handleClick = (action: string) => {
        switch (action) {
            case Pages.habits:
                navigate("/");
                break;
            case Pages.Create:
                navigate("/create_habit");
                break;
            case Pages.Settings:
                navigate("/settings");
                break;
            default:
        }
    };

    return (
        <Box sx={{ position: "fixed", bottom: "10px", right: "10px" }}>
            <SpeedDial
                ariaLabel="SpeedDial"
                icon={<SpeedDialIcon />}
                direction="left"
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

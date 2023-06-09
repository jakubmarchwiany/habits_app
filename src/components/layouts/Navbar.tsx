import { DarkMode, Favorite, LightMode } from "@mui/icons-material";
import { IconButton, Stack, Theme, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MuiLink from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import MyLinkButton from "components/my/MyLinkButton";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
    switchMode: () => void;
}

function Navbar({ switchMode }: NavbarProps) {
    const theme = useTheme<Theme>();
    const location = useLocation();

    return (
        <AppBar
            elevation={0}
            position="sticky"
            sx={{
                bgcolor: "primary.main",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between", alignContent: "center", my: 0 }}>
                <Stack direction="row" alignItems="center">
                    <Favorite
                        fontSize="large"
                        sx={{
                            mr: 2,
                            color: "#fff",
                        }}
                    />
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <MuiLink
                            component="p"
                            variant="h6"
                            underline="hover"
                            sx={{
                                color: "#fff",
                            }}
                        >
                            Bobciowo
                        </MuiLink>
                    </Link>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <MyLinkButton
                        to="plans"
                        text="Plany"
                        textColor="white"
                        isActive={location.pathname === `/plans`}
                    />
                    <MyLinkButton
                        to="create_habit"
                        text="Stwórz nawyk"
                        textColor="white"
                        isActive={location.pathname === `/create_habit`}
                    />
                    <MyLinkButton
                        to="settings"
                        text="Ustawienia"
                        textColor="white"
                        isActive={location.pathname === `/settings`}
                    />
                    <IconButton sx={{ ml: 1 }} onClick={switchMode} color="inherit">
                        {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;

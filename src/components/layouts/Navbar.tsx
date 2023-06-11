import { Favorite } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MyLinkButton from "components/my/MyLinkButton";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    return (
        <AppBar
            elevation={0}
            position="sticky"
            sx={{
                bgcolor: "primary.main",
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    alignContent: "center",
                    my: 0,
                }}
            >
                <Stack direction="row" alignItems="center">
                    <Favorite
                        fontSize="large"
                        sx={{
                            mr: 2,
                        }}
                    />
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: "primary.contrastText",
                            }}
                        >
                            Bobciowo
                        </Typography>
                    </Link>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <MyLinkButton
                        to="plans"
                        text="Plany"
                        isActive={location.pathname === `/plans`}
                    />
                    <MyLinkButton
                        to="create_habit"
                        text="Stwórz nawyk"
                        isActive={location.pathname === `/create_habit`}
                    />
                    <MyLinkButton
                        to="settings"
                        text="Ustawienia"
                        isActive={location.pathname === `/settings`}
                    />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;

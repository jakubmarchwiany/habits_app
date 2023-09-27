import { Box, CircularProgress, Container } from "@mui/material";
import { Login } from "components/pages/loading_page/Login";

type Props = {
    isLogged: boolean | undefined;
};

export function LoadingPage({ isLogged }: Props): JSX.Element {
    return (
        <Container
            component="main"
            maxWidth={false}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#424242"
            }}
        >
            {isLogged === undefined ? (
                <Box>
                    <CircularProgress size={"15vh"} />
                </Box>
            ) : (
                <Login />
            )}
        </Container>
    );
}

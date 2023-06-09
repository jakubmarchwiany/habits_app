import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Error() {
    return (
        <Container
            sx={{
                display: "flex",
                backgroundColor: "#424242",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                minWidth: "100vw",
                color: "gray",
            }}
        >
            <Typography sx={{ fontSize: "5vw", marginBottom: "1rem" }}>
                Nie znaleziono strony
            </Typography>
            <Typography sx={{ fontSize: "3vw", marginBottom: "1rem" }}>
                Ups! Strona, której szukasz, nie została znaleziona.
            </Typography>
            <Typography sx={{ fontSize: "4vw", marginBottom: "1rem" }}>
                <Link to="/">Wróć do strony głównej</Link>
            </Typography>
        </Container>
    );
}
export default Error;

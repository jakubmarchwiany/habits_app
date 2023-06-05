import { Container, Link, Typography } from "@mui/material";

function Error() {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            <Typography sx={{ fontSize: "2rem", marginBottom: "1rem" }} variant="h2" component="h1">
                Page Not Found
            </Typography>
            <Typography sx={{ fontSize: "1rem", marginBottom: "1rem" }} variant="body1">
                Oops! The page you are looking for could not be found.
            </Typography>
            <Typography sx={{ fontSize: "1rem", marginBottom: "1rem" }} variant="body1">
                Go back to <Link href="/">homepage</Link>.
            </Typography>
        </Container>
    );
}
export default Error;

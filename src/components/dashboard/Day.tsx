import { Box } from "@mui/material";

type Props = {
    isDone?: boolean;
};

function Day({ isDone }: Props) {
    return (
        <Box
            width={"2vh"}
            height={"2vh"}
            boxShadow={5}
            borderRadius={1}
            bgcolor={isDone ? "primary.main" : ""}
            // {(isDone && { bgcolor: "secondary.main" })}
        ></Box>
    );
}

export default Day;

import {
    SentimentDissatisfied,
    SentimentSatisfied,
    SentimentSatisfiedAlt,
    SentimentVeryDissatisfied,
    SentimentVerySatisfied,
} from "@mui/icons-material";
import * as React from "react";

const customIcons: React.ReactElement[] = [
    <SentimentVeryDissatisfied sx={{ color: "#FF0000", fontSize: { xs: "1rem", md: "1.5rem" } }} />,
    <SentimentDissatisfied sx={{ color: "#FF6600", fontSize: { xs: "1rem", md: "1.5rem" } }} />,
    <SentimentSatisfied sx={{ color: "#FFFF00", fontSize: { xs: "1rem", md: "1.5rem" } }} />,
    <SentimentSatisfiedAlt sx={{ color: "#33FF33", fontSize: { xs: "1rem", md: "1.5rem" } }} />,
    <SentimentVerySatisfied sx={{ color: "#00FF00", fontSize: { xs: "1rem", md: "1.5rem" } }} />,
];

type Props = {
    rate: number;
};

export default function GoalRate({ rate }: Props) {
    let index;

    if (rate < 0.2) {
        index = 0;
    } else if (rate < 0.4) {
        index = 1;
    } else if (rate < 0.6) {
        index = 2;
    } else if (rate < 0.8) {
        index = 3;
    } else {
        index = 4;
    }

    return customIcons[index];
}

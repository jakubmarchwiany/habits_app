import {
    SentimentDissatisfied,
    SentimentSatisfied,
    SentimentSatisfiedAlt,
    SentimentVeryDissatisfied,
    SentimentVerySatisfied
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import * as React from "react";

const rateIcons: React.ReactElement[] = [
    <SentimentVeryDissatisfied />,
    <SentimentDissatisfied />,
    <SentimentSatisfied />,
    <SentimentSatisfiedAlt />,
    <SentimentVerySatisfied />
];

const THRESHOLDVALUES = [
    { value: 0.2, color: "#FF0000" },
    { value: 0.4, color: "#FF6600" },
    { value: 0.6, color: "#FFFF00" },
    { value: 0.8, color: "#33FF33" },
    { value: Number.MAX_VALUE, color: "#00FF00" }
];

type Props = {
    rate: number;
};

export function GoalRate({ rate }: Props): JSX.Element {
    const index = THRESHOLDVALUES.findIndex((threshold) => rate < threshold.value);

    const icon = rateIcons[index];
    const color = THRESHOLDVALUES[index].color;

    return (
        <Tooltip title={`Cel osiągnięty w ${Math.floor(rate * 100)}%`} placement="top">
            {React.cloneElement(icon, {
                sx: { fontSize: { xs: "1.5rem", md: "1.5rem" }, color: color, p: 0, m: 0 }
            })}
        </Tooltip>
    );
}

import {
	SentimentDissatisfied,
	SentimentNeutral,
	SentimentSatisfied,
	SentimentSatisfiedAlt,
	SentimentVeryDissatisfied,
	SentimentVerySatisfied
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import * as React from "react";

const rateIcons: [string, React.ReactElement][] = [
	["#FFF", <SentimentNeutral />],
	["#FF0000", <SentimentVeryDissatisfied />],
	["#FF6600", <SentimentDissatisfied />],
	["#FFFF00", <SentimentSatisfied />],
	["#33FF33", <SentimentSatisfiedAlt />],
	["#00FF00", <SentimentVerySatisfied />]
];

type Props = {
	goalRate: { level: number; value: number };
};

export function GoalRate({ goalRate }: Props): JSX.Element {
	return (
		<Tooltip title={`Cel osiągnięty w ${Math.floor(goalRate.value * 100)}%`} placement="top">
			{React.cloneElement(rateIcons[goalRate.level][1], {
				sx: {
					fontSize: { xs: "1.5rem", md: "1.5rem" },
					color: rateIcons[goalRate.level][0],
					p: 0,
					m: 0
				}
			})}
		</Tooltip>
	);
}

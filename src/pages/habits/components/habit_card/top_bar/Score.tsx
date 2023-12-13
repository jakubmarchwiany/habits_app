import { Box, CircularProgress, Typography } from "@mui/material";

function valueToColor(value: number): string {
	if (value >= 1) {
		return "hsl(120, 100%, 50%)";
	} else {
		return `hsl(${value * 100}, 100%, 50%)`;
	}
}

type Props = {
	score: number;
};

export function Score({ score }: Props): JSX.Element {
	return (
		<Box sx={{ display: "inline-flex", position: "relative" }}>
			<CircularProgress
				size={30}
				sx={{ color: valueToColor(score) }}
				value={score >= 1 ? 100 : score * 100}
				variant="determinate"
			/>
			<Box
				sx={{
					alignItems: "center",
					bottom: 0,
					display: "flex",
					justifyContent: "center",
					left: 0,
					position: "absolute",
					right: 0,
					top: 0
				}}
			>
				{/* {`${Math.round(score * 100)}`} */}
				<Typography component="div">{`${Math.round(score * 100)}`}</Typography>
			</Box>
		</Box>
	);
}

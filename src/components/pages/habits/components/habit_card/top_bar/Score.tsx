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
		<Box sx={{ position: "relative", display: "inline-flex" }}>
			<CircularProgress
				size={30}
				variant="determinate"
				value={score >= 1 ? 100 : score * 100}
				sx={{ color: valueToColor(score) }}
			/>
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				{/* {`${Math.round(score * 100)}`} */}
				<Typography component="div">{`${Math.round(score * 100)}`}</Typography>
			</Box>
		</Box>
	);
}

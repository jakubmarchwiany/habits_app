import { Box, Tooltip, Typography, Zoom } from "@mui/material";

type Props = {
	description: string;
	name: string;
	periodInDays: number;
	score: number;
};
export function TopBarHabitExplorer({
	description,
	name,
	periodInDays,
	score
}: Props): JSX.Element {
	return (
		<Box
			sx={{
				alignItems: "center",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				mx: 1
			}}
		>
			{/* <Score score={score} /> */}
			<Tooltip
				TransitionComponent={Zoom}
				placement="top"
				title={
					<>
						<Typography variant="h6">Opis</Typography>
						<Typography variant="body1">{description}</Typography>
						<Typography variant="h6">Powtarzany co {periodInDays} dni</Typography>
					</>
				}
			>
				<Typography
					sx={{
						typography: { md: "h4", xs: "h4" },
						wordBreak: "break-word"
					}}
					textAlign="center"
				>
					{name}
				</Typography>
			</Tooltip>
			<Box sx={{ width: "1.5rem" }} />
		</Box>
	);
}

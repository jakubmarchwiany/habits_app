import { Box, Tooltip, Typography, Zoom } from "@mui/material";
import { Score } from "pages/habits/components/habit_card/top_bar/Score";

type Props = {
	description: string;
	name: string;
	periodInDays: number;
	score: number;
};
export function DearTopBar({ description, name, periodInDays, score }: Props): JSX.Element {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				mx: 1,
				alignItems: "center"
			}}
		>
			<Score score={score} />
			<Tooltip
				TransitionComponent={Zoom}
				placement="top"
				sx={{ fontSize: "50px" }}
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
						wordBreak: "break-word",
						typography: { xs: "h4", md: "h4" }
					}}
					textAlign="center"
				>
					{name}
				</Typography>
			</Tooltip>
			<div style={{ width: "24px" }} />
		</Box>
	);
}

import { Box, Tooltip, Typography, Zoom } from "@mui/material";
import { Score } from "components/pages/habits/components/habit_card/top_bar/Score";

type Props = {
	description: string;
	score: number;
	name: string;
	periodInDays: number;
};
export function DearTopBar({ name, description, periodInDays, score }: Props): JSX.Element {
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
				title={
					<>
						<Typography variant="h6">Opis</Typography>
						<Typography variant="body1">{description}</Typography>
						<Typography variant="h6">Powtarzany co {periodInDays} dni</Typography>
					</>
				}
				placement="top"
				TransitionComponent={Zoom}
				sx={{ fontSize: "50px" }}
			>
				<Typography
					textAlign="center"
					sx={{
						wordBreak: "break-word",
						typography: { xs: "h4", md: "h4" }
					}}
				>
					{name}
				</Typography>
			</Tooltip>
			<div style={{ width: "24px" }} />
		</Box>
	);
}

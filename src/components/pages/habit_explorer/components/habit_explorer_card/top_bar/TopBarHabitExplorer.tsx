import { Box, Tooltip, Typography, Zoom } from "@mui/material";
import { GoalRate } from "components/pages/home/components/habit_card/top_bar/GoalRate";

type Props = {
	description: string;
	goalRate: { level: number; value: number };
	name: string;
	periodInDays: number;
};
export function TopBarHabitExplorer({
	name,
	description,
	periodInDays,
	goalRate
}: Props): JSX.Element {
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
			<GoalRate goalRate={goalRate} />
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
			<Box sx={{ width: "1.5rem" }} />
		</Box>
	);
}
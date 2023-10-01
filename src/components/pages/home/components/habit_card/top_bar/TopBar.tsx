import { Box, Tooltip, Typography, Zoom } from "@mui/material";

import { GoalRate } from "./GoalRate";
import { Menu } from "./Menu";

type Props = {
	_id: string;
	description: string;
	goalRate: { level: number; value: number };
	name: string;
	periodInDays: number;
};
export function TopBar({ _id, name, description, periodInDays, goalRate }: Props): JSX.Element {
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
			<Menu _id={_id} name={name} description={description} periodInDays={periodInDays} />
		</Box>
	);
}

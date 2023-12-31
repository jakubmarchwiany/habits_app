import { Box, Tooltip, Typography, Zoom } from "@mui/material";

import { Menu } from "./Menu";
import { Score } from "./Score";

type Props = {
	_id: string;
	description: string;
	name: string;
	periodInDays: number;
	score: number;
};
export function TopBar({ _id, description, name, periodInDays, score }: Props): JSX.Element {
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
			<Menu _id={_id} description={description} name={name} periodInDays={periodInDays} />
		</Box>
	);
}

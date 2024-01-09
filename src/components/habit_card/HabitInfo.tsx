import { Stack, Tooltip, Typography, Zoom } from "@mui/material";

type Props = {
	description: string;
	emoji: string;
	name: string;
	periodInDays: number;
};

export function HabitInfo({ description, emoji, name, periodInDays }: Props): JSX.Element {
	return (
		<Stack alignItems="center" direction="row" id="card" mr={1}>
			<Tooltip
				TransitionComponent={Zoom}
				placement="top"
				sx={{ fontSize: "50px" }}
				title={
					<>
						<Typography variant="body1">{description}</Typography>
						<Typography variant="body1">Co {periodInDays} dni</Typography>
					</>
				}
			>
				<Typography
					id="emoji"
					sx={{
						borderRadius: 5,
						boxShadow: 5,
						fontSize: "50px",
						lineHeight: 1,
						p: 1.5
					}}
				>
					{emoji}
				</Typography>
			</Tooltip>

			<div id="info">
				<Typography mx={2} noWrap variant="h4">
					{name}
				</Typography>
			</div>
		</Stack>
	);
}

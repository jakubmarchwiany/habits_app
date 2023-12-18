import { Stack, Tooltip, Typography, Zoom } from "@mui/material";
import { useAppSelector } from "hooks/redux";

import { Activitiesv2 } from "./Activitiesv2";
import "./habitsv2.css";

type Props = {
	_id: string;
};
export function Habitv2({ _id }: Props): JSX.Element {
	const showAllHabits = useAppSelector((s) => s.app.showAllHabits);

	const habit = useAppSelector((s) => {
		return s.app.habits?.find((g) => g._id === _id);
	});

	if (habit === undefined || !(habit.show || showAllHabits)) {
		return <></>;
	}

	const { activities, description, emoji, name, periodInDays, score: goalRate } = habit;

	return (
		<Stack
			borderRadius={7}
			boxShadow={5}
			className="test"
			direction="row"
			my={1}
			px={2}
			py={1.5}
			sx={{
				background: `linear-gradient(8deg, rgba(0,173, 95,${goalRate / 1.5}) ${
					goalRate * 100 - 5
				}%, rgba(211, 49, 49,${goalRate === 0 ? 0 : (1 - goalRate) / 1.5}) ${
					goalRate * 100
				}%)`
			}}
		>
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

			<Activitiesv2 activities={activities} habitId={_id} />
		</Stack>
	);
}

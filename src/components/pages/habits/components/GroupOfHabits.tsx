import { Chip, Divider, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAppSelector } from "hooks/redux";

import { Habit } from "./Habit";

type Props = {
	_id: string;
};
export function GroupOfHabits({ _id }: Props): JSX.Element {
	const showAllHabits = useAppSelector((s) => s.app.showAllHabits);
	const groupOfHabits = useAppSelector((s) => {
		return s.app.groupsOfHabits?.find((g) => g._id === _id);
	});

	if (groupOfHabits === undefined || !(groupOfHabits.show || showAllHabits)) {
		return <></>;
	}

	const generateHabits = (): JSX.Element[] | JSX.Element => {
		if (groupOfHabits.habitsIds !== undefined && groupOfHabits.habitsIds.length > 0) {
			return groupOfHabits.habitsIds.map((g) => <Habit key={`habit_${g}`} _id={g} />);
		} else {
			return <Typography variant="h5">Nie masz żadnego nawyku w grupie</Typography>;
		}
	};

	return (
		<Stack>
			<Divider
				sx={{
					"&.MuiDivider-root": {
						"&::before": {
							borderTopWidth: 4
						},
						"&::after": {
							borderTopWidth: 4
						}
					}
				}}
			>
				<Chip
					label={groupOfHabits.name.toUpperCase()}
					sx={{
						color: "primary.main",
						fontSize: { xs: "1.5rem", md: "2.5rem" },
						py: { xs: 2.5, md: 3.5 }
					}}
				/>
			</Divider>

			<Grid2
				container
				spacing={{ xs: 1, md: 2 }}
				rowSpacing={2}
				id={"habit_group_grid_" + groupOfHabits._id}
				key={"habit_group_grid_" + groupOfHabits._id}
				mx={{ xs: 1, md: 3 }}
				mt={1.5}
				mb={1}
			>
				{generateHabits()}
			</Grid2>
		</Stack>
	);
}

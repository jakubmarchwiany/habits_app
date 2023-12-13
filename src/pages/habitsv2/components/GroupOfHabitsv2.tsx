import { Chip, Divider, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAppSelector } from "hooks/redux";

import { Habitv2 } from "./Habitv2";

type Props = {
	_id: string;
};
export function GroupOfHabitsv2({ _id }: Props): JSX.Element {
	const showAllHabits = useAppSelector((s) => s.app.showAllHabits);
	const groupOfHabits = useAppSelector((s) => {
		return s.app.groupsOfHabits?.find((g) => g._id === _id);
	});

	if (groupOfHabits === undefined || !(groupOfHabits.show || showAllHabits)) {
		return <></>;
	}

	const generateHabits = (): JSX.Element | JSX.Element[] => {
		if (groupOfHabits.habitsIds !== undefined && groupOfHabits.habitsIds.length > 0) {
			return groupOfHabits.habitsIds.map((g) => <Habitv2 _id={g} key={`habit_${g}`} />);
		} else {
			return <Typography variant="h5">Nie masz żadnego nawyku w grupie</Typography>;
		}
	};

	return (
		<Stack>
			<Divider
				sx={{
					"&.MuiDivider-root": {
						"&::after": {
							borderTopWidth: 4
						},
						"&::before": {
							borderTopWidth: 4
						}
					}
				}}
			>
				<Chip
					label={groupOfHabits.name.toUpperCase()}
					sx={{
						fontSize: { md: "2.5rem", xs: "1.5rem" },
						py: { md: 3.5, xs: 2.5 }
					}}
				/>
			</Divider>

			<Stack
				id={"habit_group_grid_" + groupOfHabits._id}
				key={"habit_group_grid_" + groupOfHabits._id}
				mb={1}
				mt={1.5}
				mx={{ md: 3, xs: 1 }}
			>
				{generateHabits()}
			</Stack>
		</Stack>
	);
}

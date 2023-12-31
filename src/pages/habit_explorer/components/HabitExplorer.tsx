import { Stack } from "@mui/material";
import { standardSize } from "assets/theme";
import dayjs from "dayjs";
import { useAppSelector } from "hooks/redux";
import { ErrorPage } from "layouts/ErrorPage";
import { useEffect, useState } from "react";
import { Activity } from "store/app/activity/models/activity.type";
import { Habit } from "store/app/habit/models/habit.type";
import { computeActivitiesDoneOrNotDone, computeHabit } from "utils/compute";
import { getFetch } from "utils/fetches";

import { DaysFromSlider } from "./habit_explorer_card/DaysFromSlider";
import { ActivitiesHabitExplorer } from "./habit_explorer_card/activities/ActivitiesHabitExplorer";
import { TopBarHabitExplorer } from "./habit_explorer_card/top_bar/TopBarHabitExplorer";

type Props = {
	_id: string;
};

export function HabitExplorer({ _id }: Props): JSX.Element {
	const habit = useAppSelector((s) => {
		return s.app.habits?.find((g) => g._id === _id);
	});

	const [explorerHabit, setExplorerHabit] = useState<Habit | undefined>(undefined);
	const [nDaysFrom, setNDaysFrom] = useState(31);

	useEffect(() => {
		if (habit !== undefined) {
			const dateFrom = dayjs()
				.startOf("day")
				.subtract(nDaysFrom - 1, "days");

			getFetch<{ data: { activities: Activity[] } }>(
				`/habits/${_id}/activities?dateFrom=${dateFrom.toString()}`
			).then(({ data }) => {
				const { activities } = data;

				let tmpHabit = { ...habit, activities };

				tmpHabit = computeActivitiesDoneOrNotDone(tmpHabit, nDaysFrom);

				tmpHabit = computeHabit(tmpHabit);

				setExplorerHabit(tmpHabit);
			});
		}
	}, [nDaysFrom]);

	if (habit === undefined || explorerHabit === undefined) {
		return <ErrorPage />;
	}

	const { description, name, periodInDays, score: goalRate } = explorerHabit;

	return (
		<Stack
			p={0.5}
			pt={{ xs: 1 }}
			sx={{
				border: 3.5,
				borderRadius: 4,
				borderColor: "background.default"
			}}
			width={standardSize}
		>
			<TopBarHabitExplorer
				description={description}
				name={name}
				periodInDays={periodInDays}
				score={goalRate}
			/>

			<DaysFromSlider nDaysFrom={nDaysFrom} setNDaysFrom={setNDaysFrom} />

			<ActivitiesHabitExplorer
				explorerHabit={explorerHabit}
				setExplorerHabit={setExplorerHabit}
			/>
		</Stack>
	);
}

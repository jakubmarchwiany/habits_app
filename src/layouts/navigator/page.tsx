import { App } from "layouts/App";
import { NotFoundPage } from "layouts/NotFoundPage";
import { CreateHabitPage } from "pages/create_habit/CreateHabitPage";
import { DearHabitsPage } from "pages/dear_habits/DearHabitsPage";
import { HabitExplorerPage } from "pages/habit_explorer/HabitExplorerPage";
import { HabitsPage } from "pages/habits/HabitsPage";
import { SettingsPage } from "pages/settings/SettingsPage";
import { GroupsOfHabitsManagerPage } from "pages/settings/pages/groups_of_habits_manager/GroupOfHabitsManagerPage";
import { HabitsManagerPage } from "pages/settings/pages/habits_manager/HabitsManagerPage";
import { Navigate } from "react-router-dom";

export const PAGE = {
	ALL: { element: <NotFoundPage />, path: "*" },
	DEAR_HABITS: { element: <DearHabitsPage />, path: "/dear/habits" },
	HABIT: { element: <HabitExplorerPage />, path: "/habits/:_id" },
	HABITS: {
		element: <HabitsPage />,
		path: "/habits"
	},
	HABITS_CREATE: {
		element: <CreateHabitPage />,
		path: "habits/create"
	},
	HOME: { element: <App />, path: "/" },
	REDIRECT_TO_HABITS: { element: <Navigate to="habits" />, path: "/" },
	SETTINGS: { element: <SettingsPage />, path: "/settings" },
	SETTINGS_GROUPS_OF_HABITS_MANAGER: {
		element: <GroupsOfHabitsManagerPage />,
		path: "/settings/groups-of-habits-manager"
	},
	SETTINGS_HABITS_MANAGER: {
		element: <HabitsManagerPage />,
		path: "/settings/habits-manager"
	}
};

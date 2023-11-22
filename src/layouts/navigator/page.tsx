import { App } from "layouts/App";
import { NotFoundPage } from "layouts/NotFoundPage";
import { CreateHabitPage } from "pages/create_habit/CreateHabitPage";
import { DearHabitsPage } from "pages/dear_habits/DearHabitsPage";
import { HabitExplorerPage } from "pages/habit_explorer/HabitExplorerPage";
import { HabitsPage } from "pages/habits/HabitsPage";
import { Habitsv2Page } from "pages/habitsv2/Habitsv2Page";
import { SettingsPage } from "pages/settings/SettingsPage";
import { GroupsOfHabitsManagerPage } from "pages/settings/pages/groups_of_habits_manager/GroupOfHabitsManagerPage";
import { HabitsManagerPage } from "pages/settings/pages/habits_manager/HabitsManagerPage";
import { Navigate } from "react-router-dom";

export const PAGE = {
	HOME: { path: "/", element: <App /> },
	REDIRECT_TO_HABITS: { path: "/", element: <Navigate to="habits" /> },

	HABITS: {
		path: "/habits",
		element: <HabitsPage />
	},
	HABITSV2: {
		path: "/habitsv2",
		element: <Habitsv2Page />
	},
	HABITS_CREATE: {
		path: "habits/create",
		element: <CreateHabitPage />
	},
	HABIT: { path: "/habits/:_id", element: <HabitExplorerPage /> },
	SETTINGS: { path: "/settings", element: <SettingsPage /> },
	SETTINGS_GROUPS_OF_HABITS_MANAGER: {
		path: "/settings/groups-of-habits-manager",
		element: <GroupsOfHabitsManagerPage />
	},
	SETTINGS_HABITS_MANAGER: {
		path: "/settings/habits-manager",
		element: <HabitsManagerPage />
	},
	DEAR_HABITS: { path: "/dear/habits", element: <DearHabitsPage /> },
	ALL: { path: "*", element: <NotFoundPage /> }
};

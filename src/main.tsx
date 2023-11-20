import "assets/global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { store } from "store";

import { App } from "./layouts/App";
import { ErrorPage } from "./layouts/ErrorPage";
import { NotFoundPage } from "./layouts/NotFoundPage";
import { CreateHabitPage } from "./pages/create_habit/CreateHabitPage";
import { DearHabitsPage } from "./pages/dear_habits/DearHabitsPage";
import { GroupsOfHabitsManagerPage } from "./pages/groups_of_habits_manager/GroupOfHabitsManagerPage";
import { HabitExplorerPage } from "./pages/habit_explorer/HabitExplorerPage";
import { HabitsPage } from "./pages/habits/HabitsPage";
import { SettingsPage } from "./pages/settings/SettingsPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/", element: <Navigate to={"habits"} /> },
			{
				path: "/habits",
				element: <HabitsPage />
			},
			{
				path: "habits/create",
				element: <CreateHabitPage />
			},
			{ path: "/habits/:_id", element: <HabitExplorerPage /> },
			{ path: "/settings", element: <SettingsPage /> },
			{ path: "/settings/groupsOfHabitsManager", element: <GroupsOfHabitsManagerPage /> },
			{ path: "/dear/habits", element: <DearHabitsPage /> },
			{ path: "*", element: <NotFoundPage /> }
		],
		errorElement: <ErrorPage />
	}
]);

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);

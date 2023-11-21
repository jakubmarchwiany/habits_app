import "assets/global.css";
import { PAGE } from "layouts/navigator/page";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "store";

import { ErrorPage } from "./layouts/ErrorPage";

const router = createBrowserRouter([
	{
		path: PAGE.HOME.path,
		element: PAGE.HOME.element,
		children: [
			{ path: PAGE.REDIRECT_TO_HABITS.path, element: PAGE.REDIRECT_TO_HABITS.element },
			{ path: PAGE.HABITS.path, element: PAGE.HABITS.element },
			{ path: PAGE.DEAR_HABITS.path, element: PAGE.DEAR_HABITS.element },
			{ path: PAGE.HABITS_CREATE.path, element: PAGE.HABITS_CREATE.element },
			{ path: PAGE.HABIT.path, element: PAGE.HABIT.element },
			{ path: PAGE.SETTINGS.path, element: PAGE.SETTINGS.element },
			{
				path: PAGE.SETTINGS_GROUPS_OF_HABITS_MANAGER.path,
				element: PAGE.SETTINGS_GROUPS_OF_HABITS_MANAGER.element
			},
			{ path: PAGE.ALL.path, element: PAGE.ALL.element }
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

import "assets/global.css";

import App from "components/App";
import CreateHabit from "components/pages/create_habit/CreateHabit";
import Error from "components/pages/Error";
import Habits from "components/pages/habits/Habits";
import Settings from "components/pages/settings/Settings";
import ShowHabit from "components/pages/show_habit/ShowHabit";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "store";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Habits /> },
            {
                path: "/create_habit",
                element: <CreateHabit />
            },
            { path: "/settings", element: <Settings /> },
            { path: "/habit/:_id", element: <ShowHabit /> }
        ],

        errorElement: <Error />
    }
]);

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);

import "assets/global.css";
import App from "components/App";
import Error from "components/pages/Error";
import CreateHabit from "components/pages/create_habit/CreateHabit";
import Habits from "components/pages/habits/Habits";
import Settings from "components/pages/settings/Settings";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "store";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Habits /> },
            {
                path: "/create_habit",
                element: <CreateHabit />,
            },
            { path: "/settings", element: <Settings /> },
        ],
        errorElement: <Error />,
    },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);

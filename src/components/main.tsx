import "assets/global.css";
import App from "components/App";
import CreateHabit from "components/pages/CreateHabit";
import Error from "components/pages/Error";
import Plans from "components/pages/Plans";
import Settings from "components/pages/settings/Settings";
import Dashboard from "components/pages/dashboard/Dashboard";
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
            { path: "/", element: <Dashboard /> },
            { path: "/plans", element: <Plans /> },
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

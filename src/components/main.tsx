import "assets/global.css";
import App from "components/App";
import AddHabit from "components/pages/AddHabit";
import Dashboard from "components/pages/Dashboard";
import Error from "components/pages/Error";
import Plans from "components/pages/Plans";
import Settings from "components/pages/Settings";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

console.log(import.meta.env)

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Dashboard /> },
            { path: "/plans", element: <Plans /> },
            { path: "/add_habit", element: <AddHabit /> },
            { path: "/settings", element: <Settings /> },
        ],
        errorElement: <Error />,
    },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

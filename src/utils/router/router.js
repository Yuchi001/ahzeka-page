import {createBrowserRouter, Outlet} from "react-router-dom";
import App from "../../App";
import {ErrorPage} from "../../error-page/ErrorPage";
import {MainView} from "../../main-view/MainView";
import {ElementsListGeneric} from "../../elements-list-generic/ElementsListGeneric";
import {Details} from "../../details/Details";

const router = createBrowserRouter([
    {
        path: "/",
        element: <>
            <App />
        </>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <>
                    <Outlet />
                    <MainView />
                </>,
            },
            {
                path: "school-projects",
                element: <>
                    <Outlet />
                    <ElementsListGeneric tabName="school-projects" />
                </>,
            },
            {
                path: "private-projects",
                element: <>
                    <Outlet />
                    <ElementsListGeneric tabName="private-projects" />
                </>,
            },
            {
                path: "events",
                element: <>
                    <Outlet />
                    <ElementsListGeneric tabName="events" />
                </>,
            },
            {
                path: "hobbies",
                element: <>
                    <Outlet />
                    <ElementsListGeneric tabName="hobbies" />
                </>,
            },
            {
                path: ":any/details",
                element: <>
                    <Outlet />
                    <Details />
                </>,
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
]);

export default router;
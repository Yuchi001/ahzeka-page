import {createBrowserRouter, Outlet} from "react-router-dom";
import App from "../../App";
import {ErrorPage} from "../../error-page/ErrorPage";
import {MainView} from "../../main-view/MainView";

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
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
]);

export default router;
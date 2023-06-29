import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Distributors from "./components/distributors/Distributors";
import Lpo from "./components/lpo/Lpo";
import Banks from "./components/bank/Bank";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "invoice",
                element: <Distributors/>,
            },
            {
                path: "distributor",
                element: <Distributors/>,
            },
            {
                path: "lpo",
                element: <Lpo/>,
            },
            {
                path: "bank",
                element: <Banks/>,
            },
            {
                path: "customer",
                element: <Distributors/>,
            },
        ],
    }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);



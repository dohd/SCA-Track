import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import CreateInvoice from "./pages/Invoice/CreateInvoice";
import Dashboard from './pages/dashboard/Dashboard';
import Distributors from "./pages/distributors/Distributors";
import  CreateNewCustomer from "./pages/customer/CreateNewCustomer";
import CustomerRecords from "./pages/customer/CustomerRecords";
import Lpo from "./pages/Lpo/Lpo";
import Banks from "./pages/bank/Bank";
import Customer from './pages/customer/Customer';
import DispatchedInvoice from './pages/Invoice/DispatchedInvoice';
import RegenerateInvoice from './pages/Invoice/RegenerateInvoice';

const router = createBrowserRouter([
    {
       path:"dashboard/*" ,element:<Dashboard />,
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "invoice",
                element: <CreateInvoice/>,
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
                element: <Customer/>,
                children: [
                    {
                      path: "customer/createnewCustomer",
                      element: <CreateNewCustomer />,
                    },
                    {
                      path: "CustomerRecords",
                      element: <CustomerRecords />,
                    },
                  ],
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



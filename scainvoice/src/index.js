import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";

import Dashboard from './pages/dashboard/Dashboard';
import Distributors from "./pages/distributors/Distributors";
import CreateNewCustomer from "./pages/customer/CreateNewCustomer";
import CustomerRecords from "./pages/customer/CustomerRecords";
import Lpo from "./pages/Lpo/Lpo";
import Bank from "./pages/bank/Bank";
import Customer from './pages/customer/Customer';
import CreateInvoice from './pages/invoice/CreateInvoice';
import Invoice from './pages/invoice/Invoice';
import InvoiceList from './pages/invoice/InvoiceList';
import CreateNewBank from './pages/bank/CreateNewBank';
import BankRecords from './pages/bank/BankRecords';

const router = createBrowserRouter([
    {
        path: "*",
        element: <Root />,
        errorElement:<ErrorPage/>,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "invoice",
            children:[
              {  path:"",
              element: <Invoice />,
            },
            {path:"new-in",
        element:<CreateInvoice/>,
    },

        {
            path:"invoice-records",
        element:<InvoiceList/>,
    },

            ]
                
            },
            {
                path: "distributor",
                element: <Distributors />,
            },
            {
                path: "lpo",
                element: <Lpo />,
            },
            {
                path: "bank",
                children:[
                    {path:"",
                element:<Bank/>},
                {
                    path:"newbank",
                    element:<CreateNewBank/>,
                },
                {
                    path:"brecords",
                    element:<BankRecords/>,
                },
                ]
            },
            {
                path: "customer",
               
               
                children: [
                    {
                        path:"",
                        element: <Customer />,
                    },{
                        path: "new",
                        element: <CreateNewCustomer />,
                        
                    },
                    {
                        path: "records",
                        element: <CustomerRecords />,
                       
                    },
                ],
            },
        ]
    }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);



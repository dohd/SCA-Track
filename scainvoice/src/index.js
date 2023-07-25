import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";

import Dashboard from './pages/dashboard/Dashboard';
import Distributors from "./pages/distributors/Distributors";
import CreateNewCustomer from "./pages/customer/CreateNewCustomer";
import CustomerRecords from "./pages/customer/CustomerRecords";
import Lpo from "./pages/Lpo/Lpo";
import LpoRecord from "./pages/Lpo/lpoRecord";
import NewLpo from "./pages/Lpo/NewLpo";
import Bank from "./pages/bank/Bank";
import Customer from './pages/customer/Customer';
import CreateInvoice from './pages/invoice/CreateInvoice';
import Invoice from './pages/invoice/Invoice';
import InvoiceList from './pages/invoice/InvoiceList';
import CreateNewBank from './pages/bank/CreateNewBank';
import BankRecords from './pages/bank/BankRecords';
import CreateDistributor from "./pages/distributors/CreateDistributor";
import DistributorRecords from "./pages/distributors/DistributorRecords";
import DispatchedInvoice from "./pages/invoice/DispatchedInvoice";

const router = createBrowserRouter(
  
  
  
  [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      
       
      {
        path: "dashboard",
       children:[
        {
          path:"",
          element: <Dashboard />,
          path:"dispatchedInvoice",
          element:<DispatchedInvoice/>
        }
       ]
      },
      {
        path: "Invoice",
        children: [
          { 
            path: "",
            element: <Invoice />
          },
          { 
            path: "new-in", 
            element: <CreateInvoice /> 
          },

          {
            path: "invoice-records",
            element: <InvoiceList />,
          },
        ],
      },
      {
        path: "distributor",
        children:[
          {
            path: "",
            element: <Distributors />,
        },
        {
          path: "newd",
          element: <CreateDistributor />,
      },
      {
        path: "drecords",
        element: <DistributorRecords />,
    },
        ]
      },
    
                
            
           
            {
                path: "lpo",
                children: [
                        {
                          path: "",
                          element: <Lpo />,
                        },
                        {
                          path: "NewLpo",
                          element: <NewLpo />
                        },
                        {
                          path: "lpoRecord",
                          element: <LpoRecord />
                        },
                      ],
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

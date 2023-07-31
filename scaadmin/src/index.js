import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import admnInvoice from "./pages/admininvoice/AdmnInvoice"
import admnCreateInvoice from "./pages/admininvoice/AdmnCreateInvoice"
import InvoiceList_2 from "./pages/admininvoice/InvoiceList_2";
import Distributor1 from "./pages/admindistributors/Distributors1";
import CreateDistributor1 from "./pages/admindistributors/CreateDistributor1";
import DistributorRecords1 from "./pages/admindistributors/DistributorRecords1";
import Customer1 from "./pages/admincustomer/Customer1";
import CreateCustomer1 from "./pages/admincustomer/CreateNewCustomer1";
import CustomerRecords1 from "./pages/admincustomer/CustomerRecords1";  


const router = createBrowserRouter([

  {
    path: "/*",
    element: <Root />,
    errorElement: <ErrorPage />,
     
   
    children: [
     

      {
        path: "admininvoice",
        children: [
          {
            path: "",
            element: <admnInvoice />,
          },
          {
            path: "new-in",
            element: <admnCreateInvoice />,
          },

          {
            path: "invoice-records",
            element: <InvoiceList_2 />,
          },
        ],
      },
      {
        path: "admindistributor",
        children: [
          {
            path: "",
            element: <Distributor1 />,
          },
          {
            path: "newd",
            element: <CreateDistributor1 />,
          },
          {
            path: "drecords",
            element: <DistributorRecords1 />,
          },
        ],
      },
      {
        path: "admincustomer",
        children: [
          {
            path: "",
            element: <Customer1 />,
          },
          {
            path: "new",
            element: <CreateCustomer1 />,
          },
          {
            path: "records",
            element: <CustomerRecords1 />,
          },
        ],
      },

      

      
      
    ],
  },
]);
 
    const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



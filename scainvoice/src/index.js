import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";

// import Dashboard from "./pages/dashboard/Dashboard";
import Distributors from "./pages/distributors/Distributors";
import CreateNewCustomer from "./pages/customer/CreateNewCustomer";
import CustomerRecords from "./pages/customer/CustomerRecords";
import Lpo from "./pages/Lpo/Lpo";
import LpoRecord from "./pages/Lpo/lpoRecord";
// import LpoRecord_2 from "./pages/Lpo/lpoRecord_2";
import NewLpo from "./pages/Lpo/NewLpo";
import Bank from "./pages/bank/Bank";
import Customer from "./pages/customer/Customer";
import CreateInvoice from "./pages/Invoice/CreateInvoice";
import Invoice from "./pages/Invoice/Invoice";
import InvoiceList from "./pages/Invoice/InvoiceList";
import BankRecords from "./pages/bank/BankRecords";
import CreateDistributor from "./pages/distributors/CreateDistributor";
import DistributorRecords from "./pages/distributors/DistributorRecords";
// import DispatchedInvoice from "./pages/Invoice/DispatchedInvoice";
import Register from "./components/authentification/Register";
import Login from "./components/authentification/Login";
const router = createBrowserRouter([
  { path: "", element: <Login /> },
  { path: "register", element: <Register /> },
  {
    path: "/*",
    element: <Root />,
    errorElement: <ErrorPage />,

    
    
    children: [
     

      {
        path: "Invoice",
        children: [
          {
            path: "",
            element: <Invoice />,
          },
          {
            path: "new-in",
            element: <CreateInvoice />,
          },

          {
            path: "invoice-records",
            element: <InvoiceList />,
          },
        ],
      },
      {
        path: "distributor",
        children: [
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
        ],
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
            element: <NewLpo />,
          },
          {
            path: "lpoRecord",
            element: <LpoRecord />,
          },
        ],
      },

      {
        path: "bank",
        children: [
          { path: "", element: <Bank /> },
        
          {
            path: "brecords",
            element: <BankRecords />,
          },
        ],
      },
      {
        path: "customer",

        children: [
          {
            path: "",
            element: <Customer />,
          },
          {
            path: "new",
            element: <CreateNewCustomer />,
          },
          {
            path: "records",
            element: <CustomerRecords />,
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

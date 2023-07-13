import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import CreateInvoice from "./pages/Invoice/CreateInvoice";
import Dashboard from "./pages/dashboard/Dashboard";
import Distributors from "./pages/distributors/Distributors";
import CreateNewCustomer from "./pages/customer/CreateNewCustomer";
import CustomerRecords from "./pages/customer/CustomerRecords";
import Lpo from "./pages/Lpo/Lpo";
import LpoRecord from "./pages/Lpo/lpoRecord";
import NewLpo from "./pages/Lpo/NewLpo";
import Banks from "./pages/bank/Bank";
import Customer from "./pages/customer/Customer";
import DispatchedInvoice from "./pages/Invoice/DispatchedInvoice";
import RegenerateInvoice from "./pages/Invoice/RegenerateInvoice";
import Invoice from "./pages/Invoice/Invoice";
import InvoiceList from "./pages/Invoice/InvoiceList";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
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
        element: <Distributors />,
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
        element: <Banks />,
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

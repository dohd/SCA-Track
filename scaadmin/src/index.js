import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import AdminInvoice from "./pages/admininvoice/AdminInvoice";
import AdminCreateInvoice from "./pages/admininvoice/AdminCreateInvoice";
import InvoiceList_2 from "./pages/admininvoice/InvoiceList_2";
import Distributor1 from "./pages/admindistributors/Distributors1";
import CreateDistributor1 from "./pages/admindistributors/CreateDistributor1";
import DistributorRecords1 from "./pages/admindistributors/DistributorRecords1";
import Customer1 from "./pages/admincustomer/Customer1";
import CreateCustomer1 from "./pages/admincustomer/CreateNewCustomer1";
import CustomerRecords1 from "./pages/admincustomer/CustomerRecords1";
import Bank1 from "./pages/adminbank/Bank1";
import CreateBank1 from "./pages/adminbank/CreateNewBank1";
import BankRecords1 from "./pages/adminbank/BankRecords1";
import Lpo1 from "./pages/adminLpo/Lpo1";
import NewLpo1 from "./pages/adminLpo/NewLpo1";
import LpoRecord1 from "./pages/adminLpo/LpoRecord1";
import User from "./pages/user/User";
import CreateUser1 from "./pages/user/CreateUser";
import UserRecords1 from "./pages/user/UserRecords1";
import Login from "./components/authentification/Login";

const router = createBrowserRouter([
  { path: "", element: <Login /> },

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
            element: <AdminInvoice />,
          },
          {
            path: "new-in",
            element: <AdminCreateInvoice />,
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
        path: "admincustomers",
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
      {
        path: "adminbank",
        children: [
          {
            path: "",
            element: <Bank1 />,
          },
          {
            path: "newbank",
            element: <CreateBank1 />,
          },
          {
            path: "brecords",
            element: <BankRecords1 />,
          },
        ],
      },
      {
        path: "adminLpo",
        children: [
          { path: "", element: <Lpo1 /> },
          {
            path: "newlpo",
            element: <NewLpo1 />,
          },
          { path: "lpoRecord", element: <LpoRecord1 /> },
        ],
      },

      {
        path: "user",
    
        children: [
          {
            path: "",
            element: <User />,
          },
          {
            path: "new",
            element: <CreateUser1 />,
          },
          {
            path: "records",
            element: <UserRecords1 />,
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

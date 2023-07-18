import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { field: "InvoiceNumber", headerName: "InvoiceNumber", width: 130 },
  { field: "CompanyName", headerName: "Company name", width: 130 },
  { field: "Amount", headerName: "Amount", type: "number", width: 90 },
  { field: "Status", headerName: "Status", width: 130 },
  { field: "DateIssued", headerName: "DateIssued", width: 130 },
  { field: "DueDate", headerName: "DueDate", width: 130 },
  {
    field: "Action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/invoice/" + params.row.InvoiceNumber}>
            <button className="InvoiceListEdit">Edit</button>
          </Link>

          <DeleteIcon className="InvoiceListDelete" />
        </>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    CompanyName: "Britam",
    Amount: 55000,
    Status: "Paid",
    DateIssued: "1-1-2023",
    DueDate: "1-2-2023",
  },
  {
    id: 2,
    CompanyName: "SidianBank",
    Amount: 20000,
    Status: "Pending",
    DateIssued: "1-3-2023",
    DueDate: "3-4-2023",
  },
  {
    id: 3,
    CompanyName: "Britam",
    Amount: 55000,
    Status: "Paid",
    DateIssued: "1-1-2023",
    DueDate: "1-2-2023",
  },
  {
    id: 4,
    CompanyName: "Britam",
    Amount: 55000,
    Status: "Paid",
    DateIssued: "1-1-2023",
    DueDate: "1-2-2023",
  },
  {
    id: 5,
    CompanyName: "SidianBank",
    Amount: 20000,
    Status: "Pending",
    DateIssued: "1-3-2023",
    DueDate: "3-4-2023",
  },
  {
    id: 6,
    CompanyName: "Britam",
    Amount: 55000,
    Status: "Paid",
    DateIssued: "1-1-2023",
    DueDate: "1-2-2023",
  },
  {
    id: 7,
    CompanyName: "Britam",
    Amount: 55000,
    Status: "Paid",
    DateIssued: "1-1-2023",
    DueDate: "1-2-2023",
  },
  {
    id: 8,
    CompanyName: "SidianBank",
    Amount: 20000,
    Status: "Pending",
    DateIssued: "1-3-2023",
    DueDate: "3-4-2023",
  },
  {
    id: 9,
    CompanyName: "Britam",
    Amount: 55000,
    Status: "Paid",
    DateIssued: "1-1-2023",
    DueDate: "1-2-2023",
  },
];

const Customer = () => {
  return (
    <div>
      InvoiceRecords
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};
export default Customer;

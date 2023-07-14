import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { field: "LPO Number", headerName: "InvoiceNumber", width: 130 },
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
    InvoiceNumber: "SCA101",
    CompanyName: "Britam",
    Amount: 55000,
    Status: "Paid",
    DateIssued: "1-1-2023",
    DueDate: "1-2-2023",
  },
  {
    id: 2,
    InvoiceNumber: "SCA102",
    CompanyName: "SidianBank",
    Amount: 20000,
    Status: "Pending",
    DateIssued: "1-3-2023",
    DueDate: "3-4-2023",
  },
  {
    id: 3,
    InvoiceNumber: "SCA103",
    CompanyName: "Britam",
    Amount: 55000,
    Status: "Paid",
    DateIssued: "1-1-2023",
    DueDate: "1-2-2023",
  },
  {
    id: 4,
    InvoiceNumber: "SCA104",
    CompanyName: "Britam",
    Amount: 55000,
    Status: "Paid",
    DateIssued: "1-1-2023",
    DueDate: "1-2-2023",
  },
  {
    id: 5,
    InvoiceNumber: "SCA105",
    CompanyName: "SidianBank",
    Amount: 20000,
    Status: "Pending",
    DateIssued: "1-3-2023",
    DueDate: "3-4-2023",
  },
  {
    id: 6,
    InvoiceNumber: "SCA106",
    CompanyName: "Britam",
    Amount: 55000,
    Status: "Paid",
    DateIssued: "1-1-2023",
    DueDate: "1-2-2023",
  },
  {
    id: 7,
    InvoiceNumber: "SCA107",
    CompanyName: "Britam",
    Amount: 55000,
    Status: "Paid",
    DateIssued: "1-1-2023",
    DueDate: "1-2-2023",
  },
  {
    id: 8,
    InvoiceNumber: "SCA108",
    CompanyName: "SidianBank",
    Amount: 20000,
    Status: "Pending",
    DateIssued: "1-3-2023",
    DueDate: "3-4-2023",
  },
  {
    id: 9,
    InvoiceNumber: "SCA109",
    CompanyName: "Britam",
    Amount: 55000,
    Status: "Paid",
    DateIssued: "1-1-2023",
    DueDate: "1-2-2023",
  },
];

export default function InvoiceList() {
  return (
    <div
      style={{
        height: 480,
        width: "80%",
        marginLeft: "280px",
        marginRight: "0",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "500",
          marginBottom: "10px",
        }}
      >
        LPO Records
      </h1>
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
}

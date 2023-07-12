import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Typography } from "@mui/material";

const columns = [
  { field: "id", headerName: "Customer ID", width: 120 },
  { field: "customerName", headerName: "Customer Name", width: 200 },
  { field: "Address", headerName: "Address", width: 200 },
  { field: "Street", headerName: "Street", width: 180 },
  { field: "Location", headerName: "Location", width: 180 },
];

const generateRowsWithIds = (rows) => {
  return rows.map((row, index) => ({
    ...row,
    id: `SCA-${(index + 1).toString().padStart(3, "0")}`, // Generate ID in the format SCA-001
  }));
};

const rows = [
  {
    customerName: "Britam",
    Address: "P.O.BOX 00-333",
    Street: "whitefiled-place",
    Location: "Nairobi",
  },
  {
    customerName: "Sidian Bank",
    Address: "P.O.BOX 00-333",
    Street: "Ring road",
    Location: "Nairobi",
  },
  {
    customerName: "Reddington",
    Address: "P.O.BOX 00-333",
    Street: "whitefiled",
    Location: "Nairobi",
  },
  {
    customerName: "Kcb",
    Address: "P.O.BOX 00-333",
    Street: "whitefiled",
    Location: "Nairobi",
  },
];

const DataTable = () => {
  const rowsWithIds = generateRowsWithIds(rows);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
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
          Customer Records
        </h1>
        <DataGrid
          rows={rowsWithIds}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </Box>
  );
};

export default DataTable;

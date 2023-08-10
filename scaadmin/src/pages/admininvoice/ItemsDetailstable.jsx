import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const ItemsDetailsTable = () => {
  // Sample data for the items details table
  const rows = [
    {
      id: 1,
      name: "Item 1",
      price: "USD",
      quantity: 5,
      unitPrice: 10,
      total: 50,
    },
    {
      id: 2,
      name: "Item 2",
      price: "KSH",
      quantity: 3,
      unitPrice: 20,
      total: 60,
    },
    {
      id: 3,
      name: "Item 3",
      price: "Pounds",
      quantity: 2,
      unitPrice: 15,
      total: 30,
    },
    {
      id: 4,
      name: "Item 4",
      price: "Pounds",
      quantity: 4,
      unitPrice: 12,
      total: 48,
    },
    {
      id: 5,
      name: "Item 5",
      price: "USD",
      quantity: 1,
      unitPrice: 30,
      total: 30,
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Description", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) =>
            console.log(
              `Item ${params.row.id} price changed to ${e.target.value}`
            )
          }
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="KSH">KSH</MenuItem>
          <MenuItem value="Pounds">Pounds</MenuItem>
        </Select>
      ),
    },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "unitPrice", headerName: "Unit Price", width: 120 },
    { field: "total", headerName: "Total (Excl VAT)", width: 160 },
  ];

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default ItemsDetailsTable;

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";


const DataTable = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/read_customers");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "id", headerName: "Customer ID", width: 120 },
    {field:"Customer Pin No",headerName:"Pin No",width:120},
    { field: "customer_name", headerName: "Customer Name", width: 200 },
    {field:"customer-email",headerName:"Email",width:200},
    { field: "customer_street", headerName: "Street", width: 200 },
    { field: "customer_address", headerName: "Address", width: 180 },
    { field: "customer_location", headerName: "Location", width: 180 },
  ];

  const generateRowsWithIds = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      id: `SCA-${(index + 1).toString().padStart(3, "0")}`, // Generate ID in the format SCA-001
    }));
  };

  const rowsWithIds = generateRowsWithIds(customers);

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

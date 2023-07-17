import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Distributor from "./Distributors";




  const columns = [
    { field: "id", headerName: "distributor ID", width: 120 },
    
    { field: "distributor_name", headerName: "Distributor Name", width: 200 },
    {field:"distributor-email",headerName:"Email",width:200},
    { field: "distributor_telephone", headerName: "Telephone", width: 200 },
    { field: "distributor_address", headerName: "Address", width: 180 },
    { field: "distributor_location", headerName: "Location", width: 180 },
  ];

  const generateRowsWithIds = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      id: `${(index + 1).toString().padStart(3, "0")}`, // Generate ID in the format 001
    }));
  };
  

  const rowsWithIds = generateRowsWithIds(Distributor);
  const rows = [
    {
      id: 1,
      distributor_name: 'Kenya commercial bank',
      distributor-email: 'bank@gmail.com',
      distributor_telephone: '0789765433',
       
    },
  x``]
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
          Distributor Records
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

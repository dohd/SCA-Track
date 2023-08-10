import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const DataTable = () => {
  const [customers, setCustomers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({});

  const navigate = useNavigate();

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
    { field: "id", headerName: "No", width: 50 },
    { field: "cust_id", headerName: "ID", width: 100 },
    { field: "customer_name", headerName: "Customer Name", width: 180 },
    { field: "customer_email", headerName: "Email", width: 200 },
    { field: "customer_street", headerName: "Street", width: 140 },
    { field: "customer_address", headerName: "Address", width: 160 },
    { field: "customer_location", headerName: "Location", width: 140 },
    { field: "kra_pin", headerName: "Pin No", width: 100 },
    { field: "customer_phone", headerName: "Phone", width: 100 },
    
  ];

  const generateRowsWithIds = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      id: `${(index + 1).toString().padStart(3, "0")}`, // Generate ID in the format SCA-001
    }));
  };

  const rowsWithIds = generateRowsWithIds(customers);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
        height: 500,
        width: "80%",
        marginLeft: "250px",
        marginRight: "auto",
        backgroundColor: "#EDEADE",
        padding: "20px",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            Customer Records
          </h1>
        </div>
        <div
          style={{
            width: "50%",
          }}
        >
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s",
              marginRight: "10px",
              marginLeft: "80%",
            }}
            type="button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>

      <DataGrid rows={rowsWithIds} columns={columns} pageSize={5} />

    
    </Box>
  );
};

export default DataTable;

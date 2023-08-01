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

const Distributors = () => {
  const [distributors, setDistributors] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedDistributor, setEditedDistributor] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/read_distributors"
      );
      setDistributors(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  const columns = [
    { field: "id", headerName: "No", width: 50 },
    {
      field: "distributor_id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "distributor_name",
      headerName: "Distributor name",
      width: 200,
    },
    {
      field: "distributor_email",
      headerName: "Distributor Email",
      width: 250,
    },
    { field: "distributor_phone", headerName: "Phone", width: 130 },
    { field: "distributor_address", headerName: "Address", width: 140 },
    {
      field: "distributor_location",
      headerName: "Location",
      width: 120,
    },
  ];

  const generateRowsWithIds = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      id: `${(index + 1).toString().padStart(3, "0")}`, // Generate ID in the format D-001
    }));
  };

  const rowsWithIds = generateRowsWithIds(distributors);

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
          marginTop: "20px",
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
            Distributor Records
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
export default Distributors;

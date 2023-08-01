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

const BankRecords = () => {
  const [banks, setBanks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState({});
  const [editedBank, setEditedBank] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/read_bankRecords"
      );
      setBanks(response.data);
    } catch (error) {
      console.error(error);
    }
  };



 

 







  const columns = [
    { field: "id", headerName: " No", width: 50 },
    { field: "bank_name", headerName: "Bank Name", width: 200 },
    { field: "branch", headerName: "Bank Branch", width: 160 },
    { field: "kes_account", headerName: "KES Account", width: 150 },
    { field: "pounds_account", headerName: "Pound Account", width: 160 },
    { field: "usd_account", headerName: "USD Account", width: 160 },
    { field: "swift_code", headerName: "Swift Code", width: 160 },
    
  ];

  const generateRowsWithIds = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      id: `${(index + 1).toString().padStart(3, "0")}`, // Generate ID in the format SCA-001
    }));
  };

  const rowsWithIds = generateRowsWithIds(banks);

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
            Bank Records
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

export default BankRecords;

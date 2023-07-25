import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const LpoRecords = () => {
  const [lpo, setLpos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLpos();
  }, []);

  const fetchLpos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/read_lpos");
      setLpos(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchLpos();

  const columns = [
    { field: "id", headerName: " No", width: 80 },
    { field: "lpo_number", headerName: "LPO Number", width: 100 },
    { field: "distributor", headerName: "Distributor", width: 250 },
    { field: "total", headerName: "Amount", type: "number", width: 100 },
    { field: "Status", headerName: "Status", width: 100 },
    { field: "Lpo_date", headerName: "DateIssued", width: 100 },
    { field: "days", headerName: "Due in (Days)", width: 150 },
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

  const generateRowsWithIds = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      id: `${(index + 1).toString().padStart(3, "0")}`,
    }));
  };

  const rowsWithIds = generateRowsWithIds(lpo);
  // console.log(lpo);

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
            LPO Records
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
export default LpoRecords;

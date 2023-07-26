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

  const handleDelete = (distributorID, distributorName) => {
    setSelectedDistributor({ distributorID, distributorName });
    setDialogOpen(true);
  };

  const handleEdit = (distributor) => {
    setSelectedDistributor(distributor);
    setEditedDistributor(distributor);
    setEditDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Call your delete method here with distributor ID and distributor name
    const { distributorID, distributorName } = selectedDistributor;
    const message = `Delete distributor ID: ${distributorID}, distributor name: ${distributorName}`;
    console.log(message);
    setDialogOpen(false);
    deleteDistributor(distributorName);
  };

  const handleConfirmEdit = async (event) => {
    event.preventDefault();

    const { distributorID } = selectedDistributor;
    const updatedDistributor = { ...selectedDistributor, ...editedDistributor };
    console.log(
      "Update distributor:",
      distributorID,
      "Updated details:",
      updatedDistributor
    );
    const distributor_address = updatedDistributor.distributor_address;
    const distributor_email = updatedDistributor.distributor_email;
    const distributor_location = updatedDistributor.distributor_location;
    const distributor_phone = updatedDistributor.distributor_phone;
    const distributor_name = updatedDistributor.distributor_name;
    // const kra_pin = updateddistributor.kra_pin;
    try {
      const response = await axios.put(
        "http://localhost:3000/update/distributors",
        {
          distributor_address,
          distributor_email,
          distributor_location,
          distributor_phone,
          distributor_name,
        }
      );

      console.log(response.data); // Assuming the response contains the updated movie details
      // Reset form fields
      fetchDistributors();
    } catch (error) {
      console.error(error);
    }
    setEditDialogOpen(false);
  };

  const deleteDistributor = async () => {
    const { distributorName } = selectedDistributor;
    try {
      const response = await axios.delete(
        `http://localhost:3000/delete/distributor`,
        {
          params: {
            distributorName,
          },
        }
      );
      console.log(response.data); // Assuming the response contains the success message

      alert("Deleted Successfuly!");
      fetchDistributors(); //update the list
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDistributor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "distributor_name",
      headerName: "Distributor name",
      width: 200,
    },
    {
      field: "distributor_email",
      headerName: "Distributor Email",
      width: 200,
    },
    { field: "distributor_phone", headerName: "Phone", width: 130 },
    { field: "distributor_address", headerName: "Address", width: 130 },
    {
      field: "distributor_location",
      headerName: "Location",
      width: 110,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        const distributorID = params.row.id;
        const distributorName = params.row.distributor_name;
        const distributor = params.row;
        return (
          <>
            <button
              className="InvoiceListEdit"
              onClick={() => handleDelete(distributorID, distributorName)}
            >
              <DeleteIcon className="InvoiceListDelete" />
            </button>

            <button
              className="InvoiceListEdit"
              style={{
                marginLeft: "10px",
              }}
              onClick={() => handleEdit(distributor)}
            >
              <EditIcon className="InvoiceListEdit" />
            </button>
          </>
        );
      },
    },
  ];

  const generateRowsWithIds = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      id: `D-${(index + 1).toString().padStart(3, "0")}`, // Generate ID in the format D-001
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

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to delete: <br />{" "}
            {selectedDistributor.distributorName}?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Distributor Details</DialogTitle>
        <DialogContent>
          <TextField
            style={{
              marginTop: "10px",
            }}
            name="distributor_name"
            label="Distributor Name"
            fullWidth
            value={editedDistributor.distributor_name || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            style={{
              marginTop: "10px",
            }}
            name="distributor_email"
            label="Email"
            fullWidth
            value={editedDistributor.distributor_email || ""}
            onChange={handleEditInputChange}
          />

          <TextField
            style={{
              marginTop: "10px",
            }}
            name="distributor_address"
            label="Address"
            fullWidth
            value={editedDistributor.distributor_address || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            style={{
              marginTop: "10px",
            }}
            name="distributor_location"
            label="Location"
            fullWidth
            value={editedDistributor.distributor_location || ""}
            onChange={handleEditInputChange}
          />

          <TextField
            style={{
              marginTop: "10px",
            }}
            name="distributor_phone"
            label="Phone"
            fullWidth
            value={editedDistributor.distributor_phone || ""}
            onChange={handleEditInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmEdit} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Distributors;

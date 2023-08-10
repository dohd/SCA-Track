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
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/read_users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (userID, userName) => {
    setSelectedUser({ userID, userName });
    setDialogOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedUser(user);
    setEditDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Call your delete method here with customer ID and customer name
    const { userID, userName } = selectedUser;
    const message = `Delete customer ID: ${userID}, Customer name: ${userName}`;
    console.log(message);
    setDialogOpen(false);
    deleteuser(userName);
  };

  const handleConfirmEdit = async (event) => {
    event.preventDefault();

    const { userID } = selectedUser;
    const updatedUser = { ...selectedUser, ...editedUser };
    console.log(
      "Update user:",
      userID,
      "Updated details:",
      updatedUser
    );
    
    const user_email = updatedUser.email;
    const username = updatedUser.username;
    
    try {
      const response = await axios.put(
        "http://localhost:3000/update/users",
        {
         
          user_email,
          username,
        }
      );

      console.log(response.data); // Assuming the response contains the updated movie details
      // Reset form fields
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
    setEditDialogOpen(false);
  };

  const deleteuser = async () => {
    const { userName } = selectedUser;
    try {
      const response = await axios.delete(
        `http://localhost:3000/delete/user`,
        {
          params: {
            userName,
          },
        }
      );
      console.log(response.data); // Assuming the response contains the success message

      alert("Deleted Successfuly!");
      fetchUsers(); //update the list
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
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "No", width: 50 },
    { field: "username", headerName: "User Name", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "Action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        const userID = params.row.id;
        const userName = params.row.username;
        const user = params.row;
        return (
          <>
            <button
              className="InvoiceListEdit"
              onClick={() => handleDelete(userID, userName)}
            >
              <DeleteIcon className="InvoiceListDelete" />
            </button>

            <button
              className="InvoiceListEdit"
              style={{
                marginLeft: "10px",
              }}
              onClick={() => handleEdit(user)}
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
      id: `${(index + 1).toString().padStart(3, "0")}`, // Generate ID in the format SCA-001
    }));
  };

  const rowsWithIds = generateRowsWithIds(users);

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
            User Records
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
            {selectedUser.userName}?
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
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <TextField
            style={{
              marginTop: "10px",
            }}
            name="username"
            label="User Name"
            fullWidth
            value={editedUser.username || ""}
            onChange={handleEditInputChange}
          />
        
          <TextField
            style={{
              marginTop: "10px",
            }}
            name="email"
            label="Email"
            fullWidth
            value={editedUser.email || ""}
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

export default DataTable;

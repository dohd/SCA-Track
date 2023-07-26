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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
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

  const handleDelete = (bankID, bankName) => {
    setSelectedBank({ bankID, bankName });
    setDialogOpen(true);
  };

  const handleEdit = (bank) => {
    setSelectedBank(bank);
    setEditedBank(bank);
    setEditDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Call your delete method here with bank ID and customer name
    const { bankID, bankName } = selectedBank;
    const message = `Delete customer ID: ${bankID}, Customer name: ${bankName}`;
    console.log(message);
    setDialogOpen(false);
    deleteBank(bankName);
  };

  const handleConfirmEdit = async (event) => {
    event.preventDefault();

    const { bankID } = selectedBank;
    const updatedBank = { ...selectedBank, ...editedBank };
    console.log("Update bank:", bankID, "Updated details:", updatedBank);
    const bank_name = updatedBank.bank_name;
    const branch = updatedBank.branch;
    const kes_account = updatedBank.kes_account;
    const usd_account = updatedBank.usd_account;
    const pound_account = updatedBank.pound_account;
    const swift_code = updatedBank.swift_code;
    try {
      const response = await axios.put(
        "http://localhost:3000/update/bankRecords",
        {
          bank_name,
          branch,
          kes_account,
          usd_account,
          pound_account,
          swift_code,
        }
      );

      console.log(response.data); // Assuming the response contains the updated movie details
      // Reset form fields
      fetchBanks();
    } catch (error) {
      console.error(error);
    }
    setEditDialogOpen(false);
  };

  const deleteBank = async () => {
    const { bankName } = selectedBank;
    try {
      const response = await axios.delete(`http://localhost:3000/delete/bank`, {
        params: {
          bankName,
        },
      });
      console.log(response.data); // Assuming the response contains the success message

      alert("Deleted Successfuly!");
      fetchBanks(); //update the list
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
    setEditedBank((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: " ID", width: 100 },
    { field: "bank_name", headerName: "Bank Name", width: 200 },
    { field: "branch", headerName: "Bank Branch", width: 150 },
    { field: "kes_account", headerName: "KES Account", width: 100 },
    { field: "pounds_account", headerName: "Pound Account", width: 120 },
    { field: "usd_account", headerName: "USD Account", width: 100 },
    { field: "swift_code", headerName: "Swift Code", width: 100 },
    {
      field: "Action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        const bankID = params.row.id;
        const bankName = params.row.bank_name;
        const bank = params.row;
        return (
          <>
            <button
              className="InvoiceListEdit"
              onClick={() => handleDelete(bankID, bankName)}
            >
              <DeleteIcon className="InvoiceListDelete" />
            </button>

            <button
              className="InvoiceListEdit"
              style={{
                marginLeft: "10px",
              }}
              onClick={() => handleEdit(bank)}
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
      id: `B-${(index + 1).toString().padStart(3, "0")}`, // Generate ID in the format SCA-001
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

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to delete: <br /> {selectedBank.bankName}?
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
        <DialogTitle>Edit Bank Details</DialogTitle>
        <DialogContent>
          <TextField
            style={{
              marginTop: "10px",
            }}
            name="bank_name"
            label="Bank Name"
            fullWidth
            value={editedBank.bank_name || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            style={{
              marginTop: "10px",
            }}
            name="bank_brach"
            label="Branch"
            fullWidth
            value={editedBank.branch || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            style={{
              marginTop: "10px",
            }}
            name="kes_account"
            label="KES Account"
            fullWidth
            value={editedBank.kes_account || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            style={{
              marginTop: "10px",
            }}
            name="usd_account"
            label="USD Account"
            fullWidth
            value={editedBank.usd_account || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            style={{
              marginTop: "10px",
            }}
            name="pound_account"
            label="Pound Account"
            fullWidth
            value={editedBank.pound_account || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            style={{
              marginTop: "10px",
            }}
            name="swift"
            label="Swift code"
            fullWidth
            value={editedBank.swift_code || ""}
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

export default BankRecords;

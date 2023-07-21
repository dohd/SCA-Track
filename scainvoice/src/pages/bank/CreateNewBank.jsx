import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';



export default function CreateNewBank() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);

  const openMyDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [kesAcc, setKesAcc] = useState("");
  const [usdAcc, setUsdAccount] = useState("");
  const [poundAcc, setPoundAcc] = useState("");
  const [swift, setSwift] = useState("");

  const onSubmit = (data) => {
    const handleSubmit = async (event) => {
      try {
        await axios.post("http://localhost:3000/add_bank", {
          bankName,
          bankBranch,
          kesAcc,
          usdAcc,
          poundAcc,
          swift,
        });
        openMyDialog();
        handleClearForm();
      } catch (error) {
        console.error(error);
      }
    };
    handleSubmit();
  };

  const handleClearForm = () => {
    // Reset the form fields
    setBankName("");
    setBankBranch("");
    setKesAcc("");
    setUsdAccount("");
    setPoundAcc("");
    setSwift("");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        height: 400,
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
      }}>
        <div
        style={{
          width: "50%",
        }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          New Bank
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

      <div>
          <label htmlFor="bankName"
          style={{ 
            display: "block", 
            marginBottom: "5px", 
          }}
          >Bank Name: </label>
          <input
          style={{
             width: "100%", 
             padding: "10px", 
             border: "1px solid #ccc", 
             borderRadius: "6px" 
            }}
            type="text"
            id="bankName"
            placeholder="Enter Bank name"
            {...register("bankName", { required: true })}
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
          {errors.bankName && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="bankBranch"
          style={{ 
            display: "block", 
            marginBottom: "5px", 
          }}
          >Bank Branch: </label>
          <input
          style={{
            width: "100%", 
            padding: "10px", 
            border: "1px solid #ccc", 
            borderRadius: "6px" 
           }}
            type="text"
            id="bankBranch"
            placeholder="Enter bank branch"
            {...register("bankBranch", { required: true })}
            value={bankBranch}
            onChange={(e) => setBankBranch(e.target.value)}
          />
          {errors.bankBranch && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="kesAcc"
          style={{ 
            display: "block", 
            marginBottom: "5px", 
          }}
          >KES Account: </label>
          <input
          style={{
            width: "100%", 
            padding: "10px", 
            border: "1px solid #ccc", 
            borderRadius: "6px" 
           }}
            type="text"
            id="kesAcc"
            placeholder="Enter KES Account"
            {...register("kesAcc", { required: true })}
            value={kesAcc}
            onChange={(e) => setKesAcc(e.target.value)}
          />
          {errors.kesAcc && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="usdAcc"
          style={{ 
            display: "block", 
            marginBottom: "5px", 
          }}
          >USD Account: </label>
          <input
          style={{
            width: "100%", 
            padding: "10px", 
            border: "1px solid #ccc", 
            borderRadius: "6px" 
           }}
            type="text"
            id="usdAcc"
            placeholder="Enter USD Account"
            {...register("usdAcc", { required: true })}
            value={usdAcc}
            onChange={(e) => setUsdAccount(e.target.value)}
          />
          {errors.usdAcc && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="poundAcc"
          style={{ 
            display: "block", 
            marginBottom: "5px", 
          }}
          >Pounds Account: </label>
          <input
          style={{
            width: "100%", 
            padding: "10px", 
            border: "1px solid #ccc", 
            borderRadius: "6px" 
           }}
            type="text"
            id="poundAcc"
            placeholder="Enter Pound Account"
            {...register("poundAcc", { required: true })}
            value={poundAcc}
            onChange={(e) => setPoundAcc(e.target.value)}
          />
          {errors.poundAcc && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="swift"
          style={{ 
            display: "block", 
            marginBottom: "5px", 
          }}
          >Swift Code: </label>
          <input
          style={{
            width: "100%", 
            padding: "10px", 
            border: "1px solid #ccc", 
            borderRadius: "6px" 
           }}
            type="text"
            id="swift"
            placeholder="Enter Swift Code"
            {...register("swift", { required: true })}
            value={swift}
            onChange={(e) => setSwift(e.target.value)}
          />
          {errors.swift && <span>This field is required</span>}
        </div>


      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "30%",
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
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "12px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s",
              marginRight: "10px",
            }}
            type="submit"
          >
            Submit
          </button>
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
            padding: "12px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background-color 0.2s",
            marginRight: "10px",
            marginLeft: "66%",
          }}
            type="button"
            onClick={handleClearForm}
          >
            Clear Form
          </button>
        </div>
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Operation Successful.</DialogTitle>
        <DialogContent>
          <p> {bankName} has been added to the database.</p>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </form>
  );
}

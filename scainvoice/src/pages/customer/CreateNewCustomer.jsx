import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const CustomerForm = () => {
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

  const [custEmail, setcustEmail] = useState("");
  const [custName, setCustName] = useState("");
  const [custPIN, setCustPIN] = useState("");
  const [custStreet, setCustStreet] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [custPONumber, setCustPONumber] = useState("");
  const [custLocation, setCustLocation] = useState("");
  const [telephone, setTelephone] = useState("");

  const onSubmit = (data) => {
    const handleSubmit = async (event) => {
      try {
        await axios.post("http://localhost:3000/add_customers", {
          custEmail,
          custName,
          custPIN,
          custStreet,
          custAddress,
          custPONumber,
          custLocation,
          telephone,
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
    setcustEmail("");
    setCustName("");
    setCustLocation("");
    setCustPONumber("");
    setCustAddress("");
    setTelephone("");
    setCustPIN("");
    setCustStreet("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
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
              New Customer
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
          <label htmlFor="custName">Customer Name: </label>
          <input
            type="text"
            id="custName"
            placeholder="enter customer name"
            {...register("custName", { required: true })}
            value={custName}
            onChange={(e) => setCustName(e.target.value)}
          />
          {errors.custName && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="custEmail">Customer Email: </label>
          <input
            type="text"
            id="custEmail"
            placeholder="enter customer email"
            {...register("custEmail", { required: true })}
            value={custEmail}
            onChange={(e) => setcustEmail(e.target.value)}
          />
          {errors.custName && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="custPIN">Customer KRA PIN: </label>
          <input
            type="text"
            id="custPIN"
            placeholder="KRA PIN"
            {...register("custPIN", { required: true })}
            value={custPIN}
            onChange={(e) => setCustPIN(e.target.value)}
          />
          {errors.custPIN && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="custStreet">Customer Street: </label>
          <input
            type="text"
            id="custStreet"
            placeholder="customer street"
            {...register("custStreet", { required: false })}
            value={custStreet}
            onChange={(e) => setCustStreet(e.target.value)}
          />
          {errors.custStreet && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="custAddress">Customer Address: </label>
          <input
            type="text"
            id="custAddress"
            placeholder="customer address"
            {...register("custSAddress", { required: false })}
            value={custAddress}
            onChange={(e) => setCustAddress(e.target.value)}
          />
          {errors.custAddress && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="custPONumber">Customer Po Number: </label>
          <input
            type="text"
            id="custPONumber"
            placeholder="customer po number"
            {...register("custPONumber", { required: false })}
            value={custPONumber}
            onChange={(e) => setCustPONumber(e.target.value)}
          />
          {errors.custPONumber && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="custLocation">Customer Location: </label>
          <input
            type="text"
            id="custLocation"
            placeholder="customer location"
            {...register("custLocation", { required: false })}
            value={custLocation}
            onChange={(e) => setCustLocation(e.target.value)}
          />
          {errors.custLocation && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="telephone">Telephone: </label>
          <input
            type="text"
            id="telephone"
            placeholder="0723543332"
            {...register("telephone", {
              required: false,
              pattern: /^[0-9]{10}$/,
            })}
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
          {errors.custLocation && <span>This field is required</span>}
        </div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: "50%",
            }}
          >
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                Padding: "6px",
                height: "10%",
                width: "20%",
                borderRadius: "6px",
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
                backgroundColor: "red",
                color: "white",
                Padding: "6px",
                height: "10%",
                width: "30%",
                borderRadius: "6px",
              }}
              type="button"
              onClick={handleClearForm}
            >
              Clear Form
            </button>
          </div>

          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Operation Successful.</DialogTitle>
            <DialogContent>
              <p> {custName} has been added to the database.</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </form>
    </Box>
  );
};

export default CustomerForm;

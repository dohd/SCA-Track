import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import { Padding } from "@mui/icons-material";

const CustomerForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [custId, setCustID] = useState("");
  const [custName, setCustName] = useState("");
  const [custStreet, setCustStreet] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [custPONumber, setCustPONumber] = useState("");
  const [custLocation, setCustLocation] = useState("");
  const [telephone, setTelephone] = useState("");

  const onSubmit = (data) => {
    const handleSubmit = async (event) => {
      try {
        await axios.post("http://localhost:3000/add_customers", {
          custId,
          custName,
          custStreet,
          custAddress,
          custPONumber,
          custLocation,
          telephone,
        });
        alert("Customer added successfully!");
        handleClearForm();
      } catch (error) {
        console.error(error);
      }
    };
    handleSubmit();
  };

  const handleClearForm = () => {
    // Reset the form fields
    setCustID("");
    setCustName("");
    setCustLocation("");
    setCustPONumber("");
    setCustAddress("");
    setTelephone("");
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
        <div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            Create New Customer
          </h1>
          <label htmlFor="custid">Customer ID: </label>
          <input
            type="text"
            id="custID"
            placeholder="SCA-001"
            {...register("custID", { required: true })}
            value={custId}
            onChange={(e) => setCustID(e.target.value)}
          />
          {errors.custID && <span>This field is required</span>}
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
          <label htmlFor="custStreet">Customer Street: </label>
          <input
            type="text"
            id="custStreet"
            placeholder="customer street"
            {...register("custStreet", { required: false })}
            value={custStreet}
            onChange={(e) => setCustStreet(e.target.value)}
          />
          {errors.custStreet && <span></span>}
        </div>

        <div>
          <label htmlFor="custAddress">Customer Street: </label>
          <input
            type="text"
            id="custAddress"
            placeholder="customer address"
            {...register("custSAddress", { required: false })}
            value={custAddress}
            onChange={(e) => setCustAddress(e.target.value)}
          />
          {errors.custAddress && <span></span>}
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
          {errors.custPONumber && <span></span>}
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
          {errors.custLocation && <span></span>}
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
          {errors.telephone && <span></span>}
        </div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            display: "flex",
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
            type="submit" >
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
            
            type="button" onClick={handleClearForm}>
              Clear Form
            </button>
          </div>
        </Box>
      </form>
    </Box>
  );
};

export default CustomerForm;

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

export default function CreateDistributor() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();


  const [distID, setdistID] = useState("");
  const [distName, setDistName] = useState("");
  const [distLocation, setdistLocation] = useState("");
  const [distAddress, setdistAddress] = useState("");
  const [dtelephone, setdtelephone] = useState("");
  const [distEmail, setdistEmail] = useState("");

  const onSubmit = (data) => {
    const handleSubmit = async (event) => {
      try {
        await axios.post("http://localhost:3000/add_distributors", {
          distID,
          distName,
          distAddress,
          distLocation,
          dtelephone,
          distEmail,
        });
        alert("Distributor added successfully!");
        handleClearForm();
      } catch (error) {
        console.error(error);
      }
    };
    handleSubmit();
  };

  const handleClearForm = () => {
    // Reset the form fields
    setdistID("");
    setDistName("");
    setdistEmail("");
    setdistAddress("");
    setdistLocation("");
    setdtelephone("");
  };

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
         style={{
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#FFDEAD",
        maxWidth: "800px",
        padding: "20px",
        borderRadius: "6px",
        marginBottom: "20px",
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
          New Distributor
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
               
        <label htmlFor="distID"
         style={{ 
          display: "block", 
          marginBottom: "5px", 
        }}
        >Distributor ID: </label>
        <input
        style={{
          width: "100%", 
          padding: "10px", 
          border: "1px solid #ccc", 
          borderRadius: "6px" 
         }}
          type="text"
          id="distID"
          placeholder="Distributor ID"
          {...register("distID", { required: true })}
          value={distID}
          onChange={(e) => setdistID(e.target.value)}
        />
        {errors.distID && <span>This field is required</span>}
      </div>


      <div>
        <label htmlFor="distName"
         style={{ 
          display: "block", 
          marginBottom: "5px", 
        }}
        >Distributor Name: </label>
        <input
        style={{
          width: "100%", 
          padding: "10px", 
          border: "1px solid #ccc", 
          borderRadius: "6px" 
         }}
          type="text"
          id="distName"
          placeholder="Enter Distributor Dame"
          {...register("distName", { required: true })}
          value={distName}
          onChange={(e) => setDistName(e.target.value)}
        />
        {errors.distName && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="distEmail"
         style={{ 
          display: "block", 
          marginBottom: "5px", 
        }}
        >Distributor Email: </label>
        <input
        style={{
          width: "100%", 
          padding: "10px", 
          border: "1px solid #ccc", 
          borderRadius: "6px" 
         }}
          type="email"
          id="distEmail"
          placeholder="enter distributor email"
          {...register("distEmail", { required: true })}
          value={distEmail}
          onChange={(e) => setdistEmail(e.target.value)}
        />
        {errors.distEmail && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="distLocation"
         style={{ 
          display: "block", 
          marginBottom: "5px", 
        }}
        >Distributor Location: </label>
        <input
        style={{
          width: "100%", 
          padding: "10px", 
          border: "1px solid #ccc", 
          borderRadius: "6px" 
         }}
          type="text"
          id="distLocation"
          placeholder="enter distributor location"
          {...register("distLocation", { required: true })}
          value={distLocation}
          onChange={(e) => setdistLocation(e.target.value)}
        />
        {errors.distLocation && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="dtelephone"
         style={{ 
          display: "block", 
          marginBottom: "5px", 
        }}
        >Telephone: </label>
        <input
        style={{
          width: "100%", 
          padding: "10px", 
          border: "1px solid #ccc", 
          borderRadius: "6px" 
         }}
          type="phone"
          id="dtelephone"
          placeholder="0723543332"
          {...register("dtelephone", {
            required: false,
            pattern: /^[0-9]{10}$/,
          })}
          value={dtelephone}
          onChange={(e) => setdtelephone(e.target.value)}
        />
        {errors.dtelephone && <span></span>}
      </div>

      <div>
        <label htmlFor="distAddress"
         style={{ 
          display: "block", 
          marginBottom: "5px", 
        }}
        >Distributors Address: </label>
        <input
        style={{
          width: "100%", 
          padding: "10px", 
          border: "1px solid #ccc", 
          borderRadius: "6px" 
         }}
          type="text"
          id="distAddress"
          placeholder="distributrors address"
          {...register("distAddress", { required: false })}
          value={distAddress}
          onChange={(e) => setdistAddress(e.target.value)}
        />
        {errors.distAddress && <span></span>}
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
              marginLeft: "60%",
            }}
            type="button"
            onClick={handleClearForm}
          >
            Clear Form
          </button>
        </div>
      </Box>
    </form>
  );
}

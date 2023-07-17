import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

export default function CreateDistributor() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const [distID, setdistID] = useState("");
      const [distName, setDistName] = useState("");
      const [distLocation, setdistLocation] = useState("");
      const [distAddress, setdistAddress] = useState("");
      const[dtelephone, setdtelephone] = useState("");
      const[distEmail, setdistEmail]= useState("");
    
      const onSubmit = (data) => {
        const handleSubmit = async (event) => {
          try {
            await axios.post("http://localhost:3000/add_customers", {
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
      }
  return (
    <form 
    style={{
      height: 400,
      width: "60%",
      marginLeft: "auto",
      marginRight: "auto",
    }}>
         <div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            Create New Distributor
          </h1>
          <label htmlFor="custid">Distributor ID: </label>
          <input
            type="text"
            id="distID"
            placeholder="id"
            {...register("distID", { required: true })}
            value={distID}
            onChange={(e) => setdistID(e.target.value)}
          />
          {errors.distID && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="custName">Distributor Name: </label>
          <input
            type="text"
            id="distName"
            placeholder="enter distributor name"
            {...register("distName", { required: true })}
            value={distName}
            onChange={(e) => setDistName(e.target.value)}
          />
          {errors.distName && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="custName">Distributor Email: </label>
          <input
            type="text"
            id="distEmail"
            placeholder="enter distributor email"
            {...register("distEmail", { required: true })}
            value={distEmail}
            onChange={(e) => setdistEmail(e.target.value)}
          />
          {errors.distEmail && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="custName">Distributor Location: </label>
          <input
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
          <label htmlFor="telephone">Telephone: </label>
          <input
            type="text"
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
          <label htmlFor="distAddress">Distributors Address: </label>
          <input
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
              backgroundColor: "green",
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
              backgroundColor: "green",
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
  )
}



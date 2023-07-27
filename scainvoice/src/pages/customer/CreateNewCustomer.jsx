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
  const [custID, setCustID] = useState([]);

  const onSubmit = (data) => {
    const handleSubmit = async (event) => {
      try {
        await axios.post("http://localhost:3000/add_customers", {
          custIDString,
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
        setNewCustID();
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

   //fetch latest Customer ID
   const fetchCustID = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/read_custID"
      );
      setCustID(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustID();
  }, []);

  let custIDString = "";

  // Step 2: Assign the value of invoice.invoice_no to the string variable
  custID.forEach((cusstomerID) => {
    custIDString += cusstomerID.cust_id;
  });

  // Step 3: Log the string variable
  console.log(custIDString);

  function incrementCustID(currentCustID) {
    // Extract the numeric part and increment it
    let numericPart = currentCustID.slice(4);
    let incrementedNumericPart = (parseInt(numericPart, 10) + 1).toString().padStart(3, "0");

    // Construct the new customer number with the incremented numeric part
    let newCustID = "SCA-" + incrementedNumericPart;

    // Log the output to the console

    return newCustID;
  }

  let currentCustomerID = incrementCustID(custIDString);
  console.log("New CUST Number:", currentCustomerID); 


  const setNewCustID = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/update/custID",
        {
          currentCustomerID,
        }
      );

      console.log(response.data); // Assuming the response contains the updated movie details
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
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
        <h3
            style={{
              fontSize: "26px",
              fontWeight: "500",
              marginBottom: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            Cusromer ID: &nbsp;
            <ul>
              {custID.map((id, index) => (
                <li key={index}>
                  <h3 id="custID">{id.cust_id}</h3>
                </li>
              ))}
            </ul>
          </h3>

        <div>
          <label htmlFor="custName"
          style={{ 
            display: "block", 
            marginBottom: "5px", 
          }}
          >Customer Name: </label>
          <input

style={{
  width: "100%", 
  padding: "10px", 
  border: "1px solid #ccc", 
  borderRadius: "6px" 
 }}
            type="text"
            id="custName"
            placeholder="Enter customer name"
            {...register("custName", { required: true })}
            value={custName}
            onChange={(e) => setCustName(e.target.value)}
          />
          {errors.custName && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="custEmail"
                    style={{ 
                      display: "block", 
                      marginBottom: "5px", 
                    }}
          >Customer Email: </label>
          <input
                      style={{
                        width: "100%", 
                        padding: "10px", 
                        border: "1px solid #ccc", 
                        borderRadius: "6px" 
                       }}
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
          <label htmlFor="custPIN"
           style={{ 
            display: "block", 
            marginBottom: "5px", 
          }}
          >Customer KRA PIN: </label>
          <input
style={{
  width: "100%", 
  padding: "10px", 
  border: "1px solid #ccc", 
  borderRadius: "6px" 
 }}

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
          <label htmlFor="custStreet"
          style={{ 
            display: "block", 
            marginBottom: "5px", 
          }}
          >Customer Street: </label>
          <input
  style={{
    width: "100%", 
    padding: "10px", 
    border: "1px solid #ccc", 
    borderRadius: "6px" 
   }}

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
          <label htmlFor="custAddress"
          style={{ 
            display: "block", 
            marginBottom: "5px", 
          }}
          >Customer Address: </label>
          <input
           style={{
            width: "100%", 
            padding: "10px", 
            border: "1px solid #ccc", 
            borderRadius: "6px" 
           }}
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
          <label htmlFor="custPONumber"
          style={{ 
            display: "block", 
            marginBottom: "5px", 
          }}
          >Customer Po Number: </label>
          <input

style={{
  width: "100%", 
  padding: "10px", 
  border: "1px solid #ccc", 
  borderRadius: "6px" 
 }}
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
          <label htmlFor="custLocation"
          style={{ 
            display: "block", 
            marginBottom: "5px", 
          }}
          >Customer Location: </label>
          <input
          style={{
             width: "100%", 
             padding: "10px", 
             border: "1px solid #ccc", 
             borderRadius: "6px" 
            }}
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
          <label htmlFor="telephone"
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

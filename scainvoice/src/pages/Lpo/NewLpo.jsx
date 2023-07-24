import React from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const myCurrency = [
  {
    value: "1",
    label: "USD",
  },
  {
    value: "2",
    label: "Pounds",
  },
  {
    value: "3",
    label: "KES",
  },
];

export default function CreateInvoice() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [distributors, setMyDistributors] = useState([]); //distributors
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [itemList, setItemList] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [vatPrice, setVatPrice] = useState(0);
  const [overallTotalPrice, setOverallTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [lpo_date, setLpo_date] = useState("");
  const [days, setDays] = useState("");
  const [distDetails, setDistDetails] = useState([]);
  const [lpo_number, setLpoNo] = useState([]);

  const fetchDistributors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/read_distributors"
      );
      setMyDistributors(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchDistributors();

  const handleDistributorChange = (e) => {
    setSelectedDistributor(e.target.value);
  };
  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  useEffect(() => {
    // Recalculate VAT and Overall Total whenever totalPrice changes
    setVatPrice(totalPrice * 0.16);
    setOverallTotalPrice(totalPrice + totalPrice * 0.16);
  }, [totalPrice]);

  //  hook to log the selected distributor outside the component
  useEffect(() => {}, [selectedDistributor]);
  useEffect(() => {}, [selectedCurrency]);


  const fetchSelectedDistributor = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/read_distributor",
        {
          params: {
            selectedDistributor,
          },
        }
      );
      setDistDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchSelectedDistributor();

  //fetch latest lpo number
  const fetchLPoNumber = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/read_lpo_number"
      );
      setLpoNo(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchLPoNumber();
  }, []);


  const handleAddItem = () => {
    const newItem = {
      itemDescription: itemDescription,
      quantity: quantity,
      unitPrice: unitPrice,
      subtotal: quantity * unitPrice,
    };

    setItemList([...itemList, newItem]);
    setTotalPrice(totalPrice + newItem.subtotal);
    // Reset the form fields after adding the item
    setItemDescription("");
    setQuantity(0);
    setUnitPrice(0);
  };




  let lpoNumberString = "";

// Step 2: Assign the value of lpo.lpo_no to the string variable
lpo_number.forEach((lpo) => {
  lpoNumberString += lpo.lpo_no;
});

// Step 3: Log the string variable
console.log(lpoNumberString);

function incrementLpoNumber(currentLpoNumber) {
  // Extract the numeric part and increment it
  let numericPart = currentLpoNumber.slice(4);
  let incrementedNumericPart = (parseInt(numericPart, 10) + 1).toString().padStart(3, "0");

  // Construct the new LPO number with the incremented numeric part
  let newLpoNumber = "LPO-" + incrementedNumericPart;

  // Log the output to the console
  console.log("New LPO Number:", newLpoNumber);

  return newLpoNumber;
}

let currentLpoNumber = incrementLpoNumber(lpoNumberString);

  const columns = [
    { field: "id", headerName: "NO", width: 80 },
    { field: "itemDescription", headerName: "Description", width: 300 },
    { field: "quantity", headerName: "Qty", width: 80 },
    { field: "unitPrice", headerName: "Unit price", width: 100 },
    { field: "subtotal", headerName: "Total Price", width: 100 },
    {
      field: "Action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        const itemID = params.row.id;
        return (
          <>
            <button
              className="InvoiceListEdit"
              onClick={() => handleDeleteItem(itemID)}
            >
              <DeleteIcon className="InvoiceListDelete" />
            </button>
          </>
        );
      },
    },
  ];

  const generateRowsWithIds = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
  };

  const handleDeleteItem = (itemID) => {
    const itemIDString = itemID.toString();
    const deletedItem = itemList.find((item) => item.id === itemIDString);

    if (deletedItem) {
      setTotalPrice(totalPrice - deletedItem.subtotal);
      setItemList(itemList.filter((item) => item.id !== itemIDString));
    }
  };


   

  // start sending data to backend
    // Function to send the items to the backend
    const sendItemsToBackend = () => {

      const dataToSend = {
        lpoNumberString,
        itemList,
      };

      axios.post("http://localhost:3000/add_lpo_item", { dataToSend })
        .then(response => {
          // Handle the response from the backend if needed
          console.log('Items sent successfully!');
          alert("done");
        })
        .catch(error => {
          // Handle any errors that occurred during the request
          console.error('Error sending items to the backend:', error);
          alert("error");
        });
    };

  const rowsWithIds = generateRowsWithIds(itemList);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "90%",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#FFDEAD",
          padding: "20px",
          borderRadius: "6px",
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
            Create New LPO
          </h1>
          <h3
            style={{
              fontSize: "26px",
              fontWeight: "500",
              marginBottom: "10px",
              display: "flex",
              flexDirection: "row"
            }}
          >
            LPO Number:  
            <ul>
        {lpo_number.map((lpo, index) => (
          <li key={index}>
            
            <h3 id="myLpoNo" >
             {lpo.lpo_no}
          </h3>

          </li>
          
        ))}
      </ul>
          </h3>

          <div className="top_section" style={{ marginBottom: "20px" }}>
            <div className="drop-down">
              <h2>Select a distributor</h2>
              <select
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: "4px",
                }}
                value={selectedDistributor}
                onChange={handleDistributorChange}
              >
                <option value="">-- Select a distributor --</option>
                {distributors.map((option) => (
                  <option
                    key={option.distributor_name}
                    value={option.distributor_name}
                  >
                    {option.distributor_name}
                  </option>
                ))}
              </select>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "60%",
                }}
              >
                
                <ul>
                  {distDetails.map((info, index) => (
                    <li key={index}>
                      <h4>Address: {info.distributor_address}</h4>
                      <h4>Phone: {info.distributor_phone}</h4>
                      <h4>Email: {info.distributor_email}</h4>
                    </li>
                  ))}
                </ul>
                
                <div
                  style={{
                    display: "flexr",
                    flexDirection: "column",
                    marginTop: "10px",
                  }}
                >
                  <h4>Currency: </h4>
                  <select
                    style={{
                      width: "80%",
                      padding: "6px",
                      borderRadius: "4px",
                    }}
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                  >
                    <option value="">-- Select a Currency --</option>
                    {myCurrency.map((myCurrency) => (
                      <option key={myCurrency.value} value=     {myCurrency.label}>
                        {myCurrency.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                style={{
                  marginBottom: "20px",
                  width: "40%",
                }}
              >
                <div style={{ flex: "1", marginRight: "10px" }}>
                  <label htmlFor="date">Date:</label>
                  <input
                    style={{
                      width: "100%",
                      padding: "6px",
                      borderRadius: "4px",
                    }}
                    type="date"
                    id="lpo_date"
                    {...register("Lpo_date", { required: true })}
                    value={lpo_date}
                    onChange={(e) => setLpo_date(e.target.value)}
                  />
                  {errors.lpo_date && <span>This field is required</span>}
                </div>

                <div style={{ marginBottom: "20px", marginTop: "16px" }}>
                  <label htmlFor="days">Due in (days):</label>
                  <input
                    style={{
                      width: "96%",
                      padding: "6px",
                      borderRadius: "4px",
                    }}
                    type="number"
                    id="days"
                    placeholder="20"
                    {...register("days", { required: true })}
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                  />
                  {errors.days && <span>This field is required</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            Add Item
          </h1>

          <label>Item Description:</label>
          <input
            style={{
              width: "100%",
              padding: "6px",
              borderRadius: "4px",
              marginTop: "10px",
            }}
            type="text"
            id="item_description"
            placeholder="Item description"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          />

          <label>Quantity:</label>
          <input
            style={{
              width: "100%",
              padding: "6px",
              borderRadius: "4px",
              marginTop: "10px",
            }}
            type="number"
            id="quantity"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          {errors.custID && <span>This field is required</span>}

          <label>Unit Price:</label>
          <input
            style={{
              width: "100%",
              padding: "6px",
              borderRadius: "4px",
              marginTop: "10px",
            }}
            type="number"
            id="unitPrice"
            placeholder="Unit price"
            value={unitPrice}
            onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
          />
          {errors.quantity && <span>This field is required</span>}

          <button
            style={{
              backgroundColor: "green",
              color: "white",
              Padding: "10px",
              height: 40,
              width: "100%",
              borderRadius: "6px",
              marginBottom: "6px",
              marginTop: "10px",
            }}
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>

        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            Item List
          </h2>
          <DataGrid rows={rowsWithIds} columns={columns} pageSize={5} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
              width: "60%",
            }}
          >
            <h3
              style={{
                fontSize: "26px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Message
            </h3>
            <textarea
              id="message"
              name="lpo_message"
              rows="4"
              cols="50"
              placeholder="Enter message here..."
              style={{ width: "100%", padding: "6px", borderRadius: "4px" }}
              {...register("message", { required: true })}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && <span>This field is required</span>}
          </div>

          <div
            style={{
              marginBottom: "20px",
              width: "40%",
              paddingTop: "56px",
              paddingLeft: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Sub-Total Price: {totalPrice}
            </h3>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Vat Price: {vatPrice}
            </h3>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Total Price: {overallTotalPrice}
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
            marginTop: "20px",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              Padding: "10px",
              height: 40,
              width: "40%",
              borderRadius: "6px",
              marginBottom: "6px",
              marginTop: "10px",
            }}
          >
            Clear Form
          </button>

          <button
            style={{
              backgroundColor: "green",
              color: "white",
              Padding: "10px",
              height: 40,
              width: "40%",
              borderRadius: "6px",
              marginBottom: "6px",
              marginTop: "10px",
            }}
            onClick={sendItemsToBackend}
          >
            Save
          </button>
        </div>
      </div>
    </Box>
  );
}

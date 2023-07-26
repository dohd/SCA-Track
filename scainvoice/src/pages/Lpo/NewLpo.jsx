import React from "react";
import { useForm } from "react-hook-form";
import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

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

export default function CreateLPO() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [distributors, setMyDistributors] = useState([]); //distributors
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [lpoItems, setLpoItems] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subtotalPrice, setSubTotalPrice] = useState(0);
  const [vatPrice, setVatPrice] = useState(0);
  const [overallTotalPrice, setOverallTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [lpo_date, setLpo_date] = useState("");
  const [days, setDays] = useState("");
  const [distDetails, setDistDetails] = useState([]);
  const [lpo_number, setLpoNo] = useState([]);

  const navigate = useNavigate();

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
      const response = await axios.get("http://localhost:3000/read_lpo_number");
      setLpoNo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLPoNumber();
  }, []);

 

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
    let incrementedNumericPart = (parseInt(numericPart, 10) + 1)
      .toString()
      .padStart(3, "0");

    // Construct the new LPO number with the incremented numeric part
    let newLpoNumber = "LPO-" + incrementedNumericPart;

    // Log the output to the console
    console.log("New LPO Number:", newLpoNumber);

    return newLpoNumber;
  }

  let currentLpoNumber = incrementLpoNumber(lpoNumberString);

  const columns = [
    { field: "id", headerName: "NO", width: 80 },
    { field: "item_name", headerName: "Description", width: 300 },
    { field: "quantity", headerName: "Qty", width: 80 },
    { field: "unit_price", headerName: "Unit price", width: 100 },
    { field: "total_price", headerName: "Total Price", width: 100 },
    {
      field: "Action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        const itemID = params.row.id;
        const itemName = params.row.item_name;
        return (
          <>
            <button
              className="InvoiceListEdit"
              onClick={() => handleDelete(itemID, itemName)}

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



  const rowsWithIds = generateRowsWithIds(lpoItems);

  // start sending data to backend
    //add lpo items
    const addItem = (data) => {
      const handleSubmit = async (event) => {
        try {
          await axios.post("http://localhost:3000/add_lpo_item", {
            lpoNumberString,
            itemDescription,
            quantity,
            unitPrice,
            totalPrice,
            selectedCurrency,
          });
          setItemDescription("");
          setQuantity(0);
          setUnitPrice(0);
        } catch (error) {
          console.error(error);
        }
      };
      handleSubmit();
    };

    useEffect(() => {
      // Whenever quantity or unit price changes, update the total price and send it to the backend
      const total = quantity * unitPrice;
      setTotalPrice(total);
    }, [quantity, unitPrice]);

    useEffect(() => {
      // Calculate the total from the data whenever the data changes
      const calculateTotal = () => {
        const subtotalArr = lpoItems.map((item) => item.total_price);
        const totalAmount = subtotalArr.reduce((acc, curr) => acc + curr, 0);
        setSubTotalPrice(totalAmount);
      };
  
      calculateTotal();
    }, [lpoItems]);

    useEffect(() => {
      // Calculate the VAT (16% of the total) whenever the total changes
      const calculateVAT = () => {
        const vatAmount = subtotalPrice * 0.16;
        setVatPrice(vatAmount);
      };
  
      calculateVAT();
    }, [subtotalPrice]);

    useEffect(() => {
      // Calculate the overall total (total + VAT) whenever the VAT changes
      const calculateOverallTotal = () => {
        const overallTotalAmount = subtotalPrice + vatPrice;
        setOverallTotalPrice(overallTotalAmount);
      };
  
      calculateOverallTotal();
    }, [vatPrice]);
  

    const handleQuantityChange = (event) => {
      setQuantity(Number(event.target.value));
    };
  
    const handleUnitPriceChange = (event) => {
      setUnitPrice(Number(event.target.value));
    };
  




  //delete item
  const handleDelete = async (itemID, itemName) => {

    try {
      const response = await axios.delete(
        `http://localhost:3000/delete/lpoItem`,
        {
          params: {
            lpoNumberString,
            itemName,
          },
        }
      );
      console.log(response.data); 
      setItemDescription("");
      setQuantity(0);
      setUnitPrice(0);
      alert("Deleted Successfuly!");
      fetchLpoItems(); //update the list
    } catch (error) {
      console.error(error);
    }
  };
 

    
  
    const fetchLpoItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/read_lpoItems", {
          params: {
            lpoNumberString,
          },
        });
        setLpoItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLpoItems();

    useEffect(() => {
      fetchLpoItems();
    }, []);

  //add lpo
  const addDate = (data) => {
    const handleSubmit = async (event) => {
      try {
        await axios.post("http://localhost:3000/add_lpo", {
          lpoNumberString,
          lpo_date,
          days,
          subtotalPrice,
          overallTotalPrice,
          vatPrice,
          selectedDistributor,
        });
        
      } catch (error) {
        console.error(error);
      }
    };
    handleSubmit();
    addMessage();
    // sendItemsToBackend();
  };

  const addMessage = (data) => {
    const handleSubmit = async (event) => {
      try {
        await axios.post("http://localhost:3000/add_lpo_message", {
          lpoNumberString,
          message,
        });
        // alert("Message added successfully!");
        // handleClearForm();
      } catch (error) {
        console.error(error);
      }
    };
    handleSubmit();
    setNewLpoNo();
  };

  const setNewLpoNo = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/update/lpo_number",
        {
          currentLpoNumber,
        }
      );

      console.log(response.data); // Assuming the response contains the updated movie details
      clearForm();
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  const clearForm = () => {
    setItemDescription("");
    setQuantity(0);
    setUnitPrice(0);
    setSelectedCurrency("");
    setSelectedDistributor("");
    setDays("");
    setLpo_date("");
    setMessage("");
    setOverallTotalPrice(0);
    setTotalPrice(0);
    setVatPrice(0);
  };

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
          marginLeft: "60px",
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
              New LPO
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
          <h3
            style={{
              fontSize: "26px",
              fontWeight: "500",
              marginBottom: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            LPO Number: &nbsp;
            <ul>
              {lpo_number.map((lpo, index) => (
                <li key={index}>
                  <h3 id="myLpoNo">{lpo.lpo_no}</h3>
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
                      <option key={myCurrency.value} value={myCurrency.label}>
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
            onChange={handleQuantityChange}
          />

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
            onChange={handleUnitPriceChange}
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
            onClick={addItem}
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
              Sub-Total Price: {subtotalPrice}
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
                fontWeight: "600",
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
            onClick={clearForm}
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
            onClick={addDate}
          >
            Save
          </button>
        </div>
      </div>
    </Box>
  );
}

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

  const item_id_1 = 1;
  const currency_1 = "KES";
  const Lpo_no = "sca102";
  const distributor = "Acsis";

  const [distributors, setMyDistributors] = useState([]);
  const [item_id] = useState(item_id_1);
  const [lpo_number] = useState(Lpo_no);
  const [item_name, setItem_name] = useState("");
  const [lpo_date, setLpo_date] = useState("");
  const [days, setDays] = useState("");
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit_price, setUnit_price] = useState("");
  const [total_price, setTotal_price] = useState("");
  const [currency] = useState(currency_1);
  const [selectedItem, setSelectedItem] = useState({});

  // console.log(distributors);

  const Distributors = [
    {
      distributor_name: "Distributor 1",
      distributor_address: "Address 1",
      distributor_email: "distributor1@example.com",
      distributor_phone: "123-456-7890",
    },
    {
      distributor_name: "Distributor 2",
      distributor_address: "Address 2",
      distributor_email: "distributor2@example.com",
      distributor_phone: "987-654-3210",
    },
    // Add more distributors as needed
  ];

  ///// fetch distributors
  useEffect(() => {
    fetchDistributors();
  }, []);

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

  const [selectedDistributor, setSelectedDistributor] = useState(
    distributors[0]
  );

  const handleDistributorChange = (event) => {
    const selectedDistributorName = event.target.value;
    const selectedDistributor = distributors.find(
      (distributor) => distributor.distributor_name === selectedDistributorName
    );
    setSelectedDistributor(selectedDistributor);
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value);

    // Calculate total price
    const unitPrice = parseFloat(unit_price);
    const quantity = parseFloat(value);
    const total = unitPrice * quantity;
    setTotal_price(total.toString());
  };

  const handleUnitPriceChange = (event) => {
    const value = event.target.value;
    setUnit_price(value);
    setQuantity(value);

    // Calculate total price
    const unitPrice = parseFloat(value);
    const quantity = parseFloat(quantity);
    const total = unitPrice * quantity;
    setTotal_price(total.toString());
  };

  //delete item
  const handleDelete = async (itemID, itemName) => {
    setSelectedItem({ itemID, itemName });
    console.log(itemName);
    try {
      const response = await axios.delete(
        `http://localhost:3000/delete/lpoItem`,
        {
          params: {
            itemName,
          },
        }
      );
      console.log(response.data); // Assuming the response contains the success message
      console.log(itemName);
      alert("Deleted Successfuly!");
      fetchLpoItems(); //update the list
    } catch (error) {
      console.error(error);
    }
  };

  //add lpo items
  const onSubmit = (data) => {
    const handleSubmit = async (event) => {
      try {
        await axios.post("http://localhost:3000/add_lpo_item", {
          item_id,
          lpo_number,
          item_name,
          quantity,
          unit_price,
          total_price,
          currency,
        });
        handleClearForm();
      } catch (error) {
        console.error(error);
      }
    };
    handleSubmit();
  };

  //add lpo
  const addDate = (data) => {
    const handleSubmit = async (event) => {
      try {
        await axios.post("http://localhost:3000/add_lpo", {
          lpo_number,
          lpo_date,
          days,
          finalTotal,
          overallTotal,
          vatPrice,
          distributor,
        });
        alert("Date added successfully!");
        handleClearForm();
      } catch (error) {
        console.error(error);
      }
    };
    handleSubmit();
  };

  const addMessage = (data) => {
    const handleSubmit = async (event) => {
      try {
        await axios.post("http://localhost:3000/add_lpo_message", {
          lpo_number,
          message,
        });
        alert("Message added successfully!");
        handleClearForm();
      } catch (error) {
        console.error(error);
      }
    };
    handleSubmit();
  };

  const handleClearForm = () => {
    // Reset the form fields
    // date("");
    // days("");
  };

  const [lpoItems, setLpoItems] = useState([]);

  useEffect(() => {
    fetchLpoItems();
  }, []);

  const fetchLpoItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/read_lpoItems", {
        params: {
          lpo_number,
        },
      });
      setLpoItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
      id: `${(index + 1).toString().padStart(3, "0")}`,
    }));
  };

  const rowsWithIds = generateRowsWithIds(lpoItems);

  //calculate total
  const [overallTotal, setOverallTotal] = useState(0);

  useEffect(() => {
    // Calculate overall total when component mounts or data changes
    const calculateOverallTotal = () => {
      const totalPriceSum = lpoItems.reduce(
        (sum, item) => sum + item.total_price,
        0
      );
      setOverallTotal(totalPriceSum);
    };

    calculateOverallTotal();
  }); // Empty dependency array, so the effect runs only once

  const vatPrice = overallTotal * 0.16;
  const finalTotal = vatPrice + overallTotal;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        flexDirection: "column",
        marginBottom: "20px",
      }}
    >
      <form
        style={{
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "grey",
          padding: "6px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "500",
              marginBottom: "10px",
              fontFamily: "bold",
            }}
          >
            Create New LPO
          </h1>
          <h3
            style={{
              fontSize: "26px",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            LPO Number:
          </h3>

          <div className="top_section">
            <div className="drop-down">
              <h2>Select a distributor</h2>
              <select
                style={{
                  width: "100%",
                  padding: "6px",
                }}
                // value={selectedDistributor.distributor_name}
                onChange={handleDistributorChange}
              >
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  width: "50%",
                  margin: "3px",
                }}
              >
                <label htmlFor="date">Date: </label>
                <input
                  style={{
                    width: "80%",
                  }}
                  type="date"
                  id="lpo_date"
                  {...register("Lpo_date", { required: true })}
                  value={lpo_date}
                  onChange={(e) => setLpo_date(e.target.value)}
                />
                {errors.lpo_date && <span>This field is required</span>}
              </div>

              <div
                className="drop-down"
                style={{
                  width: "50%",
                  margin: "3px",
                }}
              >
                <select
                  style={{
                    width: "100%",
                    padding: "6px",
                    margin: "3px",
                  }}
                >
                  {myCurrency.map((myCurrency) => (
                    <option key={myCurrency.value} value={myCurrency.value}>
                      {myCurrency.label}
                    </option>
                  ))}
                </select>
              </div>
            </Box>

            <div>
              <label htmlFor="days">Due in (days): </label>
              <input
                style={{
                  width: "31%",
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

            <div
              className="customer_details"
              style={{
                width: "100%",
                marginTop: "20px",
              }}
            >
              {/* <h4>Address: {selectedDistributor.distributor_address}</h4>
              <h4>Email: {selectedDistributor.distributor_email}</h4>
              <h4>Phone: {selectedDistributor.distributor_phone}</h4> */}
            </div>

            <div
              className="add_items"
              style={{
                width: "100%",
                marginTop: "20px",
              }}
            >
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: "500",
                  marginBottom: "10px",
                  fontFamily: "bold",
                }}
              >
                Add Item
              </h1>

              <div
                style={{
                  width: "99%",
                  margin: "6px",
                }}
              >
                <input
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  id="item_name"
                  placeholder="Item description"
                  {...register("item_name", { required: true })}
                  value={item_name}
                  onChange={(e) => setItem_name(e.target.value)}
                />
                {errors.custID && <span>This field is required</span>}
              </div>

              <div
                style={{
                  width: "99%",
                  margin: "6px",
                }}
              >
                <input
                  style={{
                    width: "100%",
                  }}
                  type="number"
                  id="unit_price"
                  placeholder="Unit price"
                  {...register("unit_price", { required: true })}
                  value={unit_price}
                  onChange={(e) => setUnit_price(e.target.value)}
                />
                {errors.custID && <span>This field is required</span>}
              </div>
              <div
                style={{
                  width: "99%",
                  margin: "6px",
                }}
              >
                <input
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  id="quantity"
                  placeholder="Quantity"
                  {...register("quantity", { required: true })}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  onChange={handleQuantityChange}
                />
                {errors.quantity && <span>This field is required</span>}
              </div>
            </div>

            <button
              style={{
                backgroundColor: "red",
                color: "white",
                Padding: "10px",
                height: 40,
                width: "100%",
                borderRadius: "6px",
                marginBottom: "6px",
              }}
              type="submit"
              onClick={onSubmit}
            >
              Add Item
            </button>

            <DataGrid rows={rowsWithIds} columns={columns} pageSize={5} />
          </div>
        </div>
        <h3>Message</h3>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 100,
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              height: 100,
              width: "50%",
              display: "flex",
            }}
          >
            <textarea
              id="message"
              name="lpo_message"
              rows="4"
              cols="50"
              placeholder="Enter message here......"
              style={{
                width: "100%",
                height: "100%",
              }}
              {...register("message", { required: true })}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            >
              {errors.message && <span>This field is required</span>}
            </textarea>
          </Box>
          <Box
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              height: 100,
              width: "40%",
              display: "flex",
            }}
          >
            <div
              className="totals"
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
              }}
            >
              <h3>Sub-total: {overallTotal}</h3>
              <h3>VAT(16): {vatPrice}</h3>
              <h2>Total: {finalTotal}</h2>
            </div>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
            marginBottom: "20px",
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
                width: "30%",
                height: 40,
                borderRadius: "6px",
              }}
              type="submit"
              onClick={addDate, addMessage}
            
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
                width: "30%",
                height: 40,
                borderRadius: "6px",
              }}
              type="button"
            >
              Save PDF
            </button>
          </div>
        </Box>
      </form>
    </Box>
  );
}

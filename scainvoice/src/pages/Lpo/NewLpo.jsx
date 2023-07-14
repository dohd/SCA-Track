import React from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  {
    description: "HP printer",
    qty: "2",
    unitPrice: "30000",
    total: "60000",
  },
  {
    description: "HP printer",
    qty: "2",
    unitPrice: "30000",
    total: "60000",
  },
  {
    description: "HP printer",
    qty: "2",
    unitPrice: "30000",
    total: "60000",
  },
  {
    description: "HP printer",
    qty: "2",
    unitPrice: "30000",
    total: "60000",
  },
];
const options = [
  {
    value: "1",
    label: "Reddinton",
  },
  {
    value: "2",
    label: "Acsis",
  },
  {
    value: "3",
    label: "Sidian Bank",
  },
];

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
  const Lpo_no = "sca101";

  const [item_id] = useState(item_id_1);
  const [lpo_number] = useState(Lpo_no);
  const [item_name, setItem_name] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit_price, setUnit_price] = useState("");
  const [total_price, setTotal_price] = useState("");
  const [currency] = useState(currency_1);

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
    { field: "id", headerName: "Item ID", width: 120 },
    { field: "item_name", headerName: "Description", width: 200 },
    { field: "quantity", headerName: "Qty", width: 80 },
    { field: "unit_price", headerName: "Unit price", width: 100 },
    { field: "total_price", headerName: "Total Price", width: 100 },
    { field: "currency", headerName: "currency", width: 100 },
  ];

  const generateRowsWithIds = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      id: `SCA-${(index + 1).toString().padStart(3, "0")}`, // Generate ID in the format SCA-001
    }));
  };

  const rowsWithIds = generateRowsWithIds(lpoItems);
  console.log(lpoItems);
  console.log(rows);

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
              <select
                style={{
                  width: "100%",
                  padding: "6px",
                }}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
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
                  id="date"
                  placeholder="enter customer name"
                  // {...register("custName", { required: true })}
                  // value={custName}
                  // onChange={(e) => setCustName(e.target.value)}
                />
                {/* {errors.custName && <span>This field is required</span>} */}
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
                  {myCurrency.map((currency) => (
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
                // {...register("custName", { required: true })}
                // value={custName}
                // onChange={(e) => setCustName(e.target.value)}
              />
              {/* {errors.custName && <span>This field is required</span>} */}
            </div>

            <div
              className="customer_details"
              style={{
                width: "100%",
                marginTop: "20px",
              }}
            >
              <h2>Customer Address:</h2>
              <h2>Customer Street:</h2>
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

            <DataGrid
              rows={rowsWithIds}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
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
            <input
              style={{
                width: "100%",
                height: "100%",
              }}
              type="text"
              id="custPONumber"
              placeholder="Message"

              //   value={custPONumber}
              //   onChange={(e) => setCustPONumber(e.target.value)}
            />
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
              <h3>Sub-total: 10000</h3>
              <h3>VAT(16): 10000</h3>
              <h2>Total: 10000</h2>
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
              Clear Form
            </button>
          </div>
        </Box>
      </form>
    </Box>
  );
}

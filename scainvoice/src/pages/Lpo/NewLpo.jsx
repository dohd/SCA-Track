import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
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

const currency = [
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
  const columns = [
    { field: "id", headerName: "Item ID", width: 120 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "qty", headerName: "Qty", width: 80 },
    { field: "unitPrice", headerName: "Unit price", width: 100 },
    { field: "total", headerName: "Total Price", width: 100 },
  ];

  const generateRowsWithIds = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      id: `SCA-${(index + 1).toString().padStart(3, "0")}`, // Generate ID in the format SCA-001
    }));
  };

  const rowsWithIds = generateRowsWithIds(rows);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/read_customers");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
              }}
            >
              <p
                style={{
                  width: "50%",
                  margin: "3px",
                }}
              >
                Date: 10-10-2023
              </p>

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
                  {currency.map((currency) => (
                    <option key={currency.value} value={currency.value}>
                      {currency.label}
                    </option>
                  ))}
                </select>
              </div>
            </Box>

            <p
              style={{
                width: "50%",
                margin: "3px",
              }}
            >
              Date: 10-10-2023
            </p>

            <div className="add_items">
              <h4>Add item</h4>

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
                  id="custPONumber"
                  placeholder="Item description"

                  //   value={custPONumber}
                  //   onChange={(e) => setCustPONumber(e.target.value)}
                />
                {/* {errors.custPONumber && <span></span>} */}
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
                  id="custPONumber"
                  placeholder="Quantity"

                  //   value={custPONumber}
                  //   onChange={(e) => setCustPONumber(e.target.value)}
                />
                {/* {errors.custPONumber && <span></span>} */}
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
                  id="custPONumber"
                  placeholder="Unit price"

                  //   value={custPONumber}
                  //   onChange={(e) => setCustPONumber(e.target.value)}
                />
                {/* {errors.custPONumber && <span></span>} */}
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
            <div className="totals"
             style={{
                width: "100%",
                height: "100%",
                alignItems: "center"
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

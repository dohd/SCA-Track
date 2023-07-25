import React from "react";
import { useForm } from "react-hook-form";
import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from 'react-router-dom';

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

export default function NewInvoice() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [invoice_number, setInvoiceNo] = useState([]);
  const [custDetails, setCustDetails] = useState([]);
  const [invoice_date, setInvoice_date] = useState("");
  const [advancePayment, setAdvancepayment] = useState("");
  const [itemList, setItemList] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [vatPrice, setVatPrice] = useState(0);
  const [overallTotalPrice, setOverallTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [bankDetails, setBankDetails] = useState([]);

  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/read_customers"
      );
      setCustomers(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBanks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/read_bankRecords"
      );
      setBanks(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchCustomers();
  fetchBanks();

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
  };
  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };
  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

   //  hook to log the selected customer and currency outside the component
   useEffect(() => {}, [selectedCustomer]);
   useEffect(() => {}, [selectedCurrency]);
   useEffect(() => {}, [selectedBank]);

   const fetchSelectedCustomer = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/read_customer",
        {
          params: {
            selectedCustomer,
          },
        }
      );
      setCustDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSelectedBank = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/read_bank",
        {
          params: {
            selectedBank,
          },
        }
      );
      setBankDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchSelectedBank();

  fetchSelectedCustomer();

    //fetch latest Invoice number
    const fetchInvoiceNumber = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/read_invoice_number"
        );
        setInvoiceNo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchInvoiceNumber();
    }, []);

    let invoiceNumberString = "";

    // Step 2: Assign the value of invoice.invoice_no to the string variable
    invoice_number.forEach((invoice) => {
      invoiceNumberString += invoice.invoice_no;
    });
  
    // Step 3: Log the string variable
    console.log(invoiceNumberString);
  
    function incrementInvoiceNumber(currentInvoiceNumber) {
      // Extract the numeric part and increment it
      let numericPart = currentInvoiceNumber.slice(4);
      let incrementedNumericPart = (parseInt(numericPart, 10) + 1).toString().padStart(3, "0");
  
      // Construct the new Invoice number with the incremented numeric part
      let newInvoiceNumber = "INV-" + incrementedNumericPart;
  
      // Log the output to the console
      console.log("New INV Number:", newInvoiceNumber);
  
      return newInvoiceNumber;
    }

    let icurrentInvoiveNumber = incrementInvoiceNumber(invoiceNumberString);

//adds item to the list
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

    const rowsWithIds = generateRowsWithIds(itemList);

    const handleDeleteItem = (itemID) => {
      const itemIDString = itemID.toString();
      const deletedItem = itemList.find((item) => item.id === itemIDString);
  
      if (deletedItem) {
        setTotalPrice(totalPrice - deletedItem.subtotal);
        setItemList(itemList.filter((item) => item.id !== itemIDString));
      }
    };

    useEffect(() => {
      // Recalculate VAT and Overall Total whenever totalPrice changes
      setVatPrice(totalPrice * 0.16);
      setOverallTotalPrice(totalPrice + totalPrice * 0.16);
    }, [totalPrice]);


    const clearForm = () => {
      setItemDescription("");
      setQuantity(0);
      setUnitPrice(0);
      setSelectedCurrency("");
      setSelectedCustomer("");
      setItemList([]);
      setAdvancepayment("");
      setInvoice_date("");
      setMessage("");
      setOverallTotalPrice(0);
      setTotalPrice(0);
      setVatPrice(0);
      setSelectedBank("");
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
              New Invoice
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
            Invoice Number: &nbsp;
            <ul>
              {invoice_number.map((invoice, index) => (
                <li key={index}>
                  <h3 id="myLpoNo">{invoice.invoice_no}</h3>
                </li>
              ))}
            </ul>
          </h3>

          <div className="top_section" style={{ marginBottom: "20px" }}>
            <div className="drop-down">
              <h2>Billing to: </h2>
              <select
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: "4px",
                }}
                value={selectedCustomer}
                onChange={handleCustomerChange}
              >
                <option value="">-- Select a customer --</option>
                {customers.map((option) => (
                  <option
                    key={option.customer_name}
                    value={option.customer_name}
                  >
                    {option.customer_name}
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
                  {custDetails.map((info, index) => (
                    <li key={index}>
                      <h4>Address: {info.customer_address}</h4>
                      <h4>Phone: {info.customer_phone}</h4>
                      <h4>Email: {info.customer_email}</h4>
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
                    id="invoice_date"
                    {...register("invoice_date", { required: true })}
                    value={invoice_date}
                    onChange={(e) => setInvoice_date(e.target.value)}
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
                    id="advancePayment"
                    placeholder="20"
                    {...register("advancePayment", { required: true })}
                    value={advancePayment}
                    onChange={(e) => setAdvancepayment(e.target.value)}
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
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              Total Price: {overallTotalPrice}
            </h3>
          </div>
        </div>
        <div className="drop-down">
              <h2>Select bank: </h2>
              <select
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: "4px",
                }}
                value={selectedBank}
                onChange={handleBankChange}
              >
                <option value="">-- Select a bank --</option>
                {banks.map((option) => (
                  <option
                    key={option.bank_name}
                    value={option.bank_name}
                  >
                    {option.bank_name}
                  </option>
                ))}
              </select>
            </div>

        <div>

        <ul>
                  {bankDetails.map((info, index) => (
                    <li key={index}>
                      <h4>Account: {info.usd_account}</h4>
                      <h4>Branch: {info.branch}</h4>
                      <h4>SwiftCode: {info.swift_code}</h4>
                    </li>
                  ))}
                </ul>
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
            // onClick={addDate}
          >
            Save
          </button>

        </div>

      </div>
    </Box>

    );
}
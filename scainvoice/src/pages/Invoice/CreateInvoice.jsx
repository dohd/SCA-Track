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
  const [subtotalPrice, setSubTotalPrice] = useState(0);
  const [vatPrice, setVatPrice] = useState(0);
  const [overallTotalPrice, setOverallTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [bankDetails, setBankDetails] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

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
  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value);
  };

   //  hook to log the selected customer and currency outside the component
   useEffect(() => {}, [selectedCustomer]);
   useEffect(() => {}, [selectedCurrency]);
   useEffect(() => {}, [selectedBank]);
   useEffect(() => {}, [selectedAccount]);

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
      // console.log("New INV Number:", newInvoiceNumber);
  
      return newInvoiceNumber;
    }

    let currentInvoiveNumber = incrementInvoiceNumber(invoiceNumberString);
    console.log("New INV Number:", currentInvoiveNumber); 

  // start sending data to backend
    //add invoice item

    console.log(selectedAccount);

    const addItem = (data) => {
      const handleSubmit = async (event) => {
        try {
          await axios.post("http://localhost:3000/add_invoice_item", {
            invoiceNumberString,
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
        const subtotalArr = itemList.map((item) => item.total_price);
        const totalAmount = subtotalArr.reduce((acc, curr) => acc + curr, 0);
        setSubTotalPrice(totalAmount);
      };
  
      calculateTotal();
    }, [itemList]);

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


    const fetchInvoiceItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/read_invoiceItems", {
          params: {
            invoiceNumberString,
          },
        });
        setItemList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInvoiceItems();

    useEffect(() => {
      fetchInvoiceItems();
    }, []);

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

    const rowsWithIds = generateRowsWithIds(itemList);

  //delete item
  const handleDelete = async (itemID, itemName) => {

    try {
      const response = await axios.delete(
        `http://localhost:3000/delete/invoiceItem`,
        {
          params: {
            invoiceNumberString,
            itemName,
          },
        }
      );
      console.log(response.data); 
      setItemDescription("");
      setQuantity(0);
      setUnitPrice(0);
      alert("Deleted Successfuly!");
      fetchInvoiceItems(); //update the list
    } catch (error) {
      console.error(error);
    }
  };


 

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

      //add invoice
  const addInvoice = (data) => {
    const handleSubmit = async (event) => {
      try {
        await axios.post("http://localhost:3000/add_invoice", {
          invoiceNumberString,
          invoice_date,
          advancePayment,
          subtotalPrice,
          overallTotalPrice,
          vatPrice,
          selectedCustomer,
          selectedBank,
        });
        alert(overallTotalPrice);
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
        await axios.post("http://localhost:3000/add_invoice_message", {
          invoiceNumberString,
          message,
        });
        // alert("Message added successfully!");
        // handleClearForm();
      } catch (error) {
        console.error(error);
      }
    };
    handleSubmit();
    setNewInvoiceNo();
  };

  const setNewInvoiceNo = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/update/invoice_number",
        {
          currentInvoiveNumber,
        }
      );

      console.log(response.data); // Assuming the response contains the updated movie details
      clearForm();
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
                  <label htmlFor="advance_payment">Advance payment (%) :</label>
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
            onClick={addInvoice}
          >
            Save
          </button>

        </div>

      </div>
    </Box>

    );
}
import React, { useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js"; // Import the html2pdf library

const InvoiceRecords = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();
  const [selectedInvoice, setSelectedInvoice] = useState(null); // State to keep track of selected invoice
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog open/close
  const contentRef = useRef(null); // Ref for the dialog content
  const [itemList, setItemList] = useState([]);
  const [invoiceNumberString, setInvoiceNumberString] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [custDetails, setCustDetails] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [bankDetails, setBankDetails] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:3000/read_invoices");
      setInvoices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchInvoices();

  const handleViewClick = (invoice) => {
    setSelectedInvoice(invoice); // Set the selected invoice
    setOpenDialog(true); // Open the dialog
    setInvoiceNumberString(invoice.invoice_number);
    setSelectedCustomer(invoice.customer);
    setSelectedBank(invoice.bank);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  const handleGeneratePDF = async () => {
    const content = contentRef.current;

    // Wrap the content in a div to ensure proper conversion
    const pdfContainer = document.createElement("div");
    pdfContainer.appendChild(content.cloneNode(true));

    // Apply CSS styles to format the content for printing
    pdfContainer.style.display = "block";
    pdfContainer.style.width = "100%";
    pdfContainer.style.maxWidth = "800px";
    pdfContainer.style.margin = "0 auto";

    // Wait for images and other resources to load before generating the PDF
    await new Promise((resolve) => {
      const images = pdfContainer.getElementsByTagName("img");
      const imagePromises = [];

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (!image.complete) {
          imagePromises.push(
            new Promise((imgResolve) => {
              image.onload = imgResolve;
            })
          );
        }
      }

      if (imagePromises.length === 0) {
        resolve();
      } else {
        Promise.all(imagePromises).then(() => {
          resolve();
        });
      }
    });

    const opt = {
      margin: 10,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 1.0 }, // Increase quality for images
      html2canvas: { scale: 2, useCORS: true }, // Use CORS to handle cross-origin images
      jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(pdfContainer).set(opt).save();
  };

  const fetchInvoiceItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/read_invoiceItems",
        {
          params: {
            invoiceNumberString,
          },
        }
      );
      setItemList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchInvoiceItems();

  const fetchSelectedBank = async () => {
    try {
      const response = await axios.get("http://localhost:3000/read_bank", {
        params: {
          selectedBank,
        },
      });
      setBankDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSelectedCustomer = async () => {
    try {
      const response = await axios.get("http://localhost:3000/read_customer", {
        params: {
          selectedCustomer,
        },
      });
      setCustDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/read_invoiceMessages",
        {
          params: {
            invoiceNumberString,
          },
        }
      );
      setMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const approve = "Approved";

  const handleApprove = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/approveInvoice",
        {
          approve,
          invoiceNumberString,
        }
      );

      console.log(response.data); // Assuming the response contains the updated movie details
     
    } catch (error) {
      console.error(error);
    }
  };

  const reject = "Rejected";

  const handleReject = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/rejectInvoice",
        {
            reject,
            invoiceNumberString,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };


  fetchSelectedCustomer();
  fetchSelectedBank();
  fetchMessage();

  const columns = [
    { field: "id", headerName: " No", width: 80 },
    { field: "invoice_number", headerName: "Invoice  No", width: 110 },
    { field: "customer", headerName: "Customer name", width: 250 },
    { field: "total", headerName: "Amount", type: "number", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "invoice_date", headerName: "Date Issued", width: 100 },
    { field: "advance_payment", headerName: "Advance Payment (%)", width: 160 },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* Pass the invoice object to handleViewClick */}
            <button
              className="InvoiceListEdit"
              onClick={() => handleViewClick(params.row)}
            >
              View
            </button>
            {/* <DeleteIcon className="InvoiceListDelete" /> */}
          </>
        );
      },
    },
  ];

  const columns_2 = [
    { field: "id", headerName: "NO", width: 80 },
    { field: "item_name", headerName: "Description", width: 240 },
    { field: "quantity", headerName: "Qty", width: 80 },
    { field: "unit_price", headerName: "Unit price", width: 100 },
    { field: "total_price", headerName: "Total Price", width: 100 },
    { field: "currency", headerName: "Currency", width: 80 },
  ];

  const generateRowsWithIds = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      id: `${(index + 1).toString().padStart(3, "0")}`,
    }));
  };

  const generateRowsWithIds2 = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      id: `${(index + 1).toString().padStart(3, "0")}`,
    }));
  };

  const rowsWithIds = generateRowsWithIds(invoices);
  const rowsWithIds2 = generateRowsWithIds2(itemList);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
        height: 500,
        width: "80%",
        marginLeft: "250px",
        marginRight: "auto",
        backgroundColor: "#EDEADE",
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
            Invoice Records
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

      <DataGrid rows={rowsWithIds} columns={columns} pageSize={5} />

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg">
        <DialogTitle>Invoice Details</DialogTitle>
        {selectedInvoice && (
          <DialogContent ref={contentRef}>
            <div>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                Invoice Number: {selectedInvoice.invoice_number}
              </p>
              <p>Date: {selectedInvoice.invoice_date}</p>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "500",
                  marginBottom: "10px",
                }}
              >
                Customer Name: {selectedInvoice.customer}
              </h3>

              <ul
                style={{
                  marginBottom: "10px",
                  listStyle: "none",
                }}
              >
                {custDetails.map((info, index) => (
                  <li key={index}>
                    <p>Customer Address: {info.customer_address}</p>
                    <p>Customer Phone: {info.customer_phone}</p>
                    <p>Customer Email: {info.customer_email}</p>
                  </li>
                ))}
              </ul>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "500",
                  marginBottom: "10px",
                }}
              >
                Items List
              </h3>

              <DataGrid rows={rowsWithIds2} columns={columns_2} pageSize={5} />

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
                      fontSize: "22px",
                      fontWeight: "500",
                      marginBottom: "10px",
                    }}
                  >
                    Message
                  </h3>
                  <ul
                  style={{
                    listStyle: "none"
                  }}
                  >
                    {message.map((msg, index) => (
                      <li key={index}>
                        <p>{msg.message}</p>
                      </li>
                    ))}
                  </ul>
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
                    Sub-Total: {selectedInvoice.sub_total}
                  </h3>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginBottom: "10px",
                    }}
                  >
                    VAT price: {selectedInvoice.vat}
                  </h3>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: "10px",
                    }}
                  >
                    Total Price: {selectedInvoice.total}
                  </h3>
                </div>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  Bank Details
                </h3>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    marginBottom: "6px",
                  }}
                >
                   Company Name: Spartec Consotrium Africa-Limited (SCA)
                </h3>

                <p>Bank Name: {selectedBank}</p>
                <ul 
                style={{
                  listStyle: "none"
                }}>
                  {bankDetails.map((info, index) => (
                    <li key={index}>
                      <p>KES Account: {info.kes_account}</p>
                      <p>USD Account: {info.usd_account}</p>
                      <p>Pounds Account: {info.pounds_account}</p>
                      <p>Branch: {info.branch}</p>
                      <p>SwiftCode: {info.swift_code}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button
            onClick={handleApprove}
            color="primary"
            variant="contained"
          >
            Approve
          </Button>

          <Button
            onClick={handleReject}
            color="primary"
            variant="contained"
          >
            Reject
          </Button>
          <Button
            onClick={handleGeneratePDF}
            color="primary"
            variant="contained"
          >
            Generate PDF
          </Button>
        </DialogActions>
      </Dialog>
      
    </Box>
  );
};
export default InvoiceRecords;

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

  fetchSelectedCustomer();
  fetchSelectedBank();
  fetchMessage();

  const columns = [
    { field: "id", headerName: " No", width: 80 },
    { field: "invoice_number", headerName: "Invoice  No", width: 110 },
    { field: "customer", headerName: "Customer name", width: 250 },
    { field: "total", headerName: "Amount", type: "number", width: 100 },
    { field: "Status", headerName: "Status", width: 100 },
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
                }}
              >
                {custDetails.map((info, index) => (
                  <li key={index}>
                    <h4>Customer Address: {info.customer_address}</h4>
                    <h4>Customer Phone: {info.customer_phone}</h4>
                    <h4>Customer Email: {info.customer_email}</h4>
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
                  <ul>
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
                    fontSize: "16px",
                    fontWeight: "600",
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
                  Spartec Consotrium Africa-Limited (SCA)
                </h3>

                <h3>Bank: {selectedBank}</h3>
                <ul>
                  {bankDetails.map((info, index) => (
                    <li key={index}>
                      <h4>KES Account: {info.kes_account}</h4>
                      <h4>USD Account: {info.usd_account}</h4>
                      <h4>Pounds Account: {info.pounds_account}</h4>
                      <h4>Branch: {info.branch}</h4>
                      <h4>SwiftCode: {info.swift_code}</h4>
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

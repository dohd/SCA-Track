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
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  const handleGeneratePDF = () => {
    const content = contentRef.current;

    // Wrap the content in a div to ensure proper conversion
    const pdfContainer = document.createElement("div");
    pdfContainer.appendChild(content.cloneNode(true));

    const opt = {
      margin: 10,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(pdfContainer).set(opt).save();
  };

  

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
        const invoiceNO = params.row.invoice_number;
        return (
          <>
          {/* Pass the invoice object to handleViewClick */}
          <button
            className="InvoiceListEdit"
            onClick={() => handleViewClick(params.row)}
          >
            View
          </button>
          <DeleteIcon className="InvoiceListDelete" />
        </>
        );
      },
    },
  ];

const columns_2 = [
      { field: "id", headerName: "NO", width: 80 },
      { field: "item_name", headerName: "Description", width: 300 },
      { field: "quantity", headerName: "Qty", width: 80 },
      { field: "unit_price", headerName: "Unit price", width: 100 },
      { field: "total_price", headerName: "Total Price", width: 100 },
    
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
              <p>Invoice Number: {selectedInvoice.invoice_number}</p>
              
              <p>Customer Name: {selectedInvoice.customer}</p>
              <div style={{ height: 600, width: "100%" }}>

              <DataGrid rows={rowsWithIds2} columns={columns_2} pageSize={5} />

              </div>
            </div>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button onClick={handleGeneratePDF} color="primary" variant="contained">
            Generate PDF
          </Button>
        </DialogActions>
      </Dialog>
  
  </Box>
  );
};
export default InvoiceRecords;

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
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js"; // Import the html2pdf library

const LpoRecords = () => {
  const [lpo, setLpos] = useState([]);
  const navigate = useNavigate();
  const [selectedLpo, setSelectedLpo] = useState(null); // State to keep track of selected invoice
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog open/close
  const contentRef = useRef(null); // Ref for the dialog content
  const [itemList, setItemList] = useState([]);
  const [lpoNumberString, setLpoNumberString] = useState("");
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [distDetails, setDistDetails] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetchLpos();
  }, []);

  const fetchLpos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/read_lpos");
      setLpos(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchLpos();

  const handleViewClick = (lpo) => {
    setSelectedLpo(lpo); // Set the selected invoice
    setOpenDialog(true); // Open the dialog
    setLpoNumberString(lpo.lpo_number);
    setSelectedDistributor(lpo.distributor);
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
      filename: "lpo.pdf",
      image: { type: "jpeg", quality: 1.0 }, // Increase quality for images
      html2canvas: { scale: 2, useCORS: true }, // Use CORS to handle cross-origin images
      jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(pdfContainer).set(opt).save();
  };

  const fetchLpoItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/read_lpoItems", {
        params: {
          lpoNumberString,
        },
      });
      setItemList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchLpoItems();

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

  const fetchMessage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/read_lpoMessage",
        {
          params: {
            lpoNumberString,
          },
        }
      );
      setMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchSelectedDistributor();
  fetchMessage();

  const columns = [
    { field: "id", headerName: " No", width: 80 },
    { field: "lpo_number", headerName: "LPO Number", width: 100 },
    { field: "distributor", headerName: "Distributor", width: 250 },
    { field: "total", headerName: "Amount", type: "number", width: 100 },
    { field: "Status", headerName: "Status", width: 100 },
    { field: "Lpo_date", headerName: "DateIssued", width: 100 },
    { field: "days", headerName: "Due in (Days)", width: 150 },
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

  const rowsWithIds = generateRowsWithIds(lpo);
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
            LPO Records
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
        <DialogTitle>LPO Details</DialogTitle>
        {selectedLpo && (
          <DialogContent ref={contentRef}>
            <div>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                LPO Number: {selectedLpo.lpo_number} <br />
              </p>

              <p>Date: {selectedLpo.Lpo_date}</p>

              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "500",
                  marginBottom: "10px",
                }}
              >
                Distributor's name: {selectedLpo.distributor}
              </h3>

              <ul
                style={{
                  marginBottom: "10px",
                }}
              >
                {distDetails.map((info, index) => (
                  <li key={index}>
                    <h4>Distributor Address: {info.distributor_address}</h4>
                    <h4>Distributor Phone: {info.distributor_phone}</h4>
                    <h4>Distributor Email: {info.distributor_email}</h4>
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
                        <p>{msg.lpo_message}</p>
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
                    Sub-Total: {selectedLpo.sub_total}
                  </h3>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginBottom: "10px",
                    }}
                  >
                    VAT price: {selectedLpo.vat}
                  </h3>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: "10px",
                    }}
                  >
                    Total Price: {selectedLpo.total}
                  </h3>
                </div>
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
export default LpoRecords;

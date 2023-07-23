import React from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";

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

  const [distributors, setMyDistributors] = useState([]); //distributors
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [itemList, setItemList] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [vatPrice, setVatPrice] = useState(0);
  const [overallTotalPrice, setOverallTotalPrice] = useState(0);

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

  useEffect(() => {
    // Recalculate VAT and Overall Total whenever totalPrice changes
    setVatPrice(totalPrice * 0.16);
    setOverallTotalPrice(totalPrice + totalPrice * 0.16);
  }, [totalPrice]);

  // useEffect hook to log the selected distributor outside the component
  // useEffect(() => {}, [selectedDistributor]);

  // console.log("hello: ", selectedDistributor);

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

  

  const handleDeleteItem = (itemID) => {
    const itemIDString = itemID.toString();
    const deletedItem = itemList.find((item) => item.id === itemIDString);
  
    if (deletedItem) {
      setTotalPrice(totalPrice - deletedItem.subtotal);
      setItemList(itemList.filter((item) => item.id !== itemIDString));
    }
  };

  const rowsWithIds = generateRowsWithIds(itemList);

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
        <div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            Create New LPO
          </h1>
          <h3
            style={{
              fontSize: "26px",
              fontWeight: "500",
              marginBottom: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            LPO number:
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

              {selectedDistributor && (
                <h4>Selected Distributor: {selectedDistributor}</h4>
              )}
              <h4>Address:</h4>
              <h4>Phone:</h4>
              <h4>Email: </h4>
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
          {errors.custID && <span>This field is required</span>}

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
          <h3>Sub-Total Price: {totalPrice}</h3>
          <h3>Vat Price: {vatPrice}</h3>
          <h3>Total Price: {overallTotalPrice}</h3>
        </div>
      </div>
    </Box>
  );
}

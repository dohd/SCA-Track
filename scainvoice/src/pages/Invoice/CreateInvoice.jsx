import React from 'react'
import React, { useState } from 'react';
import { Card, Form, Button,Modal } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import { Typography,Box } from '@mui/material';

const CreateInvoice = () => {
 const [selectedCustomer, setSelectedCustomer] = useState('');
  const [newItem, setNewItem] = useState({
    id: '',
    description: '',
    quantity: '',
    unitPrice: '',
    total: '',
  });
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handleNewItemChange = (event) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  const handleAddItem = () => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setNewItem({
      id: '',
      description: '',
      quantity: '',
      unitPrice: '',
      total: '',
    });
    setOpen(false); // Close the modal after adding the item
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClearForm = () => {
    setItems([]);
    setNewItem({
      id: '',
      description: '',
      quantity: '',
      unitPrice: '',
      total: '',
    });
  };

  const handleSaveItem = () => {
    setItems([...items, newItem]);

    setNewItem({
      id: '',
      description: '',
      quantity: '',
      unitPrice: '',
      total: '',
    });
  };

  const handleSaveForm = () => {
    // Implement the logic to save the form data
    console.log('Form data saved:', items);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'unitPrice', headerName: 'Unit Price', width: 130 },
    { field: 'total', headerName: 'Total(excl VAT)', width: 130 },
  ];

  const rows = [
    { id: 1, description: 'Dell laptop', quantity: 2, unitPrice: 20000, total: 100000 },
    { id: 2, description: 'Cisco Switch', quantity: 1, unitPrice: 30000, total: 30000 },
    { id: 3, description: 'Item 3', quantity: 1, unitPrice: 8, total: 8 },
  ];

  return (
    <Card style={{ width: '80%', marginLeft: '150px' }}>
      <Card.Body>
        <Card.Title style={{fontFamily:'sans-serif',fontWeight:'bold'}}>Invoice</Card.Title>
        <Card.Subtitle  style={{fontFamily:'sans-serif',fontWeight:'bold'}} className="mb-2 text-muted">Invoice Number: SCA-0056</Card.Subtitle>
        <hr />
        <Form>
          <Form.Group controlId="billingTo"  style={{fontFamily:'sans-serif',fontWeight:'bold'}}>
            <Form.Label>Billing To:</Form.Label>
            <Form.Select
              value={selectedCustomer}
              onChange={handleCustomerChange}
              aria-label="Billing To"
            >
              <option value="">Select a customer</option>
              <option value="1">Sidan</option>
              <option value="2">Reddington</option>
              <option value="3">Reggs</option>
            </Form.Select>
          </Form.Group>

          <hr />

          <Form.Group controlId="customerID" >
            <Form.Label>Customer ID:</Form.Label>
            <Form.Control type="text" readOnly value="SCA-009" />
          </Form.Group>

          <Form.Group controlId="customerPONumber">
            <Form.Label>Customer PO Number:</Form.Label>
            <Form.Control type="number" readOnly value="555" />
          </Form.Group>

          <Form.Group controlId="dueDays">
            <Form.Label>Due (in days):</Form.Label>
            <Form.Control type="number" readOnly value="20" />
          </Form.Group>

          <Form.Group controlId="customerStreet">
            <Form.Label>Customer Street:</Form.Label>
            <Form.Control type="text" readOnly value="Moi Avenue" />
          </Form.Group>

          <Form.Group controlId="customerAddress">
            <Form.Label>Customer Address:</Form.Label>
            <Form.Control type="text" readOnly value="P.O.Box 123456, Nairobi" />
          </Form.Group>

          <Form.Group controlId="advancePayment">
            <Form.Label>Advance Payment:</Form.Label>
            <Form.Control type="text" readOnly value="40%" />
          </Form.Group>

          <hr />

          <Form.Group controlId="currency">
            <Form.Label>Currency:</Form.Label>
            <Form.Control as="select">
              <option value="ksh">KES</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
            </Form.Control>
          </Form.Group>

          {/* Line items section */}
          <hr />
          <Button variant="secondary" onClick={handleAddItem} style={{ backgroundColor: '#3cb371' }}>
            Add Item
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={{  width: 600 }}>
              <Typography variant="h6" id="modal-title" component="h2">
                Add Item
              </Typography>
              <Form>
                {/* Add form fields for adding a new item */}
                {/* ... */}
              </Form>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleAddItem}>
                  Add Item
                </Button>
              </div>
            </Box>
          </Modal>
          
            
          
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
          </div>

        <hr/>
        <Typography variant="h3">Customer Message</Typography>

<Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  
    flexDirection: 'row',
    marginTop: '20px',
    marginBottom: '20px',
  }}
>
  <Box
    sx={{
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 100,
      width: '50%',
      display: 'flex',
    }}
  >
    <input
      style={{
        width: '100%',
        height: '100%',
      }}
      type="text"
      id="custPONumber"
      placeholder="Message here"
      // value={custPONumber}
      // onChange={(e) => setCustPONumber(e.target.value)}
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
  <div className="totals" style={{ width: "100%", height: "100%", alignItems: "center" }}>
    <h3>Sub-total: 130000</h3>
    <h3>VAT(16%): 10000</h3>
    <h2>Total: 130000</h2>
  </div>
</Box>

</Box>
<Typography variant="h3">Company Payment Details</Typography>

<Form.Group controlId="companyName">
  <Form.Label>Company Name:</Form.Label>
  <Form.Control type="text" placeholder="Enter company name" />
</Form.Group>

<Form.Group controlId="bankName">
  <Form.Label>Bank Name:</Form.Label>
  <Form.Control type="text" placeholder="Enter bank name" />
</Form.Group>

<Form.Group controlId="accountNo">
  <Form.Label>Account Number:</Form.Label>
  <Form.Control type="text" placeholder="Enter account name" />
</Form.Group>
<Form.Group controlId="branch">
  <Form.Label>Bank Branch:</Form.Label>
  <Form.Control type="text" placeholder="Enter branch name" />
</Form.Group>
<Form.Group controlId="swift">
  <Form.Label>Swift/sort/routing/Chips code/Fed wire:</Form.Label>
  <Form.Control type="text" placeholder="-" />
</Form.Group>
<hr/>
<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button variant="outline-secondary" onClick={handleClearForm} style={{ backgroundColor: '#3cb371' }}>
              Clear Form
            </Button>
            <Button variant="outline-primary" onClick={handleSaveForm} style={{ marginLeft: '10px', backgroundColor: '#3cb371' }}>
              Save Form
            </Button>
            <Button variant="primary"  style={{ marginLeft: '10px' , backgroundColor: '#3cb371' }}>
              Save as PDF
            </Button>
          </div>
        </Form>
        
        


      </Card.Body>
    </Card>
  );
};

export default CreateInvoice;

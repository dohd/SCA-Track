import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
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

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };
  const handleNewItemChange = (event) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };
  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({
      id: '',
      description: '',
      quantity: '',
      unitPrice: '',
      total: '',
    });
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
    <Card style={{ width: '80%', marginLeft: '200px' }}>
      <Card.Body>
        <Card.Title>Invoice</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Invoice Number: SCA-0056</Card.Subtitle>
        <hr />
        <Form>
          <Form.Group controlId="billingTo">
            <Form.Label>Billing To:</Form.Label>
            <Form.Select
              value={selectedCustomer}
              onChange={handleCustomerChange}
              aria-label="Billing To"
            >
              <option value="">Select a customer</option>
              <option value="1">Sidan</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>

          <hr />

          <Form.Group controlId="customerID">
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
          <Typography>Items</Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end',backgroundColor: "red",}}>
            <Button variant="secondary" onClick={handleAddItem}>
              Add Item
            </Button>
          </div>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
          </div>
        <hr/>
        <Typography variant="h3">Message</Typography>

<Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    display: 'flex',
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
      placeholder="Message"
      // value={custPONumber}
      // onChange={(e) => setCustPONumber(e.target.value)}
    />
  </Box>
</Box>
        </Form>
        
        


      </Card.Body>
    </Card>
  );
};

export default CreateInvoice;

import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';
import ItemForm from '../../components/ItemForm';
import CustomerMessage from '../../components/CustomerMessage';
import CompanyPaymentDetails from '../../components/CompanyPaymentDetails';

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

  const handleAddItem = () => {
    const item = { ...newItem };
    setItems((prevItems) => [...prevItems, item]);
    setNewItem({
      id: '',
      description: '',
      quantity: '',
      unitPrice: '',
      total: '',
    });
  };

  const handleClearForm = () => {
    console.log('clear');
  };

  const handleSaveForm = () => {
    console.log('Form data saved:');
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
        <Card.Title style={{ fontFamily: 'sans-serif', fontWeight: 'bold', marginRight: 'auto', marginLeft: '200px' }}>
          Invoice
        </Card.Title>
        <Card.Subtitle
          style={{ fontFamily: 'sans-serif', fontWeight: 'bold', marginRight: 'auto', marginLeft: '200px' }}
          className="mb-2 text-muted"
        >
          Invoice Number: SCA-0056
        </Card.Subtitle>
        <hr />
        <Form style={{ height: 400, width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
          <Form.Group controlId="billingTo" style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>
            <Form.Label>Billing To:</Form.Label>
            <Form.Select value={selectedCustomer} onChange={handleCustomerChange} aria-label="Billing To">
              <option value="">Select a customer</option>
              <option value="1">Sidan</option>
              <option value="2">Reddington</option>
              <option value="3">Reggs</option>
            </Form.Select>
          </Form.Group>
          <hr />
          <Form.Group controlId="customerID">
            <Form.Label>Customer ID:</Form.Label>
            <Form.Control type="text" readOnly value="SCA-009" />
          </Form.Group>
          {/* Rest of the form fields */}
          <hr />
          <ItemForm />
          {/* DataGrid and other components */}
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
          </div>
          <hr />
          <CustomerMessage />
          <CompanyPaymentDetails />
          <hr />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button variant="outline-secondary" onClick={handleClearForm} style={{ backgroundColor: '#3cb371' }}>
              Clear Form
            </Button>
            <Button variant="outline-primary" onClick={handleSaveForm} style={{ marginLeft: '10px', backgroundColor: '#3cb371' }}>
              Save Form
            </Button>
            <Button variant="primary" style={{ marginLeft: '10px', backgroundColor: '#3cb371' }}>
              Save as PDF
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateInvoice;

import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Form, Button, Toast } from 'react-bootstrap';

const ItemForm = () => {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitprice, setUnitPrice] = useState('');
    const [total, setTotal] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [items, setItems] = useState([]);
  
    const handleAddItem = () => {
      const newItem = {
        description: description,
        quantity: quantity,
        unitprice: unitprice,
        total:total,
      };
      setItems((prevItems) => [...prevItems, newItem]);
  
      setDescription('');
      setQuantity('');
      setUnitPrice('');
      setTotal('');
  
      setShowToast(true);
    };
  
    const columns = [
      {
        name: 'Description',
        selector: 'description',
        sortable: true,
      },
      {
        name: 'Quantity',
        selector: 'quantity',
        sortable: true,
      },
      {
        name: 'UnitPrice',
        selector: 'unitprice',
        sortable: true,
      },
      {
        name: 'Total',
        selector: 'total',
        sortable: true,
      },
    ];
  
    const rows = items.map((item, index) => ({
        id: index + 1,
        ...item,
      }));
      
    return (
      <div>
        <Form>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter item description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter item quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="u-price">
            <Form.Label>UnitPrice</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter item price"
              value={unitprice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="total">
            <Form.Label>Total(excl Vat):</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter item total"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddItem} style={{backgroundColor:'green'}}>
            Add Item
          </Button>
        </Form>
  
        <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Header>
            <strong className="me-auto">Item Added</strong>
          </Toast.Header>
          <Toast.Body>New item has been added successfully!</Toast.Body>
        </Toast>
  
       {/*<DataTable columns={columns} data={items} /> */} 
      </div>
    );
  };
  
  export default ItemForm;
  
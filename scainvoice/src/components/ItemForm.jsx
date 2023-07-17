import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ItemForm = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState({
    id: '',
    description: '',
    quantity: '',
    unitPrice: '',
    total: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(newItem);
    setNewItem({
      id: '',
      description: '',
      quantity: '',
      unitPrice: '',
      total: '',
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="itemId">
          <Form.Label>Item ID:</Form.Label>
          <Form.Control
            type="text"
            name="id"
            placeholder="Enter item ID"
            value={newItem.id}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="itemdescription">
          <Form.Label>Item Description:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter item description"
            value={newItem.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="itemquantity">
          <Form.Label>Item Quantity:</Form.Label>
          <Form.Control
            type="text"
            name="quantity"
            placeholder="Enter item quantity"
            value={newItem.quantity}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="itemprice">
          <Form.Label>Item Unit Price:</Form.Label>
          <Form.Control
            type="text"
            name="unitPrice"
            placeholder="Enter item unit price"
            value={newItem.unitPrice}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="itemtotal">
          <Form.Label>Item Total:</Form.Label>
          <Form.Control
            type="text"
            name="total"
            placeholder="Enter item total"
            value={newItem.total}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="secondary" type="submit" style={{ backgroundColor: '#3cb371' }}>
          Add Item
        </Button>
      </Form>
    </>
  );
};

export default ItemForm;

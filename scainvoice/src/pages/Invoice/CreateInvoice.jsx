import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ItemsDetailsTable from './ItemsDetailstable';

export default function CreateInvoice() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Invoice</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Invoice Number: SCA-0056</Card.Subtitle>
        <Form>
          <Form.Select aria-label="Default select example">
            <option>Billing to:</option>
            <option value="1">Sidan</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <Form.Label>Customer ID: SCA-009</Form.Label>
          <Form.Label>Customer PO Number: 555</Form.Label>
          <Form.Label>Due Days</Form.Label>
          <Form.Label>Customer Street: Moi Avenue</Form.Label>
          <Form.Label>Customer Address: PO Box Nairobi</Form.Label>
          <Form.Label>Advance Payment: 50%</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Currency:</option>
            <option value="1">Ksh</option>
            <option value="2">Dollar</option>
            <option value="3">Pound</option>
          </Form.Select>
        </Form>
      </Card.Body>
      <Card.Footer>
        <ItemsDetailsTable />
      </Card.Footer>
    </Card>
  );
}

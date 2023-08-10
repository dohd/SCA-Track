import React from 'react';
import { Form } from 'react-bootstrap';
import { Typography } from '@mui/material';

const CompanyPaymentDetails = () => {
  return (
    <>
     <Typography variant="h3">Customer Message</Typography>

      <Form.Group controlId="companyName">
        <Form.Label>Company Name: Spartec Consortium Africa-Limited</Form.Label>
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
    </>
  );
};

export default CompanyPaymentDetails;

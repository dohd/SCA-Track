import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import CreateNewCustomer from './CreateNewCustomer';
import CustomerRecords from './CustomerRecords';

const CustomerComponent = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCustomerRecords, setShowCustomerRecords] = useState(false);

  const handleCreateFormClick = () => {
    setShowCreateForm(!showCreateForm);
    setShowCustomerRecords(false);
  };

  const handleCustomerRecordsClick = () => {
    setShowCustomerRecords(!showCustomerRecords);
    setShowCreateForm(false);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Create Customer
          </Typography>
          <Button onClick={handleCreateFormClick}>
            {showCreateForm ? 'Hide Form' : 'Show Form'}
          </Button>
          {showCreateForm && <CreateNewCustomer />}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Customer Records
          </Typography>
          <Button onClick={handleCustomerRecordsClick}>
            {showCustomerRecords ? 'Hide Records' : 'Show Records'}
          </Button>
          {showCustomerRecords && <CustomerRecords />}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerComponent;

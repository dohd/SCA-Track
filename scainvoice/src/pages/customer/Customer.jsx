import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import CreateNewCustomer from './CreateNewCustomer';
import CustomerRecords from './CustomerRecords';

const CustomerComponent = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Create New Customer
            </Typography>
            <CreateNewCustomer />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Customer Records
            </Typography>
            <CustomerRecords />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CustomerComponent;

import React from 'react';
import { Typography, Box } from '@mui/material';

const CustomerMessage = () => {
  return (
    <>
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
          />
        </Box>
        <Box
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 100,
            width: '40%',
            display: 'flex',
          }}
        >
          <div
            className="totals"
            style={{ width: '100%', height: '100%', alignItems: 'center' }}
          >
            <h3>Sub-total: 130000</h3>
            <h3>VAT(16%): 10000</h3>
            <h2>Total: 130000</h2>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default CustomerMessage;

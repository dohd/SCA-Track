import React, { useEffect, useState } from 'react';
import { Group, MapsHomeWork } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import DispatchedInvoice from "../invoice/DispatchedInvoice" 
import Customer from '../customer/Customer';

export default function Home({ link }) {
  
  const [selectedLink, setselectedLink] = useState('');

  useEffect(() => {
    setselectedLink(link);
  }, [link]);

  const handleClick = (link) => {
    setselectedLink(link);
    window.location.href = `http://localhost:3000/${link}`;

  };
  const handleClickCustomer = () => {
    handleClick('customer');
  };

  const handleClickBank = () => {
    handleClick('bank');
  };

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      {selectedLink === '' && (
        <>
          <Paper elevation={3} sx={{ p: 3 }}
           onClick={() => handleClick('dispatched')}
          >
            <Typography variant="h4">Dispatched Invoice</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MapsHomeWork
                sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }}
              />
              <Typography variant="h4">10</Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}
             onClick={() => handleClickCustomer()}>
            <Typography variant="h4">Customers</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <MapsHomeWork
                sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }}
              />
              <Typography variant="h4">10</Typography>
              
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}
           onClick={() => handleClickBank()}>
            <Typography variant="h4">Banks</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <MapsHomeWork
                sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }}
              />
              <Typography variant="h4">10</Typography>
              
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}
           onClick={() => handleClick('lpo')}>
            <Typography variant="h4">Lpo</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <MapsHomeWork
                sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }}
              />
              <Typography variant="h4">10</Typography>
              
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}
           onClick={() => handleClick('distributor')}>
            <Typography variant="h4">Distributors</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <MapsHomeWork
                sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }}
              />
              <Typography variant="h4">10</Typography>
              
            </Box>
          </Paper>
        </>
      )}
{/* If it is true, it will render the DispatchedInvoice component. Otherwise, it won't render anything. */}
      {selectedLink === 'customer' && <Customer />}
      {selectedLink === 'invoice' && <DispatchedInvoice />}
    </Box>
  );
}

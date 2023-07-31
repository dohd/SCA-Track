import React, { useEffect, useState } from 'react';
import { Group, MapsHomeWork } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import AdminInvoice from '../admininvoice/AdminInvoice';
import Customer1 from '../admincustomer/Customer1';
import axios from 'axios';


export default function Home({ link }) {
  
  const [selectedLink, setselectedLink] = useState('');
  const [rowCount, setRowCount] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [distributors, setDistributors] = useState(0);
  const [invoices, setInvoices] = useState(0);
  const [lpos, setLpos] = useState(0);

  const countCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/countCustomers"
      );
      setCustomers(response.data[0].count_customers);

    } catch (error) {
      console.error(error);
    }
  };

  const countDistributors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/countDistributors"
      );
      setDistributors(response.data[0].count_dist);

    } catch (error) {
      console.error(error);
    }
  };

  const countInvoices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/countInvoices"
      );
      setInvoices(response.data[0].count_invoices);

    } catch (error) {
      console.error(error);
    }
  };

  const countLPOs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/countLPOs"
      );
      setLpos(response.data[0].count_LPOs);

    } catch (error) {
      console.error(error);
    }
  };
  const countBanks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/countbanks"
      );
      setRowCount(response.data[0].count_banks);

    } catch (error) {
      console.error(error);
    }
  };

  countCustomers();
  countBanks();
  countDistributors();
  countInvoices();
  countLPOs();


  // useEffect(() => {
  //   setselectedLink(link);
  // }, [link]);

  const handleClick = (link) => {
    setselectedLink(link);
    window.location.href = `${link}`;

  };
  const handleClickCustomer = () => {
    handleClick('admincustomer');
  };

  const handleClickBank = () => {
    handleClick('adminbank');
  };
  const handleClickUser = () => {
    handleClick('user');
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
           onClick={() => handleClick('admininvoice')}
          >
            <Typography variant="h4"> Invoice</Typography>
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
              <Typography variant="h4">{invoices}</Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}
             onClick={() => handleClickUser()}>
            <Typography variant="h4">Users</Typography>
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
              <Typography variant="h4">{customers}</Typography>
              
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
              <Typography variant="h4">{customers}</Typography>
              
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
              <Typography variant="h4">
            
            {rowCount}
              </Typography>
              
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}
           onClick={() => handleClick('adminLpo')}>
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
              <Typography variant="h4">{lpos}</Typography>
              
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}
           onClick={() => handleClick('admindistributor')}>
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
              <Typography variant="h4">{distributors}</Typography>
              
            </Box>
          </Paper>
        </>
      )}
{/* If it is true, it will render the DispatchedInvoice component. Otherwise, it won't render anything. */}
      {selectedLink === 'admincustomer' && <Customer1 />}
      {selectedLink === 'admininvoice' && <AdminInvoice />}
    </Box>
  );
}

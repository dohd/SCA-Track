import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import DispatchedInvoice from '../invoice/DispatchedInvoice';
import Customer from '../customer/Customer';
import axios from "axios";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import StoreIcon from '@mui/icons-material/Store';

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
          <Paper elevation={3} 
          sx={{
            p: 3,
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            '&:hover': {
              backgroundColor: 'rgba(0,128,0,1)',
              transform: 'scale(1.05)',
              color: "white"
            },
          }}
           onClick={() => handleClick('Invoice')}
          >
            <Typography variant="h4"> Invoice</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <InboxIcon
                sx={{ height: 100, width: 100, opacity: 1, mr: 1 }}
              />
              <Typography variant="h4">{invoices}</Typography>
            </Box>
          </Paper>

          <Paper elevation={3} 
          sx={{
            p: 3,
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            '&:hover': {
              backgroundColor: 'rgba(0,128,0,1)',
              transform: 'scale(1.05)',
              color: "white"
            },
          }}
             onClick={() => handleClickCustomer()}>
            <Typography variant="h4">Customers</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <PeopleIcon
                sx={{ height: 100, width: 100, opacity: 1, mr: 1 }}
              />
              <Typography variant="h4">{customers}</Typography>
              
            </Box>
          </Paper>
          <Paper elevation={3} 
          sx={{
            p: 3,
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            '&:hover': {
              backgroundColor: 'rgba(0,128,0,1)',
              transform: 'scale(1.05)',
              color: "white"
            },
          }}
           onClick={() => handleClickBank()}>
            <Typography variant="h4">Banks</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <AccountBalanceIcon
                sx={{ height: 100, width: 100, opacity: 1, mr: 1 }}
              />
              <Typography variant="h4">
            
            {rowCount}
              </Typography>
              
            </Box>
          </Paper>
          <Paper elevation={3} 
          sx={{
            p: 3,
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            '&:hover': {
              backgroundColor: 'rgba(0,128,0,1)',
              transform: 'scale(1.05)',
              color: "white"
            },
          }}
           onClick={() => handleClick('lpo')}>
            <Typography variant="h4">Lpo</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <LibraryBooksIcon
                sx={{ height: 100, width: 100, opacity: 1, mr: 1 }}
              />
              <Typography variant="h4">{lpos}</Typography>
              
            </Box>
          </Paper>
          <Paper elevation={3} 
          sx={{
            p: 3,
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            '&:hover': {
              backgroundColor: 'rgba(0,128,0,1)',
              transform: 'scale(1.05)',
              color: "white"
            },
          }}
           onClick={() => handleClick('distributor')}>
            <Typography variant="h4">Distributors</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <StoreIcon
                sx={{ height: 100, width: 100, opacity: 1, mr: 1 }}
              />
              <Typography variant="h4">{distributors}</Typography>
              
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

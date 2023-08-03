import React, { useEffect, useState } from 'react';
import { Group, MapsHomeWork } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import AdminInvoice from '../admininvoice/AdminInvoice';
import Customer1 from '../admincustomer/Customer1';
import axios from 'axios';
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Face2Icon from '@mui/icons-material/Face2';
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LayersIcon from "@mui/icons-material/Layers";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';




export default function Home({ link }) {


  
  const [selectedLink, setselectedLink] = useState('');
  const [rowCount, setRowCount] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [distributors, setDistributors] = useState(0);
  const [invoices, setInvoices] = useState(0);
  const [lpos, setLpos] = useState(0);
  const [users, setUsers] = useState(0);
  const [vat, setVat] = useState(16);

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
  const countUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/countUsers"
      );
      setUsers(response.data[0].count_users);

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
  countUsers();


  // useEffect(() => {
  //   setselectedLink(link);
  // }, [link]);

  const setNewVAT = async () => {
    try {
      const response = await axios.put("http://localhost:3000/update/vat", {
        vat,
      });

      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
    alert("Vat changed successfuly!");
    setVat(0);
  };

  const handleClick = (link) => {
    setselectedLink(link);
    window.location.href = `${link}`;

  };
  const handleClickCustomer = () => {
    handleClick('admincustomers');
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
              <InboxIcon
                sx={{ height: 100, width: 100, opacity: 1, mr: 1, }}
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
             onClick={() => handleClickUser()}>
            <Typography variant="h4">Users</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <Face2Icon
                sx={{ height: 100, width: 100, opacity: 1, mr: 1 }}
              />
              <Typography variant="h4">{users}</Typography>
              
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
           onClick={() => handleClick('adminLpo')}>
            <Typography variant="h4">Lpo</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <LayersIcon
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
           onClick={() => handleClick('admindistributor')}>
            <Typography variant="h4">Distributors</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <DeliveryDiningIcon
                sx={{ height: 100, width: 100, opacity: 1, mr: 1 }}
              />
              <Typography variant="h4">{distributors}</Typography>
              
            </Box>
          </Paper>

          <div>
        <label
          htmlFor="vat"
          style={{
            display: "block",
            marginBottom: "5px",
            textAlign: "left",
            fontWeight: "500",
            fontSize: "20px",
          }}
        >
          Change VAT
        </label>
        <input
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
          type="number"
          id="vat"
          placeholder="16"
          value={vat}
          onChange={(e) => setVat(e.target.value)}
        />
         <button
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s",
              marginRight: "100%",
              marginTop: "6px", 
              width: "40%",
            }}
            type="button"
            onClick={setNewVAT}
          >
           Save
          </button>
      </div>
        </>
      )}
{/* If it is true, it will render the DispatchedInvoice component. Otherwise, it won't render anything. */}
      {selectedLink === 'admincustomer' && <Customer1 />}
      {selectedLink === 'admininvoice' && <AdminInvoice />}
    </Box>
  );
}

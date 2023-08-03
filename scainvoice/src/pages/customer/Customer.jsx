import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Group } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Customer = () => {
  const navigate = useNavigate();

  const handleNewCustomerClick = () => {
    navigate("/customer/new");
  };
  const handleCustomerRecordsClick = () => {
    navigate("/customer/records");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        flexDirection: "column",
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            Customers
          </h1>
        </div>
        <div
          style={{
            width: "50%",
          }}
        >
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s",
              marginRight: "10px",
              marginLeft: "80%",
            }}
            type="button"
            onClick={() => navigate('/dashboard ')}
          >
            Home
          </button>
        </div>
      </div>

      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box>
          <Paper
            elevation={3}
            sx={{ 
              p: 3, 
              width: 360, 
              cursor: "pointer",
              transition: 'background-color 0.3s, transform 0.3s',
             '&:hover': {
              backgroundColor: 'rgba(0,128,0,1)',
              transform: 'scale(1.05)',
              color: "white"
            },
             }}
            onClick={handleNewCustomerClick}
          >
            <Typography variant="h4">New Customer</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <PersonAddIcon
                sx={{ height: 100, width: 100, opacity: 1, marginRight: 1 }}
              />
            </Box>
          </Paper>
        </Box>

        <Box>
          <Paper
            elevation={3}
            sx={{ 
              p: 3, 
              width: 360, 
              cursor: "pointer",
              transition: 'background-color 0.3s, transform 0.3s',
             '&:hover': {
              backgroundColor: 'rgba(0,128,0,1)',
              transform: 'scale(1.05)',
              color: "white"
            },
             }}
            onClick={handleCustomerRecordsClick}
          >
            <Typography variant="h4">Customer Records</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <Group
                sx={{ height: 100, width: 100, opacity: 1, marginRight: 1 }}
              />
            </Box>
          </Paper>
        </Box>
      </div>
    </Box>
  );
};

export default Customer;

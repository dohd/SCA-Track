import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Group, Restore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const navigate = useNavigate();

  const handleNewCustomerClick = () => {
    navigate("/admincustomer/new");
  };
  const handleCustomerRecordsClick = () => {
    navigate("/admincustomer/records");
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
            onClick={() => navigate('/admindashboard ')}
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
            sx={{ p: 3, width: 360, cursor: "pointer" }}
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
              <Group
                sx={{ height: 100, width: 100, opacity: 0.3, marginRight: 1 }}
              />
            </Box>
          </Paper>
        </Box>

        <Box>
          <Paper
            elevation={3}
            sx={{ p: 3, width: 360, cursor: "pointer" }}
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
              <Restore
                sx={{ height: 100, width: 100, opacity: 0.3, marginRight: 1 }}
              />
            </Box>
          </Paper>
        </Box>
      </div>
    </Box>
  );
};

export default Customer;

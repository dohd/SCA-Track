import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Group, Restore, History } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Customer = () => {
  const navigate = useNavigate();

  const handleNewBankClick = () => {
    navigate('/bank/newbank');
  };
  const handleBankRecordsClick = () => {
    navigate('/bank/brecords');
  };


  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
    }}
    >
      <Box sx={{ margin: 2 }}>
        <Paper
          elevation={3}
          sx={{ p: 3, width: 360, cursor: 'pointer' }}
          onClick={handleNewBankClick}
        >
          <Typography variant="h4">New Bank</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 2,
            }}
          >
            <Group sx={{ height: 100, width: 100, opacity: 0.3, marginRight: 1 }} />
          </Box>
        </Paper>
      </Box>

      <Box sx={{ margin: 2 }}>
        <Paper elevation={3}
          sx={{ p: 3, width: 360, cursor: 'pointer' }}
          onClick={handleBankRecordsClick}
        >
          <Typography variant="h4">Bank Records</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 2,
            }}
          >
            <Restore sx={{ height: 100, width: 100, opacity: 0.3, marginRight: 1 }} />
          </Box>
        </Paper>
      </Box>

      
    </Box>
  );
};

export default Customer;

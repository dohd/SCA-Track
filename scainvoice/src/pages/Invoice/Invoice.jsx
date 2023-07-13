import  React from 'react';
import { Box, Paper, Typography} from '@mui/material';
import { Group, Restore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Invoice = () =>  {

  // const navigate = useNavigate();

  // const handleNewCustomerClick = () => {
  //   navigate('/customer/new');
  // };
  // const handleCustomerRecordsClick = () => {
  //   navigate('/customer/records');
  // };

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

      <Box sx={{ margin: 2 }}>
        <Paper
          elevation={3}
          sx={{ p: 3, width: 400, cursor: 'pointer' }}
          // onClick={handleNewCustomerClick}
        >
          <Typography variant="h4">New Invoice</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Group sx={{ height: 100, width: 100, opacity: 0.3, marginRight: 1 }} />
          </Box>
        </Paper>
      </Box>

      <Box sx={{ margin: 2 }}>
        <Paper
          elevation={3}
          sx={{ p: 3, width: 400, cursor: 'pointer' }}
          // onClick={handleNewCustomerClick}
        >
          <Typography variant="h4">New Invoice</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Restore sx={{ height: 100, width: 100, opacity: 0.3, marginRight: 1 }} />
          </Box>
        </Paper>
      </Box>

          
    </Box>

  );
};

export default Invoice;
import React from 'react'
import { Box,Paper,Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Restore,Group } from '@mui/icons-material';

const Distributor = () => {
  const navigate = useNavigate();

  const handleNewDistributor = () => {
    navigate('/distributor/newd');
  };
  const handleDistributorRecords = () => {
    navigate('/distributor/drecords');
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
      <Box sx={{ margin: 2 }}>
        <Paper
          elevation={3}
          sx={{ p: 3, width: 400, cursor: 'pointer' }}
          onClick={handleNewDistributor}
          
        >
           <Typography variant="h4">New Distributor</Typography>
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
        <Box sx={{ margin: 2 }}>
        <Paper
          elevation={3}
          sx={{ p: 3, width: 400, cursor: 'pointer' }}
          onClick={handleDistributorRecords}
          
        >
           <Typography variant="h4"> Distributor Records</Typography>
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
    </Box>
  )
}
export default Distributor;

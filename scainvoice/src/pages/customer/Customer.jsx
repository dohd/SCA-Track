import React from 'react';
import Box from '@mui/material/Box';
import { Paper,Typography } from '@mui/material';

import { Group, MapsHomeWork } from '@mui/icons-material';

const Customer = () => {
  return (
    <Box
    sx={{
      display:{xs:'flex',md:'grid'},
      gridTemplateColumns:'repeat(3,1fr)',
      gridAutoRows: 'minmax(100px,auto)',
      gap:3,
      textAlign:'center',
      flexDirection:'column',
    }}>
    <Paper elevation={3} sx={{ p: 3 }}>
   
  </Paper>
  </Box>
  );
};

export default Customer;

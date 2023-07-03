import React, { useEffect, useState } from 'react';
import { Group, MapsHomeWork } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
function Invoice(link) {
    const [selectedLink, setselectedLink] = useState('');

  useEffect(() => {
    setselectedLink(link);
  }, [link]);

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
          <Paper elevation={3} sx={{ p: 3 }}>
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

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">CreateInvoice</Typography>
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
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">InvoiceList</Typography>
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
      </Box>
  )
}

export default Invoice
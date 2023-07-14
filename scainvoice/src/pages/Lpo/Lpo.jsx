import React from 'react'
import { Box, Paper, Typography } from "@mui/material";
import { Group, Restore, History } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export default function Lpo() {
  const navigate = useNavigate();

  const handleNewLpoClick = () => {
    navigate('/lpo/newLpo ');
  };
  const handleLpoRecordsClick = () => {
    navigate('/lpo/lpoRecord ');
  };

  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'start',
      height: '100%',
    }}
  >

<Box sx={{ margin: 2 }}>
        <Paper
          elevation={3}
          sx={{ p: 3, width: 400, cursor: 'pointer' }}
          onClick={handleNewLpoClick}
        >
          <Typography variant="h4">New LPO</Typography>
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
          sx={{ p: 3, width: 400, cursor: 'pointer' }}
          onClick={handleLpoRecordsClick}
        >
          <Typography variant="h4">LPO Records</Typography>
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
  )
}



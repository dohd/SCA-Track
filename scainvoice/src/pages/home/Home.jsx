import React, { useEffect,useState } from 'react'
import {link} from 'react'
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';

export default function Home() {
  const [selectedLink, setselectedLink] = useState('');

  useEffect(() => {
    setselectedLink(link);
  }, []);
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
      <Paper elevation={3} sx={{p:3}}>


      </Paper>



    </Box>
  )
}

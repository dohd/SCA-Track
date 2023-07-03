import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { useState,useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidelist from './Sidelist';
import { ThemeProvider } from '@emotion/react';


const drawerWidth = 240;




const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export default function Dashboard() {
  
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  
{/*In the code above, we define a state variable dark using the useState hook, and initialize it with the value true. We also have a setDark function to update the value of dark when needed.

The darkTheme variable is created using the useMemo hook to memoize the theme object. This means the theme will only be recreated if the value of dark changes.

Inside createTheme, we define the palette object with a mode property. The value of mode is set based on the dark state. If dark is true, the mode will be 'dark'; otherwise, it will be 'light'. */}
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  
  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{backgroundColor:'green'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{flexGrow:1}}>
            Spartec   
         </Typography>
         <IconButton>
          {/*color mode here*/}
         </IconButton>
        </Toolbar>
      </AppBar>
      <Sidelist {...{open,setOpen}}/>
      </Box>
      
      
  );
}
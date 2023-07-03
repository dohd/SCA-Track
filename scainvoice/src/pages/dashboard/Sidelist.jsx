import React, { useMemo, useState } from 'react'
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Box from '@mui/material/Box';
import {dispatch,link} from 'react'
import { Route, useNavigate ,Routes} from 'react-router-dom';
import LayersIcon from '@mui/icons-material/Layers';
import { IconButton, Tooltip } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import Lpo from '../Lpo/Lpo'
import Home from '../home/Home';
import Logout from '@mui/icons-material/Logout'
import Customer from '../customer/Customer';
import Invoice from '../Invoice/InvoiceList';

import Distributors from '../distributors/Distributors'
const drawerWidth = 240;


const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
const Sidelist=({open,setOpen})=> {
  const navigate =useNavigate()
  const handlelogout= () =>{
  dispatch({type:'UPDATE_USER',payload:null})
  navigate('/')
  }

  const {selectedLink,setselectedLink}=useState('')
  const list = useMemo(()=>[
    {title:'Home',icon:<MailIcon/>,link:'',component:<Home{...{setselectedLink,link:''}}/>},
    {title:'Distributors',icon:<InboxIcon/>,link:'distributors',component:< 
      Distributors {...{setselectedLink,link:'distributors'}}/>},
      {title:'Invoice',icon:<MailIcon/>,link:'invoice',component:<Invoice{...{setselectedLink,link:'invoice'}}/>},
      {title:'Customer',icon:<MailIcon/>,link:'customer',component:<Customer{...{setselectedLink,link:'customer'}}/>},
      {title:'Lpo',icon:<LayersIcon/>,link:'lpo',component:<Lpo{...{setselectedLink,link:'lpo'}}/>},
  ],[])

  return (
   <>
   
   <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={()=>setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>navigate(item.link)}
                selected ={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
       <Tooltip title= 'Logout' sx={{mt:1}}>
        <IconButton onClick={handlelogout}> 
          <Logout/>
        </IconButton>

       </Tooltip>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {list.map(item=>(
            <Route key={item.title} path={item.link} element={item.component}/>
          ))}
        </Routes>
        <Typography >
        <Home/>
        </Typography>
        <Typography >
            <Home/>
         
        </Typography>
      </Box>
   
   
   
   
   </>
  )
}

export default Sidelist
import React, { useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";
import { dispatch, link } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import LayersIcon from "@mui/icons-material/Layers";
import { IconButton, Tooltip } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MuiDrawer from "@mui/material/Drawer";

import AdminHome from "../AdminHome/AdminHome";
import Logout from "@mui/icons-material/Logout";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import Bank1 from "../adminbank/Bank1";
import Face2Icon from '@mui/icons-material/Face2';
import admnInvoice from "../admininvoice/AdminInvoice";
import Customer1 from "../admincustomer/Customer1";
import Distributors1 from "../admindistributors/Distributors1";
import Lpo1 from "../adminLpo/Lpo1";
import User from "../user/User";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidelist = ({ open, setOpen }) => {
  const { selectedLink, setselectedLink } = useState("");
  {
    /*
  list variable is an array of objects, where each object represents a menu item
  Each menu item has a title, an icon component from the Material-UI library,
   a link indicating the associated link, 
and a component representing the component to render when the menu item is selected. */
  }
  const list = useMemo(
    () => [
      {
        title: "Admin Home",
        icon: <HomeIcon />,
        link: "/admindashboard",
        component: (
          <AdminHome {...{ setselectedLink, link: "/admindashboard" }} />
        ),
      },
      {
        title: "Adm Distributor",
        icon: <DeliveryDiningIcon />,
        link: "admindistributor ",
        component: (
          <Distributors1 {...{ setselectedLink, link: "admindistributor" }} />
        ),
      },
      {
        title: "Adm Invoice",
        icon: <InboxIcon />,
        link: "admininvoice ",
        component: (
          <admnInvoice {...{ setselectedLink, link: "admininvoice" }} />
        ),
      },
      {
        title: "Adm Customer",
        icon: <PeopleIcon />,
        link: "admincustomers ",
        component: (
          <Customer1 {...{ setselectedLink, link: "admincustomers" }} />
        ),
      },
      {
        title: "Admin Bank",
        icon: <AccountBalanceIcon />,
        link: "adminbank ",
        component: <Bank1 {...{ setselectedLink, link: "adminbank" }} />,
      },
      {
        title: "Admin Lpo",
        icon: <LayersIcon />,
        link: "adminlpo ",
        component: <Lpo1 {...{ setselectedLink, link: "adminlpo" }} />,
      },
      {
        title: "Users",
        icon: <Face2Icon />,
        link: "user ",
        component: <User {...{ setselectedLink, link: "user" }} />,
      },
    ],
    []
  );
  const navigate = useNavigate();
  const logouthandle = () => {
    console.log("alert");
    navigate("/");
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader style={{ backgroundColor: "green" }}>
          <IconButton onClick={() => setOpen(false)}>
            <KeyboardDoubleArrowLeftOutlinedIcon style={{ color: "white" }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/*rendering navigation list*/}
        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover": {
                    backgroundColor: "green",
                    color: "white" // Add hover background color
                  },
                }}
                onClick={() => navigate(item.link)}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    "&:hover": {
                      backgroundColor: "green",
                      color: "white" // Add hover background color
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Tooltip title="Logout" sx={{ mt: 1 }}>
          <IconButton onClick={logouthandle}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
        </Routes>
      </Box>
    </>
  );
};

export default Sidelist;

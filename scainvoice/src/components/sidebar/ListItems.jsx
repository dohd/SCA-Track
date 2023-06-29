import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Link} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'
import DescriptionIcon from '@mui/icons-material/Description';

import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';


export const mainListItems = (
    <React.Fragment>
        <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
            <ListItemButton>
                <ListItemIcon>
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary="Home"/>
            </ListItemButton>
        </Link>
        <Link to="/invoice" style={{textDecoration: 'none', color: 'inherit'}}>
            <ListItemButton>
                <ListItemIcon>
                    <DescriptionIcon/>
                </ListItemIcon>
                <ListItemText primary="Invoice"/>
            </ListItemButton>
        </Link>
        <Link to="/lpo" style={{textDecoration: 'none', color: 'inherit'}}>
            <ListItemButton>
                <ListItemIcon>
                    <LayersIcon/>
                </ListItemIcon>
                <ListItemText primary="Lpo"/>
            </ListItemButton>
        </Link>
        <Link to="/bank">
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon/>
                </ListItemIcon>
                <ListItemText primary="Bank"/>
            </ListItemButton>
        </Link>
        <Link to="/customer" className='link' style={{textDecoration: 'none', color: 'inherit'}}>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Customer"/>
            </ListItemButton>
        </Link>
    </React.Fragment>
);


import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BrushIcon from '@material-ui/icons/Brush';
import LayersIcon from '@material-ui/icons/Layers';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { Link } from 'react-router-dom';
import PaletteIcon from '@material-ui/icons/Palette';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import ExtensionIcon from '@material-ui/icons/Extension';
import StorageIcon from '@material-ui/icons/Storage';

import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';


export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem button component={Link} to="/collections">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Collections" />
    </ListItem>
    <ListItem button component={Link} to="/viewDesigns">
      <ListItemIcon>
        <BrushIcon />
      </ListItemIcon>
      <ListItemText primary="Designs"/>
    </ListItem>
    <ListItem button component={Link} to="/inventory">
      <ListItemIcon>
        <StorageIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItem>
    <ListItem button component={Link} to="/coupon">
      <ListItemIcon>
        <LoyaltyIcon />
      </ListItemIcon>
      <ListItemText primary="Coupon" />
    </ListItem>
    <ListItem button component={Link} to="/offers">
      <ListItemIcon>
        <LocalOfferIcon />
      </ListItemIcon>
      <ListItemText primary="Offers" />
    </ListItem>
    <ListItem button component={Link} to="/availableColors">
      <ListItemIcon>
        <PaletteIcon />
      </ListItemIcon>
      <ListItemText primary="Available Colors" />
    </ListItem>
    <ListItem button component={Link} to="/availableSizes">
      <ListItemIcon>
        <ZoomOutMapIcon />
      </ListItemIcon>
      <ListItemText primary="Available Sizes" />
    </ListItem>
    <ListItem button component={Link} to="/availableTypes">
      <ListItemIcon>
        <ExtensionIcon />
      </ListItemIcon>
      <ListItemText primary="Available Types" />
    </ListItem>

    <ListItem button component={Link} to="/customizeOrders">
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Customized Orders" />
    </ListItem>
    <ListItem button component={Link} to="/depositlips">
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Bank Deposit Slips" />
    </ListItem>
    
    <ListItem button component={Link} to="/inquiries">
      <ListItemIcon>
        <ContactSupportIcon />
      </ListItemIcon>
      <ListItemText primary="Inquiries" />
    </ListItem>

  
  </div>
);

export const secondListItems = (
      <div><img src={require('../../images/logodrawer.png').default} alt="CeylonFolk" height="80px" style={{margin:'30px 0px'}}/></div>
);


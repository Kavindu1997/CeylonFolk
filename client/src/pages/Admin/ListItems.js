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
import ViewListIcon from '@material-ui/icons/ViewList';
import axios from 'axios';

const viewInquiries = (event) => {

  axios.put(`http://localhost:3001/notifications/contactUs`).then((response) => {



  }).catch((err) => {
    console.log('err', err);
  })
};

const viewBankDeposits = (event) => {

  axios.put(`http://localhost:3001/notifications/bankDeposits`).then((response) => {


  }).catch((err) => {
    console.log('err', err);
  })
};

const viewCO = (event) => {

  axios.put(`http://localhost:3001/notifications/pendingCO`).then((response) => {
  });

  axios.put(`http://localhost:3001/notifications/recievedCO`).then((response) => {
  });

  axios.put(`http://localhost:3001/notifications/advancepaidCO`).then((response) => {
  });

  axios.put(`http://localhost:3001/notifications/paidCO`).then((response) => {
  });

  axios.put(`http://localhost:3001/notifications/canceledCO`).then((response) => {
  });



};

const viewOrders = (event) => {

  axios.put(`http://localhost:3001/notifications/editedorders`).then((response) => {

  });
  axios.put(`http://localhost:3001/notifications/deletedorders`).then((response) => {
  });

  axios.put(`http://localhost:3001/notifications/placedorders`).then((response) => {
  });

};



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
      <ListItemText primary="Designs" />
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
    <ListItem button component={Link} to="/AdminOrders/0" onClick={viewOrders}>
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary="Inhouse Orders" />
    </ListItem>
    <ListItem button component={Link} to="/customizeOrders" onClick={viewCO} >
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Customized Orders" />
    </ListItem>
    <ListItem button component={Link} to="/depositlips" onClick={viewBankDeposits}>
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Bank Deposit Slips" />
    </ListItem>

    <ListItem button component={Link} to="/inquiries" onClick={viewInquiries}>
      <ListItemIcon>
        <ContactSupportIcon />
      </ListItemIcon>
      <ListItemText primary="Inquiries" />
    </ListItem>


  </div >
);

export const secondListItems = (
  <div><img src={require('../../images/logodrawer.png').default} alt="CeylonFolk" height="80px" style={{ margin: '30px 0px' }} /></div>
);


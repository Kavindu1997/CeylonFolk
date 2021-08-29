import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BrushIcon from '@material-ui/icons/Brush';
import LayersIcon from '@material-ui/icons/Layers';
import BuildIcon from '@material-ui/icons/Build';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { Link } from 'react-router-dom';
import PaletteIcon from '@material-ui/icons/Palette';
import SpeakerIcon from '@material-ui/icons/Speaker';
import TextFieldsIcon from '@material-ui/icons/TextFields';


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
        <BuildIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItem>
    <ListItem button component={Link} to="/coupon">
      <ListItemIcon>
        <LoyaltyIcon />
      </ListItemIcon>
      <ListItemText primary="Coupon" />
    </ListItem>
    <ListItem button component={Link} to="/availableColors">
      <ListItemIcon>
        <PaletteIcon />
      </ListItemIcon>
      <ListItemText primary="Available Colors" />
    </ListItem>
    <ListItem button component={Link} to="/availableSizes">
      <ListItemIcon>
        <SpeakerIcon />
      </ListItemIcon>
      <ListItemText primary="Available Sizes" />
    </ListItem>
    <ListItem button component={Link} to="/availableTypes">
      <ListItemIcon>
        <TextFieldsIcon />
      </ListItemIcon>
      <ListItemText primary="Available Types" />
    </ListItem>

  
  </div>
);

export const secondListItems = (
      <div><img src={require('../../images/logodrawer.png').default} alt="CeylonFolk" height="80px" style={{margin:'30px 0px'}}/></div>
);


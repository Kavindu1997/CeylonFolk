import React, { Fragment } from "react";
import { Badge, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, } from "@material-ui/core";
import { useStyles } from "./styles";
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit'
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from 'react-router';

export default function Logout() {
  const classes = useStyles();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("handleClicked ", event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear()
    localStorage.setItem("userId", 0)
    history.push("/")
  };


  const dropDownData = [
    { label: "logout", icon: <TransitEnterexitIcon /> },
  ];

  return (
    <>
      <IconButton
        aria-controls='logout'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'>
        <Badge badgeContent={null} color='secondary'>
          <ExitToAppIcon />
        </Badge>
      </IconButton>
      <Menu
        id='logout'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        placement='bottom-start'>
        <List dense={true} className={classes.dropdownlist}>
          {dropDownData.map((item, i) => (
            <ListItem
              key={i}
              component={Button}
              onClick={logout}
              className={classes.listItem}>
              <ListItemAvatar>{item.icon}</ListItemAvatar>
              <ListItemText primary={item.label}></ListItemText>
            </ListItem>
          ))}
        </List>
      </Menu>
    </>
  );
}
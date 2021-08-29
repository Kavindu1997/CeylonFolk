import React, { Fragment } from "react";
import { Badge,  Button,IconButton,List,ListItem,ListItemAvatar,ListItemText,Menu,} from "@material-ui/core";
import { useStyles } from "./styles";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function Profile() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("handleClicked ", event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dropDownData = [
    { label: "settings", icon: <SettingsIcon /> },
  ];

  return (
    <>
      <IconButton
        aria-controls='profile'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'>
        <Badge badgeContent={null} color='secondary'>
          <AccountCircleIcon/>
        </Badge>
      </IconButton>
      <Menu
        id='profile'
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
              onClick={handleClose}
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
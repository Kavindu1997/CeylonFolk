import React, { useState} from "react";
import { Badge,  Button,IconButton,List,ListItem,ListItemAvatar,ListItemText,Menu,Drawer,Avatar,Tooltip, Typography,Divider,Grid} from "@material-ui/core";
import { useStyles } from "./styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Controls from "../Controls";

export default function Profile() {
  const classes = useStyles();
  const [open,setOpen]=useState(false);
  const [anchorEl, setAnchorEl] =useState('top');

  const handleClick = (event) => {
    setAnchorEl('top');
    setOpen(true);
    
  };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const dropDownData = [
  //   { label: "settings", icon: <SettingsIcon /> },
  // ];

  return (
    <>
    <Tooltip title="Hi,Admin!">
      <IconButton
        aria-controls='profile'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'
       >
        <Badge badgeContent={null} color='secondary'>
          <AccountCircleIcon/>
        </Badge>
      </IconButton>
    </Tooltip>
      {/* <Menu
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
      </Menu> */}
      <Drawer
      anchor={anchorEl}
      open={open}
      onClose={()=>setOpen(false)}
      >
              <div style={{height:'450px'}}  className={classes.drawer}>
              <ListItemAvatar>
                <Avatar className={classes.profileImg}>K</Avatar>
              </ListItemAvatar>
              <Typography className={classes.profileName}>Kavindu Samaraweera</Typography>
              <Divider variant="middle" className={classes.divider}/>

              <Grid container>
                <Grid item xs={6}>
                      <Typography className={classes.profileTitle}>Email</Typography>
                           <Typography className={classes.profileDetail} variant="subtitle1" color="textSecondary">kksamaraweera1997@gmail.com</Typography>
                      <Typography className={classes.profileTitle} >Gender</Typography>
                           <Typography className={classes.profileDetail} variant="subtitle1" color="textSecondary">Male</Typography>
                </Grid>
                <Grid item xs={6}>
                      <Typography className={classes.profileTitle}>Contact Number</Typography>
                           <Typography className={classes.profileDetail} variant="subtitle1" color="textSecondary">0777778142</Typography>
                      <Typography className={classes.profileTitle}>User Type</Typography>
                           <Typography className={classes.profileDetail} variant="subtitle1" color="textSecondary">Admin</Typography>
                </Grid>
              </Grid>
          <Grid container style={{ justifyContent: 'center'}}>
              <Controls.Button
                            text="Edit Profile"
                            variant="contained"
                            color="default"
                            startIcon={<EditIcon />}
                            className={classes.newButton}
                        />
               <Controls.Button
                            text="Change Password"
                            variant="contained"
                            color="secondary"
                            startIcon={<VpnKeyIcon/>}
                            className={classes.newButton}
                        />
          </Grid>
              </div>
      </Drawer>
    </>
  );
}
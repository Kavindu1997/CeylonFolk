import React, { useState,useEffect} from "react";
import { Badge,IconButton,ListItemAvatar,Drawer,Avatar,Tooltip, Typography,Divider,Grid} from "@material-ui/core";
import { useStyles } from "./styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Controls from "../Controls";
import Popup from "../Popup";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import Notification from "../Notification";
import axios from 'axios';
import {API_URL }from '../../../_constants';

export default function Profile() {
  const classes = useStyles();
  const [records,setRecords]=useState([]);
  const [open,setOpen]=useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [anchorEl, setAnchorEl] =useState('top');
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  const handleClick = (event) => {
    setAnchorEl('top');
    setOpen(true);
    
  };
  const addOrEdit = (data, resetForm) => {
    axios.put(`/auth/${data.id}`, data);
    resetForm();
    setRecordForEdit(null);
    setOpenEditPopup(false);
    setNotify({
      isOpen: true,
      message: 'Profile Edited Successfully !',
      type: 'info'
    }); 
    setOpen(false);
    window.location.reload(true);
}

const addOrEditPwd = (data, resetForm) => {
  var uid = localStorage.getItem("userId");
  console.log(uid);
  console.log(data);
  axios.put(`/auth/changePassword/${uid}`, data);
  resetForm();
  setRecordForEdit(null);
  setOpenPopup(false);
  setNotify({
    isOpen: true,
    message: 'Password Edited Successfully !',
    type: 'info'
  }); 
  setOpen(false);
  window.location.reload(true);
}


const openInPopup = item => {
  setRecordForEdit(item);
  setOpenEditPopup(true);
}

useEffect(() => {
  var uid = localStorage.getItem("userId");
  axios.get(API_URL+`/auth/profile/${uid}`).then((response) => {
      console.log(response.data);
      setRecords(response.data[0]);   
  });
}, []);
 

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
  
      <Drawer
      anchor={anchorEl}
      open={open}
      onClose={()=>setOpen(false)}
      >
       
              <div style={{height:'380px'}}  className={classes.drawer}>
              <ListItemAvatar>
                <Avatar className={classes.profileImg}>P</Avatar>
              </ListItemAvatar>
              <Typography className={classes.profileName}>{records.firstName} {records.lastName}</Typography>
              <Divider variant="middle" className={classes.divider}/>

              <Grid container>
                <Grid item xs={4}>
                      <Typography className={classes.profileTitle}>Email</Typography>
                           <Typography className={classes.profileDetail} variant="subtitle1" color="textSecondary">{records.email}</Typography>
                </Grid>
                <Grid item xs={4}>
                      <Typography className={classes.profileTitle}>Contact Number</Typography>
                           <Typography className={classes.profileDetail} variant="subtitle1" color="textSecondary">{records.contactNo}</Typography>
                </Grid>
                <Grid item xs={4}>
                      <Typography className={classes.profileTitle}>User Type</Typography>
                                <Typography className={classes.profileDetail} variant="subtitle1" color="textSecondary">{records.type}</Typography>
                 </Grid>
              </Grid>
          <Grid container style={{ justifyContent: 'center',marginTop:'35px'}}>
              <Controls.Button
                            text="Edit Profile"
                            variant="contained"
                            color="default"
                            startIcon={<EditIcon />}
                            className={classes.newButton}
                            onClick={() => { openInPopup(records) }}
                        />
               <Controls.Button
                            text="Change Password"
                            variant="contained"
                            color="secondary"
                            startIcon={<VpnKeyIcon/>}
                            className={classes.newButton}
                            onClick={() => { setOpenPopup(true);}}
                        />
          </Grid>
              </div>

              <Popup
                    title="Edit Profile Form"
                    openPopup={openEditPopup}
                    setOpenPopup={setOpenEditPopup}
                >
                    <EditProfile
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit}
                    />
                </Popup>

              <Popup
                    title="Change Password"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <ChangePassword
                        recordForEdit={recordForEdit}
                        addOrEditPwd={addOrEditPwd}
                    />
                </Popup>

                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
                
      </Drawer>

    </>
  );
}
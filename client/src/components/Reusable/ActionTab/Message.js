// import React, { Fragment } from "react";
import React, { useState, useEffect } from "react";
import { Avatar, Badge, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu ,Typography,Box} from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import { useStyles } from "./styles";
import axios from 'axios';
import Controls from '../Controls';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';


export default function Messages() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("handleClicked ", event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [listOfContactUs, setListOfContactUs] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/notifications/contactUs").then((response) => {
      console.log(response.data);
      // console.log("ssss");
      setListOfContactUs(response.data);
      
  //   setTimeout(() => {
  //     window.location.reload(true)
  // }, 1500)

    })
  }, []);

  const [listOfUnsolvedInquiries, setListOfUnsolvedInquiries] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/notifications/unsolvedInquiries").then((response) => {
      console.log(response.data);
      // console.log("ssss");
      setListOfUnsolvedInquiries(response.data);
      
  //   setTimeout(() => {
  //     window.location.reload(true)
  // }, 1500)

    })
  }, []);


  console.log(listOfContactUs);

  // const dropDownData = [ { label: "kk" , description: "Hi CeylonFolk" },];

  
  const viewInquiries = (event) => {

    axios.put(`http://localhost:3001/notifications/contactUs`).then((response) => {
       

    }).catch((err) => {
        console.log('err', err);
    })
};

const k=1;

  return (
    <>
      <IconButton
        aria-controls='Messages'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'>
        {/* <Badge badgeContent={(listOfContactUs.length + listOfContactUs.length)} color='secondary'> */}
        <Badge badgeContent={k} color='secondary'>
          <ForumIcon />
        </Badge>
      </IconButton>
      <Menu
        id='Messages'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        placement='bottom-start'>
        <List dense={true} className={classes.dropdownlist}>

            <ListItem
              // key={i}
              component={Button}
              onClick={viewInquiries}
              component={Link} to="/inquiries"
              className={classes.listItemNotification}>
              <ListItemAvatar>
                <Avatar className={classes.navImg}>
                  <AssignmentIcon />
                </Avatar>

              </ListItemAvatar>
            
               <Typography variant="h8" component="div" whiteSpace="normal" >You have {(listOfContactUs.length)} new inquiries </Typography>
            

            </ListItem>
{/* 
            if({(listOfContactUs.length)}!={(listOfUnsolvedInquiries.length)}){
                console.log("hellocheck")
              } */}
{/* 
{(() => {
        if (k=0) {
          return (
            <div>someCase</div>
          )
        } else if (otherCase) {
          return (
            <div>otherCase</div>
          )
        } else {
          return (
            <div>catch all</div>
          )
        }
      })()} */}


{/* 
          next notification */}
          {/* {listOfContactUs.map((item, i) => (

            <ListItem
              key={i}
              component={Button}
              onClick={handleClose}
              className={classes.listItemNotification}>

              <ListItemAvatar>
                <Avatar className={classes.green}>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.id}
                secondary={item.name}></ListItemText>
            </ListItem>
          ))} */}
        </List>
      </Menu>
    </>
  ) ;

}
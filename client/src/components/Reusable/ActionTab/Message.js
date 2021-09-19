// import React, { Fragment } from "react";
import React, { useState, useEffect } from "react";
import { Avatar, Badge, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, Typography, Box } from "@material-ui/core";
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

  const [reOrderLevel, setReOrderLevel] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/notifications/reorderlevel").then((response) => {
      console.log(response.data);
      // console.log("ssss");
      setReOrderLevel(response.data);

      //   setTimeout(() => {
      //     window.location.reload(true)
      // }, 1500)

    })
  }, []);


  const [offerDate, setOfferDate] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/notifications/offerdate").then((response) => {
      console.log(response.data);

      setOfferDate(response.data);


    })
  }, []);

  const [editedOrders, seteditedOrders] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/notifications/editedorders").then((response) => {
      console.log(response.data);

      seteditedOrders(response.data);


    })
  }, []);

  const [deletedOrders, setdeletedOrders] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/notifications/deletedorders").then((response) => {
      console.log(response.data);

      setdeletedOrders(response.data);


    })
  }, []);

  const [placedOrders, setplacedOrders] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/notifications/placedorders").then((response) => {
      console.log(response.data);

      setplacedOrders(response.data);


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


  if (listOfContactUs.length > 0) {
    var ContactUsValue = 1;
  }
  else {
    var ContactUsValue = 0;
  }



  if (listOfContactUs.length != listOfUnsolvedInquiries.length) {
    var UnsolvedValue = 1;
  }



  return (

    <>
      <IconButton
        aria-controls='Messages'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'>
        {/* <Badge badgeContent={(listOfContactUs.length + listOfContactUs.length)} color='secondary'> */}
        <Badge badgeContent={ContactUsValue + UnsolvedValue + reOrderLevel.length + offerDate.length + editedOrders.length + placedOrders.length + deletedOrders.length} color='secondary'>
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


          {/* new inquiry */}
          <ListItem
            // key={i}
            component={Button}
            onClick={viewInquiries}
            component={Link} to="/inquiries"
            className={classes.listItemNotification}>
            <Typography className={ContactUsValue != 0 && listOfContactUs.length != 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >You have {(listOfContactUs.length)} new inquiries </Typography>
            <Typography className={ContactUsValue != 0 && listOfContactUs.length == 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >You have {(listOfContactUs.length)} new inquiry </Typography>

          </ListItem>


          {/* to be resolved */}
          <ListItem
            // key={i}
            component={Button}
            onClick={viewInquiries}
            component={Link} to="/inquiries"
            className={classes.listItemNotification}>
            <Typography className={UnsolvedValue == 1 && listOfUnsolvedInquiries.length != 0 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >You {(listOfUnsolvedInquiries.length)} more inquiries to resolve </Typography>

          </ListItem>

          {/* reorder level notifications */}
          {reOrderLevel
            .map((value) => {
              return (
                <ListItem
                  // key={i}
                  component={Button}
                  component={Link} to="/inventory"
                  className={classes.listItemNotification}>

                  <Typography variant="h8" component="div" whiteSpace="normal" >Refill Inventory Id:{value.id} from Inventory </Typography>


                </ListItem>
              );
            })}

          {/* edited orders notifications */}
          {editedOrders
            .map((value) => {
              return (
                <ListItem
                  // key={i}
                  component={Button}
                  component={Link} to="/AdminOrders/0"
                  className={classes.listItemNotification}>

                  <Typography variant="h8" component="div" whiteSpace="normal" >Order Id:{value.orderId} is edited </Typography>


                </ListItem>
              );
            })}

          {/* deleted orders notifications */}
          {deletedOrders
            .map((value) => {
              return (
                <ListItem
                  // key={i}
                  component={Button}
                  component={Link} to="/AdminOrders/0"
                  className={classes.listItemNotification}>

                  <Typography variant="h8" component="div" whiteSpace="normal" >Order Id:{value.orderId} is deleted </Typography>


                </ListItem>
              );
            })}

          {/* placed orders notifications */}
          {placedOrders
            .map((value) => {
              return (
                <ListItem
                  // key={i}
                  component={Button}
                  component={Link} to="/AdminOrders/0"
                  className={classes.listItemNotification}>

                  <Typography variant="h8" component="div" whiteSpace="normal" >Order Id:{value.orderId} is placed </Typography>


                </ListItem>
              );
            })}


          {/* expired offer date notifications */}
          {offerDate
            .map((value) => {
              return (
                <ListItem
                  // key={i}
                  component={Button}
                  component={Link} to="/offers"
                  className={classes.listItemNotification}>

                  <Typography variant="h8" component="div" whiteSpace="normal" > {value.collection_name} offer is expired from {value.to} </Typography>


                </ListItem>
              );
            })}


          {/* no new notifications */}
          <ListItem

            component={Button}
            onClick={handleClose}
            className={classes.listItemNotification}>
            <Typography className={(ContactUsValue + UnsolvedValue + reOrderLevel.length + offerDate.length + editedOrders.length + placedOrders.length + deletedOrders.length) == 0 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >No new Notifications </Typography>

          </ListItem>

        </List>
      </Menu>
    </>
  );

}
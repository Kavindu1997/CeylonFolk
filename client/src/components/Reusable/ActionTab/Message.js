// import React, { Fragment } from "react";
import React, { useState, useEffect } from "react";
import { Avatar, Badge, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, Typography, Box, Divider } from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import { useStyles } from "./styles";
import axios from 'axios';
import Controls from '../Controls';
import ImageIcon from '@material-ui/icons/Image';
import { Link } from 'react-router-dom';
import AssignmentIcon from '@material-ui/icons/Assignment';
import WarningIcon from '@material-ui/icons/Warning';

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

  const [bankDeposits, setbankDeposits] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/notifications/bankDeposits").then((response) => {
      console.log(response.data);

      setbankDeposits(response.data);


    })
  }, []);

  console.log(listOfContactUs);

  // const dropDownData = [ { label: "kk" , description: "Hi CeylonFolk" },];


  const viewInquiries = (event) => {

    axios.put(`http://localhost:3001/notifications/contactUs`).then((response) => {
      window.location.reload();


    }).catch((err) => {
      console.log('err', err);
    })
  };

  const viewEditedOrders = (event) => {

    axios.put(`http://localhost:3001/notifications/editedorders`).then((response) => {

      window.location.reload();

    }).catch((err) => {
      console.log('err', err);
    })
  };

  const viewDeletedOrders = (event) => {




    axios.put(`http://localhost:3001/notifications/deletedorders`).then((response) => {
      window.location.reload();


    }).catch((err) => {
      console.log('err', err);
    })
  };

  const viewPlacedOrders = (event) => {
    axios.put(`http://localhost:3001/notifications/placedorders`).then((response) => {
      window.location.reload();


    }).catch((err) => {
      console.log('err', err);
    })
  };

  const viewBankDeposits = (event) => {

    axios.put(`http://localhost:3001/notifications/bankDeposits`).then((response) => {
      window.location.reload();

    }).catch((err) => {
      console.log('err', err);
    })
  };

  const [pendingCO, setpendingCO] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/notifications/pendingCO").then((response) => {

      setpendingCO(response.data);


    })
  }, []);

  const [recievedCO, setrecievedCO] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/notifications/recievedCO").then((response) => {


      setrecievedCO(response.data);


    })
  }, []);

  const [advancepaidCO, setadvancepaidCO] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/notifications/advancepaidCO").then((response) => {
      console.log(response.data);

      setadvancepaidCO(response.data);


    })
  }, []);

  const [paidCO, setpaidCO] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/notifications/paidCO").then((response) => {
      console.log(response.data);

      setpaidCO(response.data);


    })
  }, []);

  const [canceledCO, setcanceledCO] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/notifications/canceledCO").then((response) => {
      console.log(response.data);

      setcanceledCO(response.data);


    })
  }, []);

  const viewPendingCO = (event) => {

    axios.put(`http://localhost:3001/notifications/pendingCO`).then((response) => {
      window.location.reload();

    }).catch((err) => {
      console.log('err', err);
    })
  };

  const viewRecievedCO = (event) => {

    axios.put(`http://localhost:3001/notifications/recievedCO`).then((response) => {
      window.location.reload();

    }).catch((err) => {
      console.log('err', err);
    })
  };

  const viewAdvancePaidCO = (event) => {

    axios.put(`http://localhost:3001/notifications/advancepaidCO`).then((response) => {

      window.location.reload();
    }).catch((err) => {
      console.log('err', err);
    })
  };

  const viewPaidCO = (event) => {

    axios.put(`http://localhost:3001/notifications/paidCO`).then((response) => {
      window.location.reload();

    }).catch((err) => {
      console.log('err', err);
    })
  };

  const viewCanceledCO = (event) => {

    axios.put(`http://localhost:3001/notifications/canceledCO`).then((response) => {

      window.location.reload();
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

  if (editedOrders.length > 0) {
    var editedOrdersCnt = 1;
  }
  else {
    var editedOrdersCnt = 0;
  }

  if (deletedOrders.length > 0) {
    var deletedOrdersCnt = 1;
  }
  else {
    var deletedOrdersCnt = 0;
  }

  if (placedOrders.length > 0) {
    var placedOrdersCnt = 1;
  }
  else {
    var placedOrdersCnt = 0;
  }

  if (bankDeposits.length > 0) {
    var bankDepositsCnt = 1;
  }
  else {
    var bankDepositsCnt = 0;
  }

  if (listOfContactUs.length != listOfUnsolvedInquiries.length) {
    var UnsolvedValue = 1;
  }


  if (pendingCO.length > 0) {
    var pendingCOCnt = 1;
  }
  else {
    var pendingCOCnt = 0;
  }

  if (recievedCO.length > 0) {
    var recievedCOCnt = 1;
  }
  else {
    var recievedCOCnt = 0;
  }

  if (advancepaidCO.length > 0) {
    var advancepaidCOCnt = 1;
  }
  else {
    var advancepaidCOCnt = 0;
  }

  if (paidCO.length > 0) {
    var paidCOCnt = 1;
  }
  else {
    var paidCOCnt = 0;
  }

  if (canceledCO.length > 0) {
    var canceledCOCnt = 1;
  }
  else {
    var canceledCOCnt = 0;
  }

  return (

    <>
      <IconButton
        aria-controls='Messages'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'>
        {/* <Badge badgeContent={(listOfContactUs.length + listOfContactUs.length)} color='secondary'> */}

        <Badge badgeContent={ContactUsValue + UnsolvedValue + reOrderLevel.length + offerDate.length + editedOrdersCnt + placedOrdersCnt + deletedOrdersCnt + bankDepositsCnt + pendingCOCnt + recievedCOCnt + advancepaidCOCnt + paidCOCnt + canceledCOCnt} color='secondary'>

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
        <List dense={true} className={classes.dropdownlist} style={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>


          <div className={ContactUsValue != 0 ? classes.activeNotifi : classes.notifi} >

            {/* new inquiry */}
            <ListItem


              // key={i}
              component={Button}
              onClick={viewInquiries}
              component={Link} to="/inquiries"
              className={classes.listItemNotification}>
                 <ListItemAvatar>
                 <Avatar className={classes.green}>
  <AssignmentIcon />
 
</Avatar>
        </ListItemAvatar>
        <ListItemText>
              <Typography className={ContactUsValue != 0 && listOfContactUs.length != 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >You have {(listOfContactUs.length)} new inquiries </Typography>
              <Typography className={ContactUsValue != 0 && listOfContactUs.length == 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >You have {(listOfContactUs.length)} new inquiry </Typography>
              </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>


          <div className={UnsolvedValue != 0 ? classes.activeNotifi : classes.notifi}>

            {/* to be resolved */}
            <ListItem
              // key={i}
              component={Button}
              onClick={viewInquiries}
              component={Link} to="/inquiries"
              className={classes.listItemNotification}>
                              <ListItemAvatar>
                 <Avatar className={classes.red}>
 
  <WarningIcon/>
</Avatar>
</ListItemAvatar>      
        <Typography className={UnsolvedValue == 1 && listOfUnsolvedInquiries.length != 0 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >You have{(listOfUnsolvedInquiries.length)} more inquiries to resolve </Typography>

            </ListItem>
            <Divider variant="inset" component="li" />
          </div>


          <div className={reOrderLevel.length != 0 ? classes.activeNotifi : classes.notifi}>
            
            {/* reorder level notifications */}

            <ListItem
              // key={i}
              component={Button}
              component={Link} to="/inventory"
              className={classes.listItemNotification}>
                               <ListItemAvatar>
                 <Avatar className={classes.red}>
 
  <WarningIcon/>
</Avatar>
</ListItemAvatar>     

              {/* <Typography variant="h8" component="div" whiteSpace="normal" >Refill Inventory Id:{value.id} from Inventory </Typography> */}
              <Typography className={reOrderLevel.length != 0 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >You have {(reOrderLevel.length)} inventory items to refill </Typography>


            </ListItem>
            <Divider variant="inset" component="li" />
          </div>


          <div className={editedOrders.length != 0 ? classes.activeNotifi : classes.notifi}>
            {/* edited orders notifications */}
            <ListItem
              // key={i}
           
              component={Button}
              onClick={viewEditedOrders}
              component={Link} to="/AdminOrders/0"
              className={classes.listItemNotification}>
                 <ListItemAvatar>
                 <Avatar className={classes.green}>
  <AssignmentIcon />
</Avatar>
        </ListItemAvatar>
              <Typography className={editedOrdersCnt != 0 && editedOrders.length != 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" > {(editedOrders.length)} orders are edited</Typography>
              <Typography className={editedOrdersCnt != 0 && editedOrders.length == 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >{(editedOrders.length)} order is edited</Typography>

            </ListItem>
            <Divider variant="inset" component="li" />
          </div>


          <div className={deletedOrders.length != 0 ? classes.activeNotifi : classes.notifi}>
            {/* deleted orders notifications */}
            <ListItem
              // key={i}
            
              component={Button}
              onClick={viewDeletedOrders}
              component={Link} to="/AdminOrders/0"
              className={classes.listItemNotification}>
                 <ListItemAvatar>
                 <Avatar className={classes.green}>
  <AssignmentIcon />
</Avatar>
        </ListItemAvatar>
              <Typography className={deletedOrdersCnt != 0 && deletedOrders.length != 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" > {(deletedOrders.length)} orders are deleted</Typography>
              <Typography className={deletedOrdersCnt != 0 && deletedOrders.length == 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >{(deletedOrders.length)} order is deleted</Typography>

            </ListItem>
            <Divider variant="inset" component="li" />
          </div>


          <div className={placedOrders.length != 0 ? classes.activeNotifi : classes.notifi}>
            {/* placed orders notifications */}
            <ListItem
              // key={i}
             
              component={Button}
              onClick={viewPlacedOrders}
              component={Link} to="/AdminOrders/0"
              className={classes.listItemNotification}>
                  <ListItemAvatar>
                 <Avatar className={classes.green}>
  <AssignmentIcon />
</Avatar>
        </ListItemAvatar>
              <Typography className={placedOrdersCnt != 0 && placedOrders.length != 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" > {(placedOrders.length)} orders are placed</Typography>
              <Typography className={placedOrdersCnt != 0 && placedOrders.length == 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >{(placedOrders.length)} order is placed</Typography>

            </ListItem>
            <Divider variant="inset" component="li" />
          </div>


          <div className={bankDeposits.length != 0 ? classes.activeNotifi : classes.notifi}>
            {/* bank deposits notifications */}
            <ListItem
              // key={i}
             
              component={Button}
              onClick={viewBankDeposits}
              component={Link} to="/depositlips"
              className={classes.listItemNotification}>
                 <ListItemAvatar>
                 <Avatar className={classes.green}>
  <AssignmentIcon />
</Avatar>
        </ListItemAvatar>
              <Typography className={bankDepositsCnt != 0 && bankDeposits.length != 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" > {(bankDeposits.length)} New Bank deposits</Typography>
              <Typography className={bankDepositsCnt != 0 && bankDeposits.length == 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >{(bankDeposits.length)} new bank deposit</Typography>

            </ListItem>
            <Divider variant="inset" component="li" />
          </div>


          <div className={pendingCO.length != 0 ? classes.activeNotifi : classes.notifi}>
            {/* pending customize orders notifications */}
            <ListItem
              // key={i}
            
              component={Button}
              onClick={viewPendingCO}
              component={Link} to="/customizeOrders"
              className={classes.listItemNotification}>
                 <ListItemAvatar>
                 <Avatar className={classes.green}>
  <AssignmentIcon />
</Avatar>
        </ListItemAvatar>
              <Typography className={pendingCOCnt != 0 && pendingCO.length != 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" > {(pendingCO.length)} customize orders are pending</Typography>
              <Typography className={pendingCOCnt != 0 && pendingCO.length == 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >{(pendingCO.length)} customize order is pending</Typography>

            </ListItem>
            <Divider variant="inset" component="li" />
          </div>


          <div className={recievedCO.length != 0 ? classes.activeNotifi : classes.notifi}>
            {/* recieved customize orders notifications */}
            <ListItem
              // key={i}
            
              component={Button}
              onClick={viewRecievedCO}
              component={Link} to="/customizeOrders"
              className={classes.listItemNotification}>
                <ListItemAvatar>
                 <Avatar className={classes.green}>
  <AssignmentIcon />
</Avatar>
        </ListItemAvatar>
              <Typography className={recievedCOCnt != 0 && recievedCO.length != 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" > {(recievedCO.length)} customize orders are recieved</Typography>
              <Typography className={recievedCOCnt != 0 && recievedCO.length == 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >{(recievedCO.length)} customize order is recieved</Typography>

            </ListItem>
            <Divider variant="inset" component="li" />
          </div>


          <div className={advancepaidCO.length != 0 ? classes.activeNotifi : classes.notifi}>
            {/* advance paid customize orders notifications */}
            <ListItem
              // key={i}
            
              component={Button}
              onClick={viewAdvancePaidCO}
              component={Link} to="/customizeOrders"
              className={classes.listItemNotification}>
                 <ListItemAvatar>
                 <Avatar className={classes.green}>
  <AssignmentIcon />
</Avatar>
        </ListItemAvatar>
              <Typography className={advancepaidCOCnt != 0 && advancepaidCO.length != 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" > {(advancepaidCO.length)} customize orders are paid the advance</Typography>
              <Typography className={advancepaidCOCnt != 0 && advancepaidCO.length == 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >{(advancepaidCO.length)} customize order is paid the advance</Typography>

            </ListItem>
            <Divider variant="inset" component="li" />
          </div>


          <div className={paidCO.length != 0 ? classes.activeNotifi : classes.notifi}>
            {/*  paid customize orders notifications */}
            <ListItem
              // key={i}
        
              component={Button}
              onClick={viewPaidCO}
              component={Link} to="/customizeOrders"
              className={classes.listItemNotification}>
                <ListItemAvatar>
                 <Avatar className={classes.green}>
  <AssignmentIcon />
</Avatar>
        </ListItemAvatar>
              <Typography className={paidCOCnt != 0 && paidCO.length != 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" > {(paidCO.length)} customize orders are paid </Typography>
              <Typography className={paidCOCnt != 0 && paidCO.length == 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >{(paidCO.length)} customize order is paid</Typography>

            </ListItem>
            <Divider variant="inset" component="li" />
          </div>


          <div className={canceledCO.length != 0 ? classes.activeNotifi : classes.notifi}>
            {/*  canceled customize orders notifications */}
            <ListItem
              // key={i}
            
              component={Button}
              onClick={viewCanceledCO}
              component={Link} to="/customizeOrders"
              className={classes.listItemNotification}>
                 <ListItemAvatar>
                 <Avatar className={classes.green}>
  <AssignmentIcon />
</Avatar>
        </ListItemAvatar>
              <Typography className={canceledCOCnt != 0 && canceledCO.length != 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" > {(canceledCO.length)} customize orders are canceled </Typography>
              <Typography className={canceledCOCnt != 0 && canceledCO.length == 1 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >{(canceledCO.length)} customize order is canceled</Typography>

            </ListItem>
            <Divider variant="inset" component="li" />
          </div>


          <div  className={offerDate.length != 0 ? classes.activeNotifi : classes.notifi}>
            {/* expired offer date notifications */}
            {offerDate
              .map((value) => {
                return (
                  <ListItem
                    // key={i}
                   
                    className={offerDate.length != 0 ? classes.activeNotifi : classes.notifi}
                    component={Button}
                    component={Link} to="/offers"
                    className={classes.listItemNotification}>
                                    <ListItemAvatar>
                 <Avatar className={classes.red}>
 
  <WarningIcon/>
</Avatar>
</ListItemAvatar>     

                    <Typography variant="h8" component="div" whiteSpace="normal" > {value.collection_name} offer is expired from {value.to} </Typography>


                  </ListItem>

                );
              })}
            <Divider variant="inset" component="li" />
          </div>



          {/* no new notifications */}
          <div className={(ContactUsValue + UnsolvedValue + reOrderLevel.length + offerDate.length + editedOrdersCnt + placedOrdersCnt + deletedOrdersCnt + bankDepositsCnt + pendingCOCnt + recievedCOCnt + advancepaidCOCnt + paidCOCnt + canceledCOCnt) == 0 ? classes.activeNotifi : classes.notifi} >

            <ListItem

              component={Button}
              onClick={handleClose}
              className={classes.listItemNotification}>
              
              <Typography className={(ContactUsValue + UnsolvedValue + reOrderLevel.length + offerDate.length + editedOrdersCnt + placedOrdersCnt + deletedOrdersCnt + bankDepositsCnt + pendingCOCnt + recievedCOCnt + advancepaidCOCnt + paidCOCnt + canceledCOCnt) == 0 ? classes.activeNotifi : classes.notifi} variant="h8" component="div" whiteSpace="normal" >No new Notifications </Typography>


            </ListItem>
            <Divider variant="inset" component="li" />
          </div>


        </List>
      </Menu>
    </>
  );

}
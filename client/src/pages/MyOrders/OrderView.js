import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { Button, CssBaseline, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import StepLabel from '@material-ui/core/StepLabel';
import { useParams } from 'react-router';
import axios from 'axios';
import UserNav from '../../components/Navbars/UserNav';
import Footer from '../../components/Footer/Footer';
import useStyles from './style';
import Popup from "../../components/Reusable/Popup";
import Controls from "../../components/Reusable/Controls";
import { useHistory } from 'react-router-dom';
import { MASTER_DATA } from '../../_constants/globalVariable';
import { setPayment } from '../Checkout/payment';
import moment from 'moment';

// const status='pending';



function getSteps() {
  return ['Pending', 'Accept', 'Advance Paid', 'Printing', 'Printed', 'Dispatched', 'Recieved'];
}


export default function OrderView() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderDetails, setorderDetails] = useState({})
  const [disable, setDisable] = React.useState(false);
  const [count, setcount] = useState(1)
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupEditDesign, setOpenEditDesignPopup] = useState(false);
  const [price, setprice] = useState('')
  const steps = getSteps();
  let { id } = useParams();
  let history = useHistory();
  let paymentItem;

  // console.log(status)

  useEffect(() => {
    handleNext();

    console.log(id)
    axios.get('http://localhost:3001/customizeOrders/customizeDesign/' + id).then((response) => {
      // console.log(response.data);
      setorderDetails(response.data);
    })
  }, []);
  console.log('hii')
  console.log(id)
  console.log('hii')

  const openInPopup = (item) => {
    setOpenPopup(true);
  };
  var uid = localStorage.getItem("userId");
  console.log('tttt')
  console.log(uid)

  const placeOrders = () => {
    setOpenPopup(false);


    if (uid != '0') {
      paymentItem = createPaymentDetails(MASTER_DATA.payhere, uid, price);
      let payment = setPayment(paymentItem);
      window.payhere.startPayment(payment);

    }



  };

  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    history.push(`/orderView/${id}`);

    const data = {
      id: id,
      price: price
    }

    axios.put('http://localhost:3001/customizeOrders/advancePaid/', data).then((response) => {
      console.log(response.data);
      alert('Successsfully Paid Advance')
      // setlistOfOrderDetails(response.data);
    })

    axios.get('http://localhost:3001/customizeOrders/customizeDesign/' + id).then((response) => {
      // console.log(response.data);
      setorderDetails(response.data);
    })
    // dispatch(actionSendToDB(paymentItem))
    //Note: validate the payment and show success or failure page to the customer
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:" + error);
  };

  const createPaymentDetails = (pm, uid, status,) => {
    console.log(price)
    let orderId = new Date().getTime();
    var date = moment().format();
    var address = "";

    const item = {
      userId: uid,
      orderId: orderId,
      totalAmount: price,
      payment: 'pm',
      status: 'status',
      placedDate: date,
      name: 'thash',
    }
    return item;
  }

  function onProceed() {
    var id = localStorage.getItem("userId");
    if (id > 0) {
      history.push('/Checkout');
    }
    else {
      localStorage.setItem("fromTheCart", true);
      history.push('/auth');
    }
  }

  const handleNext = (count) => {
    setActiveStep((prevActiveStep) => prevActiveStep + count)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <UserNav />
      <CssBaseline />
      <div className={classes.root}>

        <center>
          <div>
            {orderDetails &&

              <div className={classes.stepperContainer}>
                <Typography variant="h4">Order Summery</Typography>


                <Stepper style={{ backgroundColor: '#ebf9fd' }} activeStep={orderDetails.status === 'Pending' ? 1 : orderDetails.status === 'Accept' ? 2 : orderDetails.status === 'Advance Paid' ? 3 : orderDetails.status === 'Printing' ? 4 : orderDetails.status === 'Printed' ? 5 : orderDetails.status === 'Dispatched' ? 6 : null} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Box><img height={200} align="center" src={'http://localhost:3001/' + orderDetails.image} alt=""></img></Box>

                <Box style={{ display: 'flex', justifyContent: 'space-between', width: '50%', margin: '5px' }}>
                  <Typography>Order ID</Typography>
                  <Typography>{orderDetails.orderId}</Typography>
                </Box>

                <Box style={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
                  <Typography>Price</Typography>
                  <Typography>{"LKR " + orderDetails.price}</Typography>
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>

                  <Button color="primary"
                    className={orderDetails.status === 'Accept' ? classes.activeQuantity : classes.quantity}
                    disabled={disable}
                    style={{ backgroundColor: 'green', color: 'white', margin: '20px' }}

                    onClick={() => {
                      setDisable(true)
                      setOpenPopup(true);
                      setprice(orderDetails.price / 2)
                    }}
                  >
                    CONFIRM ORDER
                  </Button>

                  <Button color="primary"
                    disabled={disable}
                    style={{ backgroundColor: 'red', color: 'white', margin: '20px' }}
                    className={orderDetails.status === 'Accept' ? classes.activeQuantity : classes.quantity}

                    onClick={() => {
                      setDisable(true)
                      setOpenPopup(true);
                    }}
                  >
                    REJECT ORDER
                  </Button>
                  <Button
                  style={{ backgroundColor: 'black', color: 'white', margin: '20px' }}
                  className={orderDetails.status === 'Pending' ? classes.activeQuantity : orderDetails.status === 'Accept' ? classes.activeQuantity : orderDetails.status === 'Printing' ? classes.activeQuantity : classes.quantity}
                  onClick={() => {
                    setOpenEditDesignPopup(true);
                  }}
                  >
                    Edit Design
                  </Button>
                  <Box>
                    <Box style={{fontSize:'18px',padding:'10px', margin:'10px'}}>Order is ready to dispatch</Box>
                    <Box style={{color:'red'}}>Make the rest payment to disptache order to your door step</Box>
                    <Button
                  style={{ backgroundColor: 'black', color: 'white', margin: '20px' }}
                  className={orderDetails.status === 'Printed' ? classes.activeQuantity : classes.quantity}
                  onClick={onProceed}
                  >
                    Proceed to Checkout
                  </Button>
                  </Box>

                </Box>

                <Popup
                  title="Send the Estimated Price"
                  openPopup={openPopup}
                  setOpenPopup={setOpenPopup}
                >
                  <Grid item xs={4}>
                    <Typography>You Have to make 50% of your full amount to confirm your order</Typography>
                    <Typography>Your payment</Typography>

                    <Typography>{orderDetails.price / 2}</Typography>

                  </Grid>
                  <Grid item md={12} >
                    <Controls.Button
                      onClick={() => {

                        placeOrders()
                        // 
                      }}

                      // onClick={placeOrders}
                      type="submit"
                      text="Checkout"
                    // onClick={() => {
                    //     history.push('/Checkout');
                    // }}
                    />
                  </Grid>
                </Popup>

                <Popup
                  title="Contact Us to edit your Design"
                  openPopup={openPopupEditDesign}
                  setOpenPopup={setOpenEditDesignPopup}
                  style={{fontColor:'red'}}
                >
                  <Grid >
                    <Box style={{fontSize:'20px', margin:'10px', color:'red', textAlign:'center'}}>011-2345678</Box>

                  </Grid>
                  <Grid item md={12} >
                    <Controls.Button
                      onClick={() => {

                        setOpenEditDesignPopup(false)
                        // 
                      }}

                      // onClick={placeOrders}
                      type="submit"
                      text="OK"
                    // onClick={() => {
                    //     history.push('/Checkout');
                    // }}
                    />
                  </Grid>
                </Popup>



              </div>

            }
          </div>
        </center>
      </div>
      <Footer />
    </div>
  );
}



// export default function OrderView() { 

//   return (
//     <div>
//       <CssBaseline />
//       <CommonNav />





//       <Footer />
//     </div>
//   );
// };

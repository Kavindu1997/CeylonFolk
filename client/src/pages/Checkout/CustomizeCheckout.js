import React from 'react';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import { CssBaseline, Button, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Radio, RadioGroup, FormControl, Checkbox, TextareaAutosize, useScrollTrigger } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useStyles from './style';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { setPayment } from './payment';
import { GLOBAL_URLS } from '../../_constants/globalVariable';
import { useDispatch, useSelector } from "react-redux";
import { actionGetCustomerDetails, actionSendToDB, actionGetDistricts } from '../../_actions/checkout.action';
import { getCart, getTotal } from '../../_actions';
import { MASTER_DATA } from '../../_constants/globalVariable';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Notification from '../../components/Reusable/Notification';
import { useParams } from 'react-router';

function onLinkClick(event) {
    console.log('onLinkClick'); // never called
}

export default function CustomizeCheckout() {
    let history = useHistory();
    const classes = useStyles();
    let { id } = useParams();

    const dispatch = useDispatch();

    const [cutomerAddress1, setOfAddress1] = useState([]);
    const [cutomerAddress2, setOfAddress2] = useState([]);
    const [cutomerAddress3, setOfAddress3] = useState([]);
    const [cutomerPhoneNumber, setOfPhoneNumber] = useState([]);
    const [cutomerDeliveryAdd, setOfDeliveryAdd] = useState([]);
    const [isDeliveryDiffAdd, setIsDiffDeliveryAdd] = useState([]);
    const [customerEmail, setCustomerEmail] = useState([]);
    const [checkedTermsCondition, setCheckedTermsCondition] = useState([]);
    const [customerName, setCustomerName] = useState([]);
    const [value, setValue] = React.useState('payment');
    let paymentItem;
    const customerDetails = useSelector((state) => state.checkout.detail)
    const deliveryDetails = useSelector((state) => state.checkout.delivery)
    const totalDetails = useSelector(state => state.cart.totalAmount)
    const [districtvalue, setDistrict] = useState([]);
    const [districtNameValue, setDistrictNameValue] = useState([]);

    const [add1Error,setAdd1Error] = useState(false);
    const [add2Error,setAdd2Error] = useState(false);
    const [price,setPrice] = useState(false);
    const [cityError,setCityError] = useState(false);
    const [orderDetails, setorderDetails] = useState({})
    const [districtError,setDistrictError] = useState(false);
    const [specialNote,setSpecialNote] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  
    const getDistrictValue = (event) => {
        setDistrictNameValue(event.target.value)
        console.log(event.target.value);
        

        for(let i=0; i<deliveryDetails.length-1 ; i++){
            if(deliveryDetails[i].id === event.target.value){
                setDistrict(deliveryDetails[i].deliveryCharge)  
                console.log(deliveryDetails[i])
            }
        }
        console.log(districtvalue)

    };


    useEffect(() => {
        dispatch(actionGetCustomerDetails())
        dispatch(getCart())
        dispatch(getTotal())
        dispatch(actionGetDistricts())
        axios.get('http://localhost:3001/customizeOrders/customizeDesign/' + id).then((response) => {
      // console.log(response.data);
      setorderDetails(response.data);
    })
    }, []);



    const setAddress1 = (event) => {
        setOfAddress1(event.target.value)
    }
    const setAddress2 = (event) => {
        setOfAddress2(event.target.value)
    }
    const setAddress3 = (event) => {
        setOfAddress3(event.target.value)
    }
    const setPhoneNumber = (event) => {
        setOfPhoneNumber(event.target.value)
    }
    const setDeliveryAdd = (event) => {
        setOfDeliveryAdd(event.target.value)
    }
    const checkButton = (event) => {
        setIsDiffDeliveryAdd(event.target.checked)
    }
    
    const checkedTerms = (event) => {
        setCheckedTermsCondition(event.target.checked)
    }
    const setEmail = (event) => {
        setCustomerEmail(event.target.value);
    }
    const setName = (event) => {
        setCustomerName(event.target.value);
        console.log(event.target.value)
        console.log(customerName)
        console.log(customerDetails[0].firstName)
        console.log(customerDetails[0].email)
    }

    const setNote = (event) => {
        setSpecialNote(event.target.value)
    }

    function validateFormFields(){
        var hasError=0
       if (cutomerAddress1.length==0){
        setAdd1Error(true)
        hasError=1
       }else{
        setAdd1Error(false) 
       }
       if(cutomerAddress2.length==0){
        setAdd2Error(true)
        hasError=1
       }else{
        setAdd2Error(false) 
       }
       if(cutomerAddress3.length==0){
        setCityError(true)
        hasError=1
       }else{
        setCityError(false) 
       }
       if(districtNameValue.length==0){
        setDistrictError(true)
        hasError=1
       }else{
        setDistrictError(false)
       }
       return hasError;
    }

    const placeOrders = (price) => {
        setPrice(price)
        const hasError = validateFormFields()
        if(hasError == 1){
            setNotify({
                isOpen: true,
                message: 'Please fill the required fileds !',
                type: 'error'
              });
            return
           
        }
        var uid = localStorage.getItem("userId");
        if (uid != '0' && checkedTermsCondition == true) {
            
                paymentItem = createPaymentDetails(MASTER_DATA.payhere, uid, MASTER_DATA.placed);
                let payment = setPayment(paymentItem);
                window.payhere.startPayment(payment);
            
        }else{
            setNotify({
                isOpen: true,
                message: 'Please agree to the Terms & Conditions !',
                type: 'error'
              });
        }
    };

    const createPaymentDetails = (pm, uid, status) => {
        let orderId = new Date().getTime();
        var date = moment().format();
        var total = Number(price) + Number(districtvalue) + Number(price);
        var totalAmount = Number(price) + Number(price) + Number(districtvalue);
        var address = "";
        if (isDeliveryDiffAdd != true) {
            address = cutomerAddress1 + ' ' + cutomerAddress2 + ' ' + cutomerAddress3;
        } else {
            address = cutomerDeliveryAdd;
        }
        const item = {
            userId: uid,
            orderId: orderId,
            totalAmount: total,
            payment: 'pm',
            status: 'status',
            // itemArray: itemDetails,
            delivery: address,
            placedDate: date,
            
        }
        return item;
    }

    window.payhere.onCompleted = function onCompleted(orderId) {
        var date = moment().format();

        var address = "";
        if (isDeliveryDiffAdd != true) {
            address = cutomerAddress1 + ' ' + cutomerAddress2 + ' ' + cutomerAddress3;
        } else {
            address = cutomerDeliveryAdd;
        }

        const data = {
            id: id,
            totalAmount: Number(price) + Number(districtvalue) + Number(price),
            delivery: address,
            placedDate: date
          }

          axios.put('http://localhost:3001/customizeOrders/orderPaid/',data).then((response) => {
            // console.log(response.data);
            alert('Paid')
            // setlistOfOrderDetails(response.data);
        })


        console.log("Payment completed. OrderID:" + orderId);
        history.push(`/orderView/${id}`);
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


    return (
        <div>
            <CommonNav />
            <CssBaseline />
            <container>
                <CssBaseline />
                <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> CHECKOUT</Typography>
                <center>
                    <Grid container style={{ marginTop: '50px', align: 'center' }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', textAlign: 'center' }}>Billing Details</Typography>
                            {/* <Formik initialValues={initialRegValues} validationSchema={regValidation}> */}
                          
                            {customerDetails
                                .map((value) => {
                                    return (

                                        <form className={classes.form} noValidate key={value.customerId}>
                                            <TextField
                                                onChange={setName}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="name"
                                                label="Your Name"
                                                name="name"
                                                defaultValue={value.firstName + " "+ value.lastName} 
                                                autoComplete="name"
                                                autoFocus
                                                InputProps={{
                                                    readOnly: true,
                                                  }}
                                            />
                                            <TextField
                                                onChange={setEmail}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                defaultValue={value.email}
                                                type="email"
                                                autoComplete="email"
                                                InputProps={{
                                                    readOnly: true,
                                                  }}
                                            />
                                            <TextField
                                                onChange={setPhoneNumber}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="number"
                                                label="Phone Number(for delivery)"
                                                name="number"
                                                defaultValue={value.contactNo}
                                                autoComplete="number"
                                                InputProps={{
                                                    readOnly: true,
                                                  }}
                                            />
                                            <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', marginTop:'20px', marginBottom: '10px' }}>Delivery Address Details</Typography>
                                            <TextField
                                                onChange={setAddress1}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="add1"
                                                label="Address Line 1"
                                                name="add1"
                                                defaultValue={value.addLine1}
                                                autoComplete="add1"
                                                error={add1Error}
                                            />
                                            <TextField
                                                onChange={setAddress2}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="add2"
                                                label="Address Line 2"
                                                name="add2"
                                                defaultValue={value.addLine2}
                                                error={add2Error}
                                                
                                            />
                                            <TextField
                                                onChange={setAddress3}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="city"
                                                label="City"
                                                name="city"
                                                defaultValue={value.city}
                                                autoComplete="city"
                                                error={cityError}
                                            />
                                            <FormControl required variant="outlined" className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-outlined-label" >Delivery District</InputLabel>
                                                <Select
                                                    error={districtError}
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    value={districtNameValue}
                                                    onChange={getDistrictValue}
                                                    label="Delivery District"
                                                >
                                                    {deliveryDetails
                                                        .map((value, index) => {
                                                            return (
                                                                <MenuItem

                                                                    value={value.id}>{value.decription}

                                                                </MenuItem>
                                                            );
                                                        })}
                                                </Select>
                                            </FormControl>

                                            {/* <FormControlLabel
                                                control={<Checkbox onClick={checkButton} value="yes" color="primary" />}
                                                label="Deliver to a different address"
                                                style={{ float: 'left' }} />
                                            <div id="addressNew">
                                                <TextareaAutosize onChange={setDeliveryAdd} aria-label="minimum height" placeholder="Shipping Address" style={{ width: '480px', height: '60px', textAlign: 'justify', padding: '15px', fontFamily: 'Montserrat', marginTop: '10px', borderRadius: '5px' }} />
                                            </div> */}
                                            
                                            
                                        </form>
                                        

                                    );
                                })}
                             {/* </Formik> */}
                            



                        </Grid>
                        {orderDetails &&
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', textAlign: 'center' }}>Order Summery</Typography>
                            <TableContainer style={{ marginTop: '30px' }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Design</TableCell>
                                            <TableCell align="left" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    
                                                    <TableRow >
                                                        <TableCell align="left" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + orderDetails.image} alt=""></img></TableCell>
                                                        
                                                        <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat' }}>Rs. {orderDetails.price}</TableCell>
                                                    </TableRow>
                                                
                                            

                                        {/* <TableRow>
                                            <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, height: '60px' }}>
                                                Sub Total
                                            </TableCell>
                                            <TableCell align="left" style={{ fontFamily: 'Montserrat' }}>
                                                Rs.{orderDetails.price}
                                            </TableCell>
                                        </TableRow> */}

                                        <TableRow>
                                            <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, height: '60px' }}>
                                                Shipping
                                            </TableCell>
                                            <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat' }}>
                                                Rs. {districtvalue}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, height: '60px' }}>
                                                Total
                                            </TableCell>
                                            <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                                                Rs. {Number(orderDetails.price) + (districtvalue)}
                                            </TableCell>
                                        </TableRow>

                                        
                                    </TableBody>
                                </Table>
                                <FormControlLabel
                                    control={<Checkbox onChange={checkedTerms} value="accept" color="primary" />}
                                    label={
                                        <span>I have read and agree to the&nbsp;
                                            <a
                                                href="/Termnconditions"
                                                // target="_blank"
                                                onClick={onLinkClick}
                                            >
                                                Terms and Conditions
                                            </a>
                                        </span>

                                    }
                                    // label="I've read and accept terms and conditions*"
                                    style={{ float: 'left', marginLeft: '30px', marginTop: '10px' }} />
                            </TableContainer>
                            <div>
                                <center>
                                    <Button
                                        onClick={() =>{placeOrders(orderDetails.price)}}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        id="placeOrder"
                                        className={classes.submit}
                                    >Checkout
                                    </Button>
                                </center>
                            </div>
                        </Grid>
}


                    </Grid>
                </center>
            </container>
            <Footer />
            <Notification
        notify={notify}
        setNotify={setNotify}
      />
        </div>

    );
}

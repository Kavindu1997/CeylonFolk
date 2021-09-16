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
import { actionGetCustomerDetails, actionSendToDB, actionGetDistricts, actionDeleteItem } from '../../_actions/checkout.action';
import { getCart, getTotal } from '../../_actions';
import { MASTER_DATA } from '../../_constants/globalVariable';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Notification from '../../components/Reusable/Notification';
import ceylonforkapi from '../../api/index'

function onLinkClick(event) {
    console.log('onLinkClick'); // never called
}

export default function Checkout() {
    let history = useHistory();
    const classes = useStyles();

    const dispatch = useDispatch();

    const [cutomerAddress1, setOfAddress1] = useState([]);
    const [cutomerAddress2, setOfAddress2] = useState([]);
    const [cutomerAddress3, setOfAddress3] = useState([]);
    const [cutomerPhoneNumber, setOfPhoneNumber] = useState([]);
    const [cutomerDeliveryAdd, setOfDeliveryAdd] = useState([]);
    const [isDeliveryDiffAdd, setIsDiffDeliveryAdd] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [customerEmail, setCustomerEmail] = useState([]);
    const [checkedTermsCondition, setCheckedTermsCondition] = useState([]);
    const [customerName, setCustomerName] = useState([]);
    const [value, setValue] = React.useState('payment');
    let paymentItem;
    const customerDetails = useSelector((state) => state.checkout.detail)
    const deliveryDetails = useSelector((state) => state.checkout.delivery)
    const itemDetails = useSelector((state) => state.cart.cart)
    const totalDetails = useSelector(state => state.cart.totalAmount)
    const [districtvalue, setDistrict] = useState([]);
    const [districtNameValue, setDistrictNameValue] = useState([]);
    const [specialNote,setSpecialNote] = useState([]);

    const [add1Error,setAdd1Error] = useState(false);
    const [add2Error,setAdd2Error] = useState(false);
    const [cityError,setCityError] = useState(false);
    const [districtError,setDistrictError] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const errorMsg = useSelector(state => state.checkout.error);
    const [disableButton, setDisableButton] = useState(false);
    const [customerCoupon, getCustomerCoupon] = useState([]);
  
    const getDistrictValue = (event) => {
        setDistrictNameValue(event.target.value)
        if(districtError && districtNameValue != undefined){
            setDistrictError(false)
        }

        for(let i=0; i<deliveryDetails.length-1 ; i++){
            if(deliveryDetails[i].id === event.target.value){
                setDistrict(deliveryDetails[i].deliveryCharge)  
            }
        }

    };


    useEffect(() => {
        dispatch(actionGetCustomerDetails())
        dispatch(getCart())
        dispatch(getTotal())
        dispatch(actionGetDistricts())
    }, []);



    const setAddress1 = (event) => {
        setOfAddress1(event.target.value)
        if(add1Error && cutomerAddress1 != undefined){
            setAdd1Error(false)
        }
    }
    const setAddress2 = (event) => {
        setOfAddress2(event.target.value)
        if(add2Error && cutomerAddress2 != undefined){
            setAdd2Error(false)
        }
    }
    const setAddress3 = (event) => {
        setOfAddress3(event.target.value)
        if(cityError && cutomerAddress3 != undefined){
            setCityError(false)
        }
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
    const radioButtonChange = (event) => {
        setValue(event.target.value);
        setPaymentMethod(event.target.value);
    }
    const checkedTerms = (event) => {
        setCheckedTermsCondition(event.target.checked)
    }
    const setEmail = (event) => {
        setCustomerEmail(event.target.value);
    }
    const setName = (event) => {
        setCustomerName(event.target.value);
       
    }
    const setNote = (event) => {
        setSpecialNote(event.target.value)
    }
    const couponName = (event) => {
        getCustomerCoupon(event.target.value)
        console.log(customerCoupon)
    }

    const [validCoupon, setValidCoupon] = useState([])
    function applyCoupon(){
        console.log(customerCoupon)
        var details = {
            couponName: customerCoupon,
            today: new Date(),
        }
        console.log(details)
        ceylonforkapi.post("/check/coupon/",details).then((response) => { 
            setValidCoupon(response.data)
        })
        console.log(validCoupon)

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

  

    const placeOrders = () => {
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
            if (paymentMethod == "cash") {
                paymentItem = createPaymentDetails(MASTER_DATA.cash_on_delivery, uid, MASTER_DATA.pending);
                ceylonforkapi.post("/check/cashOn/",paymentItem).then((response) => { 
                    if (response.data.data==0) {
                        setNotify({
                            isOpen: true,
                            message: 'Order is not successfully placed !',
                            type: 'error'
                          });
                    } else {
                        dispatch(actionDeleteItem(paymentItem))
                        setNotify({
                            isOpen: true,
                            message: 'Order successfully placed. Order details will be sent your email !',
                            type: 'success'
                          });
                          setDisableButton(true)
                          setTimeout(function(){
                            history.push("/myOrders")
                        }, 3000);
                           
                    }
                })
            } else if (paymentMethod == "bank") {
                paymentItem = createPaymentDetails(MASTER_DATA.bank_tranfer, uid, MASTER_DATA.not_uploaded);
                ceylonforkapi.post("/check/cashOn/",paymentItem).then((response) => { 
                    if (response.data.data==0) {
                        setNotify({
                            isOpen: true,
                            message: 'Order is not successfully placed !',
                            type: 'error'
                          });
                    } else {
                        dispatch(actionDeleteItem(paymentItem))
                        setNotify({
                            isOpen: true,
                            message: 'Order successfully placed. Order details will be sent your email !',
                            type: 'success'
                          });
                    }
                })
            } else if (paymentMethod == "online") {
                paymentItem = createPaymentDetails(MASTER_DATA.payhere, uid, MASTER_DATA.placed);
                let payment = setPayment(paymentItem);
                window.payhere.startPayment(payment);
            }else{
                setNotify({
                    isOpen: true,
                    message: 'Please select a payment method !',
                    type: 'error'
                  });
            }
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
        var total = Number(totalDetails) + Number(districtvalue);
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
            payment: pm,
            status: status,
            itemArray: itemDetails,
            delivery: address,
            placedDate: date,
            phoneNo: cutomerPhoneNumber == 0 ? customerDetails[0].contactNo : cutomerPhoneNumber,
            email: customerDetails[0].email,
            name:customerDetails[0].firstName + " " + customerDetails[0].lastName,
            paymentMethod: value,
            specialNote: specialNote
        }
        return item;
    }

    window.payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment completed. OrderID:" + orderId);
        history.push("/Checkout");
        ceylonforkapi.post("/check/cashOn/",paymentItem).then((response) => { 
                    if (response.data.data==0) {
                        setNotify({
                            isOpen: true,
                            message: 'Order is not successfully placed !',
                            type: 'error'
                          });
                    } else {
                        dispatch(actionDeleteItem(paymentItem))
                        setNotify({
                            isOpen: true,
                            message: 'Order successfully placed. Order details will be sent your email !',
                            type: 'success'
                          });
                          setTimeout(function(){
                            
                       }, 2000);
                          history.push("/myOrders")
                    }
                })
        
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
                                            <TextareaAutosize aria-label="minimum height" placeholder="Order Notes (optional)" onChange={setNote} style={{ width: '480px', height: '100px', textAlign: 'justify', padding: '15px', fontFamily: 'Montserrat', marginTop: '30px', borderRadius: '5px' }} />
                                            
                                        </form>
                                        

                                    );
                                })}
                             {/* </Formik> */}
                            



                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', textAlign: 'center' }}>Order Summery</Typography>
                            <TableContainer style={{ marginTop: '30px' }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Product</TableCell>
                                            <TableCell align="left" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {itemDetails
                                            .map((value, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell align="left" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + value.image} /></TableCell>
                                                        <TableCell align="left" style={{ fontFamily: 'Montserrat' }}>{value.name} x {value.quantity}</TableCell>
                                                        <TableCell align="left" style={{ fontFamily: 'Montserrat' }}>{value.size}</TableCell>
                                                        <TableCell align="left" style={{ fontFamily: 'Montserrat' }}>{value.totals}</TableCell>
                                                    </TableRow>
                                                );
                                            })}

                                        <TableRow>
                                            <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, height: '60px' }}>
                                                Sub Total
                                            </TableCell>
                                            <TableCell align="left" style={{ fontFamily: 'Montserrat' }}>
                                                Rs.{totalDetails}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, height: '60px' }}>
                                                Add Coupon
                                            </TableCell>
                                            <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat' }}>
                                            <TextField underlineShow={false} label="Coupon Name" style={{ width: 130, borderRadius: 25 }} onChange={couponName}/>
                                            <br />  <br />
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.coupon}
                                                onClick = {applyCoupon}
                                            >Apply Coupon
                                            </Button>
                                            </TableCell>
                                        </TableRow>

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
                                                Rs. {Number(totalDetails) + (districtvalue)}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', textAlign: 'left', marginTop: '15px', marginBottom: '10px', marginLeft: '30px' }}>Payment Method</Typography>
                                            <FormControl component="fieldset">
                                                {/* <FormLabel component="legend">Gender</FormLabel> */}
                                                <RadioGroup aria-label="payment" name="payment1" value={value} onChange={radioButtonChange} style={{ marginLeft: '20px' }}>
                                                    <FormControlLabel value="cash" control={<Radio />} label="Cash on delivery" />
                                                    <FormControlLabel value="bank" control={<Radio />} label="Bank Deposits" />
                                                    <div style={{marginLeft:'30px',color:'blue',display : paymentMethod==="bank"? 'block':'none'}}>
                                                    <Typography variant="h7">Account details will be sent to your email</Typography>
                                                    </div>
                                                    <FormControlLabel value="online" control={<Radio />} label="Pay online" />
                                                    <div>
                                                        <img height={50} src={require('../../images/paymentnew.png').default} />
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
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
                                        onClick={placeOrders}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        id="placeOrder"
                                        disabled = {disableButton}
                                        className={classes.submit}
                                    >Checkout
                                    </Button>
                                </center>
                            </div>
                        </Grid>


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

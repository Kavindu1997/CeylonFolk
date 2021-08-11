import React from 'react';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import { CssBaseline, Button, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Radio, RadioGroup, FormControl, Checkbox, TextareaAutosize, useScrollTrigger } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/styles';
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { useEffect, useState } from 'react';
import useStyles from './style';
import { useHistory } from 'react-router-dom';
import PaymentModal from '../../components/PaymentModal/PaymentModal';
import moment from 'moment';


function onLinkClick(event) {
    console.log('onLinkClick'); // never called
}

export default function Checkout() {
    let history = useHistory();
    const classes = useStyles();

    const [cutomerAddress1, setOfAddress1] = useState([]);
    const [cutomerAddress2, setOfAddress2] = useState([]);
    const [cutomerAddress3, setOfAddress3] = useState([]);
    const [cutomerPhoneNumber, setOfPhoneNumber] = useState([]);
    const [cutomerDeliveryAdd, setOfDeliveryAdd] = useState([]);
    const [isDeliveryDiffAdd, setIsDiffDeliveryAdd] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [checkedTermsCondition, setCheckedTermsCondition] = useState([]);
    const [customerDetails, setOfDetails] = useState([]);
    const [value, setValue] = React.useState('payment');
    
    useEffect(() => {
        var id = localStorage.getItem("userId");
        const url = "http://localhost:3001/check/customer/" + id;
        axios.get(url).then((response) => {
            console.log(response.data);
            setOfDetails(response.data);
            setOfPhoneNumber(response.data[0].contactNo)
            console.log(cutomerPhoneNumber)
        });
    }, []);

    const [itemDetails, setOfItems] = useState([]);
    useEffect(() => {
        var id = localStorage.getItem("userId");
        const url = "http://localhost:3001/check/items/" + id;
        axios.get(url).then((response) => {
            setOfItems(response.data);
            console.log(response.data)
        });

    }, []);

    const [totalDetails, setOftotals] = useState([]);
    useEffect(() => {
        var id = localStorage.getItem("userId");
        const url = "http://localhost:3001/check/total/" + id;
        axios.get(url).then((response) => {
            setOftotals(response.data);


        });
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
    const radioButtonChange = (event) => {
        setValue(event.target.value);
        setPaymentMethod(event.target.value);
        console.log(paymentMethod)
    }
    const checkedTerms = (event) => {
        setCheckedTermsCondition(event.target.checked)
        console.log(checkedTermsCondition)
    }

    const placeOrders = () => {
        var uid = localStorage.getItem("userId");
        if (uid != '0' && checkedTermsCondition==true) {
            console.log(checkedTermsCondition)
            if(paymentMethod == "cash"){
                sendToDB("cashOn Delivery",uid);    
            }else if(paymentMethod == "bank",uid){
                sendToDB("Bank Deposit");
            }else if(paymentMethod == "online"){
                history.push("/gateway");
                sendToDB("Online Payment",uid);

            }
        }else{
            alert("Please agree to the Terms and Conditions");
        }

    };

    const sendToDB = (pm,uid) => {
            console.log(uid)
            let orderId = new Date().getTime();
            var date = moment()
                .utcOffset('+05:30')
                .format('YYYY-MM-DD hh:mm:ss a');
            var total = Number(totalDetails[0].total) + 200;
            //let address = isDeliveryDiffAdd ? true : (cutomerAddress1+' '+cutomerAddress2+' '+cutomerAddress3) : cutomerDeliveryAdd
            var address = "";
            if(isDeliveryDiffAdd != true){
                address = cutomerAddress1+' '+cutomerAddress2+' '+cutomerAddress3;
            }else{
                address = cutomerDeliveryAdd;
            }
            console.log(address)
            const url = "http://localhost:3001/check/cashOn/"
            const dummyItem = { userId: uid, orderId: orderId, totalAmount: total, payment: pm, status: "placed", itemArray: itemDetails, delivery: address, placedDate: date, phoneNo: cutomerPhoneNumber }
            console.log(dummyItem)
            axios.post(url, dummyItem).then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    const url2 = "http://localhost:3001/check/deleteCart/"
                    axios.put(url2, dummyItem).then((response) => {
                        if (response.data.error) {
                            alert(response.data.error);
                        }
                    });
                    alert("Product successfully added to cart");
                    
                }
            });

    }


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

                            {customerDetails
                                .map((value) => {
                                    return (

                                        <form className={classes.form} noValidate key={value.customerId}>
                                            <TextField
                                               
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="name"
                                                label="Your Name"
                                                name="name"
                                                defaultValue={value.firstName}
                                                autoComplete="name"
                                                autoFocus
                                            />
                                            <TextField
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
                                            />
                                            <TextField
                                                onChange = {setPhoneNumber}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="number"
                                                label="Phone Number(for delivery)"
                                                name="number"
                                                defaultValue={value.contactNo}
                                                autoComplete="number"
                                            />
                                            <TextField
                                                onChange = {setAddress1}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="add1"
                                                label="Address Line 1"
                                                name="add1"
                                                defaultValue={value.addLine1}
                                                autoComplete="add1"
                                            />
                                            <TextField
                                                onChange = {setAddress2}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="add2"
                                                label="Address Line 2"
                                                name="add2"
                                                defaultValue={value.addLine2}
                                                autoComplete="add1"
                                            />
                                            <TextField
                                                onChange = {setAddress3}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="city"
                                                label="City"
                                                name="city"
                                                defaultValue={value.city}
                                                autoComplete="city"
                                            />

                                            <FormControlLabel
                                                control={<Checkbox onClick = {checkButton} value="yes" color="primary" />}
                                                label="Deliver to a different address"
                                                style={{ float: 'left' }} />
                                            <div id="addressNew">
                                                <TextareaAutosize onChange = {setDeliveryAdd} aria-label="minimum height" placeholder="Shipping Address" style={{ width: '480px', height: '60px', textAlign: 'justify', padding: '15px', fontFamily: 'Montserrat', marginTop: '10px', borderRadius: '5px' }} />
                                            </div>
                                            <TextareaAutosize aria-label="minimum height" placeholder="Order Notes (optional)" style={{ width: '480px', height: '100px', textAlign: 'justify', padding: '15px', fontFamily: 'Montserrat', marginTop: '30px', borderRadius: '5px' }} />

                                        </form>

                                    );
                                })}


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
                                            .map((value) => {
                                                return (
                                                    <TableRow key={value.customerId}>
                                                        <TableCell align="left" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={value.image} /></TableCell>
                                                        <TableCell align="left" style={{ fontFamily: 'Montserrat' }}>{value.name} x {value.quantity}</TableCell>
                                                        <TableCell align="left" style={{ fontFamily: 'Montserrat' }}>{value.size}</TableCell>
                                                        <TableCell align="left" style={{ fontFamily: 'Montserrat' }}>{value.totals}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {totalDetails
                                            .map((value) => {
                                                return (
                                                    <TableRow key={value.customerId}>
                                                        <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, height: '60px' }}>
                                                            Sub Total
                                                        </TableCell>
                                                        <TableCell align="left" style={{ fontFamily: 'Montserrat' }}>
                                                            Rs.{value.total}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        <TableRow>
                                            <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, height: '60px' }}>
                                                Shipping
                                            </TableCell>
                                            <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat' }}>
                                                Rs. 200
                                            </TableCell>
                                        </TableRow>
                                        {totalDetails
                                            .map((value) => {
                                                return (
                                                    <TableRow key={value.customerId}>
                                                        <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600, height: '60px' }}>
                                                            Total
                                                        </TableCell>
                                                        <TableCell align="left" colSpan={3} style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                                                            Rs. {Number(value.total) + 200}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        <TableRow>
                                            <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', textAlign: 'left', marginTop: '15px', marginBottom: '10px', marginLeft: '30px' }}>Payment Method</Typography>
                                            <FormControl component="fieldset">
                                                {/* <FormLabel component="legend">Gender</FormLabel> */}
                                                <RadioGroup aria-label="payment" name="payment1" value={value} onChange={radioButtonChange} style={{ marginLeft: '20px' }}>
                                                    <FormControlLabel value="cash" control={<Radio />} label="Cash on delivery" />
                                                    <FormControlLabel value="bank" control={<Radio />} label="Bank Deposits" />
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
                                    control={<Checkbox onChange={checkedTerms}  value="accept" color="primary" />}
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
                                    style= {{ float: 'left', marginLeft: '30px', marginTop: '10px' }} />
                            </TableContainer>
                            <div>
                                <center>
                                    <Button
                                        onClick = {placeOrders}
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


                    </Grid>
                </center>
            </container>
            <Footer />
        </div>

    );
}

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

function onLinkClick(event) {
    console.log('onLinkClick'); // never called
}

export default function Checkout() {
    const classes = useStyles();

    const [customerDetails, setOfDetails] = useState([]);
    useEffect(() => {
        var id = localStorage.getItem("userId");
        const url = "http://localhost:3001/check/customer/"+id;
        axios.get(url).then((response) => {
            console.log(response.data);
            setOfDetails(response.data);
        });
    }, []);

    const [itemDetails, setOfItems] = useState([]);
    useEffect(() => {
        var id = localStorage.getItem("userId");
        const url = "http://localhost:3001/check/items/"+id;
        axios.get(url).then((response) => {
            setOfItems(response.data);
        }); 
    }, []);

    const [totalDetails, setOftotals] = useState([]);
    useEffect(() => {
        var id = localStorage.getItem("userId");
        const url = "http://localhost:3001/check/total/"+id;
        axios.get(url).then((response) => {
            setOftotals(response.data);
        });
    }, []);

  const placeOrders = () => {
    var uid = localStorage.getItem("userId");
    if (uid > 0) {

      const url = "http://localhost:3001/check/cashOn/"
      const dummyItem = {userId:uid, payment: "cashon", status: "placed"}
      axios.post(url,dummyItem).then((response) => {
        if (response.data.error) {
            alert(response.data.error);
        }
      });
      alert("Product successfully added to cart");
    }
      
    };

    const [value, setValue] = React.useState('payment');

    const handleChange = (event) => {
        setValue(event.target.value);
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
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="number"
                                        label="Phone Number(for delivery)"
                                        name="number"
                                        defaultValue={value.phoneNo}
                                        autoComplete="number"
                                    />
                                    <TextField
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
                                        control={<Checkbox value="address" color="primary" />}
                                        label="Deliver to a different address"
                                        style={{ float: 'left' }} />
                                    <div id="addressNew">
                                        <TextareaAutosize aria-label="minimum height" placeholder="Shipping Address" style={{ width: '480px', height: '60px', textAlign: 'justify', padding: '15px', fontFamily: 'Montserrat', marginTop: '10px', borderRadius: '5px' }} />
                                    </div>
                                    <TextareaAutosize aria-label="minimum height"  placeholder="Order Notes (optional)" style={{ width: '480px', height: '100px', textAlign: 'justify', padding: '15px', fontFamily: 'Montserrat', marginTop: '30px', borderRadius: '5px' }} />

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
                                            Rs. {Number(value.total)+200}
                                        </TableCell>
                                    </TableRow>
                                    );
                                })}
                                    <TableRow>
                                        <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', textAlign: 'left', marginTop: '15px', marginBottom: '10px', marginLeft: '30px' }}>Payment Method</Typography>
                                        <FormControl component="fieldset">
                                            {/* <FormLabel component="legend">Gender</FormLabel> */}
                                            <RadioGroup aria-label="payment" name="payment1" value={value} onChange={handleChange} style={{ marginLeft: '20px' }}>
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
                                control={<Checkbox value="accept" color="primary" />}
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

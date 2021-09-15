import React from 'react';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import { Divider, CssBaseline, Button, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Radio, RadioGroup, FormControl, Checkbox, TextareaAutosize, useScrollTrigger } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useStyles from './style';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { setPayment } from '../Checkout/payment';
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
import UserSideNav from '../../components/Navbars/UserSideNav';
import Switch from '@material-ui/core/Switch';

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
    const [cutomerPhoneNumber, setOfPhoneNumber] = useState();
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

    const [add1Error, setAdd1Error] = useState(false);
    const [add2Error, setAdd2Error] = useState(false);
    const [phonneNoError, setphonneNoError] = useState(false)

    const [cityError, setCityError] = useState(false);
    const [districtError, setDistrictError] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const [fName, setFName] = useState();
    const [lName, setLName] = useState();
    const [currentPw, setCurrentPw] = useState([]);
    const [newPw, setnewPw] = useState([]);
    const [confirmPw, setConfirmPw] = useState([]);

    useEffect(() => {
        dispatch(actionGetCustomerDetails())
        dispatch(getCart())
        dispatch(getTotal())
        dispatch(actionGetDistricts())
    }, []);

    const setPhoneNumber = (event) => {
        const validatePhoneNo = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/
        setOfPhoneNumber(event.target.value)
        if (validatePhoneNo.test(event.target.value)) {
            setphonneNoError(false)
            setIsDisabled(false)
        } else {
            setphonneNoError(true)
            setIsDisabled(true)
        };
    }
    const setEmail = (event) => {
        setCustomerEmail(event.target.value);
    }
    const setfName = (event) => {
        setFName(event.target.value)
        setIsDisabled(false)
    }
    const setlName = (event) => {
        setLName(event.target.value)
        setIsDisabled(false)
    }

    const [state, setState] = React.useState({
        checkedB: false,
    });

    const handlePassword = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        console.log(event.target.checked)
        console.log(state)
        // if(event.target.checked == true) {
        //     setIsDisabled(false)
        // }else{
        //     setIsDisabled(true)
        // }
    };

    const [currentPWvalidation, setCurrentPWvalidation] = useState(false)
    const setCurrentPW = (event) => {
        setCurrentPw(event.target.value)
        const uid = localStorage.getItem("userId")
        var data = {
            loginEmail: customerDetails[0].email,
            loginPassword: event.target.value,
        }
        axios.post('http://localhost:3001/profileroute/getUserPassword', data).then((response) => {
            console.log(response.data.data)
            if (response.data.data == 1) {
                setCurrentPWvalidation(false)
                // setIsDisabled(true)
            } else {
                setCurrentPWvalidation(true)
                // setIsDisabled(false)
            }

        })
    }
    const setNewPW = (event) => {
        setnewPw(event.target.value)

        const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        if (regexp.test(event.target.value)) {
            setAdd2Error(false)
        } else {
            setAdd2Error(true)
            // setIsDisabled(false)
        };
    }

    const [isDisabled, setIsDisabled] = useState(true)
    const [newPWmatched, setNewPWmatched] = useState(false)
    const setConfirmPW = (event) => {
        setConfirmPw(event.target.value)
        if (newPw == event.target.value) {
            setNewPWmatched(false)
            setIsDisabled(false)
        } else {
            setNewPWmatched(true)
        }
    }



    function editConfirmation() {
        const uid = localStorage.getItem("userId")
        console.log("we are here", fName, lName)
        var data = {
            uid: uid,
            firstName: fName === undefined ? customerDetails[0].firstName : fName,
            lastName: lName === undefined ? customerDetails[0].lastName : lName,
            contactNo: cutomerPhoneNumber == undefined ? customerDetails[0].contactNo : cutomerPhoneNumber,
            password: confirmPw,
            shouldchangeps: state.checkedB ? 1 : 0
        }
        axios.put('http://localhost:3001/profileroute/updateUser', data).then((response) => {
            console.log(response.data.data)
            if (response.data.error) {
                setNotify({
                    isOpen: true,
                    message: 'Not successful. Please try again later !',
                    type: 'error'
                });
            } else {
                setNotify({
                    isOpen: true,
                    message: 'Successfully updated !',
                    type: 'success'
                });
                setTimeout(() => {
                    window.location.reload(true)
                })
            }


        })
    }


    return (
        <div>
            <CommonNav />
            <CssBaseline />
            <container>
                <CssBaseline />
                <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> MY ACCOUNT</Typography>
                <center>
                    <Grid container style={{ marginTop: '50px', align: 'center' }}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <UserSideNav />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={12} sm={12} md={8} lg={7}>
                            {customerDetails
                                .map((value) => {
                                    return (
                                        <form className={classes.form} noValidate key={value.customerId}>
                                            <TextField
                                                onChange={setfName}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="name"
                                                label="First Name"
                                                name="name"
                                                defaultValue={value.firstName}
                                                autoComplete="name"
                                                autoFocus

                                            />
                                            <TextField
                                                onChange={setlName}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="name"
                                                label="Last Name"
                                                name="name"
                                                defaultValue={value.lastName}
                                                autoComplete="name"
                                                autoFocus

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
                                                label="Phone Number"
                                                name="number"
                                                defaultValue={value.contactNo}
                                                autoComplete="number"
                                                error={phonneNoError}

                                            />

                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={state.checkedB}
                                                        onChange={handlePassword}
                                                        color="primary"
                                                        name="checkedB"
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                }
                                                label="Do you want to change the password also ?"
                                            />
                                            <div className={state.checkedB == false ? classes.noVisibility : classes.visibility}>
                                                <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', marginTop: '20px', marginBottom: '10px' }}>Password Change</Typography>


                                                <TextField
                                                    type="password"
                                                    onChange={setCurrentPW}
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="add1"
                                                    label="Current Password"
                                                    name="add1"
                                                    autoComplete="add1"
                                                    defaultValue={currentPw}
                                                    error={currentPWvalidation}
                                                />
                                                <TextField
                                                    disabled={currentPWvalidation}
                                                    type="password"
                                                    onChange={setNewPW}
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="add2"
                                                    label="New Password"
                                                    name="add2"
                                                    defaultValue={newPw}
                                                    error={add2Error}
                                                />
                                                <TextField
                                                    disabled={currentPWvalidation}
                                                    type="password"
                                                    onChange={setConfirmPW}
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="city"
                                                    label="Confirm Password"
                                                    name="city"
                                                    autoComplete="city"
                                                    defaultValue={confirmPw}
                                                    error={newPWmatched}
                                                />

                                            </div>

                                        </form>


                                    );
                                })}
                            {/* </Formik> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={isDisabled}
                                onClick={editConfirmation}
                            >Confirm Edit</Button>

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

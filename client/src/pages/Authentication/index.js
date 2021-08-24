import React from 'react';
import { useHistory } from 'react-router-dom';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import useStyles from './style';
import { CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";

const Authentication = () => {

    var cart = [];
    cart = useSelector(state => state.cart);

    let history = useHistory();
    const classes = useStyles();

    //Registration Form validation
    const initialRegValues = {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        terms: false,
        userType: '2',
    }

    const regValidation = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Email is not valid").required("Email is required"),
        mobile: Yup.string().required('Mobile Number is required').matches(/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/, "Invalid phone number"),
        password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
        confirmPassword: Yup.string().test('passwords-match', 'Passwords must match', function (value) { return this.parent.password === value }),
        terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    });

    const register = (data, props) => {
        console.log(data);
        axios.post("http://localhost:3001/auth/register", data).then((response) => {
            if (response.data.error) alert(response.data.error);
            else {
                alert("Registration Successful! Now you can Login");
                history.push("/auth");
            }
        });
        props.resetForm();
    };

    //login form validation
    const initialLoginValues = {
        loginEmail: '',
        loginPassword: '',
    }

    const loginValidation = Yup.object().shape({
        loginEmail: Yup.string().email("Email is not valid").required("Email is required"),
        loginPassword: Yup.string().required('Password is required'),
    });

    const login = (data, props) => {
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                console.log(response.data)
                var uid = localStorage.getItem("userId");

                if (uid == '0' && cart.cart.length > 0) {
                    console.log("login")
                    const url = "http://localhost:3001/check/addToCartBatchwise/"
                    var data = { uid: response.data.id, cart: cart.cart };
                    axios.post(url, data).then((response) => {
                        if (response.data.error) alert(response.data.error);

                    });
                }

                localStorage.setItem("userId", response.data.id);
                localStorage.setItem("userName", response.data.firstName);

                if (localStorage.getItem("fromTheCart") == "true") {
                    history.push("/cart");
                    localStorage.setItem("fromTheCart", false);
                } else {
                    //TODO navigate to profile
                }
            }
        });
        props.resetForm();
        //history.push('path')
    }

    function onLinkClick(event) {
        console.log('onLinkClick'); // never called
    }

    return (
        <div>
            <CommonNav />
            <CssBaseline />
            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> MY ACCOUNT</Typography>
            <center>
                <Grid container style={{ marginTop: '50px', align: 'center' }}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', textAlign: 'center' }}>Already Registered?</Typography>
                        <Formik initialValues={initialLoginValues} onSubmit={login} validationSchema={loginValidation}>
                            {(props) => (
                                <Form className={classes.form}>
                                    <Field as={TextField}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="loginEmail"
                                        label="Email Address"
                                        name="loginEmail"
                                        autoComplete="off"
                                        helperText={<ErrorMessage name="loginEmail" />}
                                    />
                                    <Field as={TextField}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="loginPassword"
                                        label="Password"
                                        name="loginPassword"
                                        type="password"
                                        autoComplete="current-password"
                                        helperText={<ErrorMessage name="loginPassword" />}
                                    />
                                    <Link href="#" className={classes.forgot}>Forgot Password</Link>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={!props.isValid}
                                    >Login</Button>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', textAlign: 'center' }}>New Member?</Typography>
                        <Formik initialValues={initialRegValues} onSubmit={register} validationSchema={regValidation}>
                            {(props) => (
                                <Form className={classes.form}>
                                    <Grid item xs={12} sm={12} spacing={1} container>
                                        <Grid item xs={12} sm={6}>
                                            <Field as={TextField}
                                                className={classes.textField}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                name="firstName"
                                                autoComplete="fname"
                                                helperText={<ErrorMessage name="firstName" />}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <Field as={TextField}
                                                className={classes.textField}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="lname"
                                                helperText={<ErrorMessage name="lastName" />}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Field as={TextField}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="off"
                                        helperText={<ErrorMessage name="email" />}
                                    />
                                    <Field as={TextField}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="mobile"
                                        label="Mobile Number"
                                        name="mobile"
                                        autoComplete="mobileno"
                                        helperText={<ErrorMessage name="mobile" />}
                                    />
                                    <Field as={TextField}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        helperText={<ErrorMessage name="password" />}
                                    />
                                    <Field as={TextField}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="confirm-password"
                                        helperText={<ErrorMessage name="confirmPassword" />}
                                    />
                                    <Field as={TextField}
                                        className={classes.textField}
                                        name="userType"
                                        type="hidden"
                                        id="userType"
                                    />
                                    <Field as={FormControlLabel} name="terms"
                                        control={<Checkbox value="terms" color="primary" />}
                                        label={
                                            <span>I have read and agree to the&nbsp;
                                                <a
                                                    href="/Termnconditions"
                                                    //onClick={onLinkClick}
                                                    style={{ textDecoration: "none", color: 'black', fontWeight: "bold" }}>
                                                    Terms and Conditions
                                                </a>
                                            </span>
                                        }
                                        style={{ float: 'left' }}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={!props.isValid}
                                    >Register</Button>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </center>
            <Footer />
        </div>
    );
};

export default Authentication;



import React from 'react';
import CommonNav from '../components/Navbars/CommonNav';
import Footer from '../components/Footer/Footer';
import useStyles from '../styles/Auth-style';
import { CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import "yup-phone";


const Authentication = () => {
    const classes = useStyles();
    const initialValues = {
        firstName: '',
        lastName: '',
        regEmail: '',
        mobileNumber: '',
        regPassword: '',
        confirmPassword: '',
        terms: false,
    }
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        regEmail: Yup.string().email("Email is not valid").required("Email is required"),
        mobileNumber: Yup.string().required("Phone number is required").matches(/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/, "Invalid phone number"),
        regPassword: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().test('passwords-match', 'Passwords must match', function (value) { return this.parent.regPassword === value }),
        terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    });
    const onSubmit = (values, props) => {
        console.log(values);

    }

    useEffect(() => {
        axios.get("http://localhost:3001/auth").then((response) => {
            console.log(response.data);
        })
    }, []);

    return (
        <div>
            <CommonNav />
            <CssBaseline />
            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> MY ACCOUNT</Typography>
            <center>
                <Grid container style={{ marginTop: '50px', align: 'center' }}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', textAlign: 'center' }}>Already Registered?</Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="loginEmail"
                                label="Email Address"
                                name="loginEmail"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="loginPassword"
                                label="Password"
                                name="loginPassword"
                                type="password"
                                autoComplete="current-password"
                            />
                            <Link href="#" className={classes.forgot}>Forgot Password</Link>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >Login</Button>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', textAlign: 'center' }}>New Member?</Typography>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
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
                                        id="regEmail"
                                        label="Email Address"
                                        name="regEmail"
                                        autoComplete="email"
                                        helperText={<ErrorMessage name="regEmail" />}
                                    />
                                    <Field as={TextField}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="mobileNumber"
                                        label="Mobile Number"
                                        name="mobileNumber"
                                        autoComplete="mobileno"
                                        helperText={<ErrorMessage name="mobileNumber" />}
                                    />
                                    <Field as={TextField}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="regPassword"
                                        label="Password"
                                        type="password"
                                        id="regPassword"
                                        autoComplete="current-password"
                                        helperText={<ErrorMessage name="regPassword" />}
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
                                    <Field as={FormControlLabel} name="terms"
                                        control={<Checkbox value="terms" color="primary" />}
                                        label="Accept Terms & Condition"
                                        style={{ float: 'left' }}
                                        helperText={<ErrorMessage name="terms" />}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
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



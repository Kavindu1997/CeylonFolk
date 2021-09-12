import React from 'react';
import UserNav from '../../components/Navbars/UserNav';
import Footer from '../../components/Footer/Footer';
import { Button, CssBaseline, TextField, Grid, Typography, FormControl, IconButton, OutlinedInput, InputLabel, InputAdornment, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import "yup-phone";
import useStyles from './style';
import UserSideNav from '../../components/Navbars/UserSideNav';
import CommonNav from '../../components/Navbars/CommonNav';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Profile1() {
    let history = useHistory();
    const classes = useStyles();
    const [customerDetails, setCustomerDetails] = useState([]);

    // if(localStorage.getItem("userId")=='0'){
    //     history.push("/auth")
    // }
    

    useEffect(() => {
        const uid = localStorage.getItem("userId");
        console.log("hgffhgfhffhg")
        axios.get('http://localhost:3001/order/getUserDetails/'+uid).then((response) => {
            setCustomerDetails(response.data);
            console.log(response.data)
        })
    }, []);

    return (
        <div>
          <CommonNav />
            <CssBaseline />
        <container>
            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> MY ACCOUNT</Typography>
            <center>
                <Grid container style={{ marginTop: '50px', align: 'center' }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <UserSideNav />
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={12} sm={12} md={7} lg={7}>
                    {/* <Formik initialValues={initialValues1} onSubmit={onSubmit1} validationSchema={validationSchema1}> */}
                            {/* {customerDetails
                                .map((value) => {
                                    return ( */}
                            {/* <Form className={classes.form}> */}
                            <form className={classes.form} noValidate >
                            <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="fullName"
                                label="Your Name"
                                name="fullName"
                                autoComplete="fname"
                                defaultValue={customerDetails[0].firstName + " "+ customerDetails[0].lastName} 
                                helperText={<ErrorMessage name="fullName" />}
                            />
                             <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                defaultValue={customerDetails[0].email}
                                helperText={<ErrorMessage name="email" />}
                            />
                            <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="mobile"
                                label="Contact Number"
                                name="mobile"
                                autoComplete="mobileno"
                                defaultValue={customerDetails[0].contactNo}
                                helperText={<ErrorMessage name="mobile" />}
                            />
                            <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                // required
                                fullWidth
                                id="add1"
                                label="Address Line 1"
                                name="add1"
                                autoComplete="add1"
                                // helperText={<ErrorMessage name="message" />}
                            />
                            <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                // required
                                fullWidth
                                id="add2"
                                label="Address Line 2"
                                name="add2"
                                autoComplete="add2"
                                // helperText={<ErrorMessage name="message" />}
                            />
                            <Field as={TextField}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                // required
                                fullWidth
                                id="city"
                                label="City"
                                name="city"
                                autoComplete="city"
                                // helperText={<ErrorMessage name="message" />}
                            />
                           
                                           
                            <div>
                                <br />
                                <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', textAlign: 'left' }}>Password Change </Typography>
                            </div>
                            <div>
                                <FormControl className={classes.margin} variant="outlined" style={{ marginLeft: '0px' }}>
                                    <InputLabel htmlFor="outlined-adornment-password">Current Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        // type={values.showPassword ? 'text' : 'password'}
                                        // value={values.password}
                                        // onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    // onClick={handleClickShowPassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={120}
                                    />
                                </FormControl>
                                <FormControl className={classes.margin} variant="outlined" style={{ marginLeft: '0px' }}>
                                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        // type={values.showPassword ? 'text' : 'password'}
                                        // value={values.password}
                                        // onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    // onClick={handleClickShowPassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={120}
                                    />
                                </FormControl>
                                <FormControl className={classes.margin} variant="outlined" style={{ marginLeft: '0px' }}>
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm New Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        // type={values.showPassword ? 'text' : 'password'}
                                        // value={values.password}
                                        // onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    // onClick={handleClickShowPassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={170}
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <center>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >SAVE CHANGES
                                    </Button>
                                </center>
                            </div>
                        {/* </Form> */}
                        </form>
                             {/* );
                            })} */}
                    {/* </Formik> */}
                    </Grid>
                </Grid>
            </center>
        </container>
        <Footer />
        </div>

    );
}
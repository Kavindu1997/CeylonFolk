import React from 'react';
import { Button, CssBaseline, TextField, Grid, Typography, FormControl, IconButton, OutlinedInput, InputLabel, InputAdornment, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import "yup-phone";

const initialValues1 = {
    fullName: '',
    email: '',
    mobile: '',
    add1: '',
    add2: '',
    city: '',
  }
  
  const validationSchema1 = Yup.object().shape({
    fullName: Yup.string().required("First Name is required"),
    email: Yup.string().email("Email is not valid").required("Email is required"),
    // mobile: Yup.string().required("Phone number is required").matches(/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/, "Invalid phone number"),
    // add1: Yup.string().required("Address Line 1 is required"),
  
  });
  
  
  const onSubmit1 = (data, props) => {
    axios.post("http://localhost:3001/profile/customer", data).then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
            alert("Profile Successfully Updated!");
        }
    });
    props.resetForm();
};


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        height: '1000px',
        fontFamily: 'Montserrat',
        position: 'relative',
        color: 'white',
        padding: '100px',
    },
    table: {
        backgroundColor: '#fafafa',
        fontFamily: 'Montserrat',
        width: '600px'
    },
    form: {
        width: '60%',
        marginTop: theme.spacing(2),
        fontFamily: 'Montserrat',
        alignItems: 'center',
    },
    field: {
        width: '800px',
        fontFamily: 'Montserrat',
        alignItems: 'center',
        backgroundColor: '#fafafa'
    },
    submit: {
        align: 'center',
        padding: '10px',
        marginTop: '30px',
        width: '450px'
    },
    margin: {
        margin: theme.spacing(2),
        width: '50ch',
    },
    avatar: {
        align: 'left'
    },
    listItemText: {
        fontSize: '3.0em',
        marginLeft: '20px',
    },
}));

export default function MyAccount() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <container>
            <CssBaseline />
            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> MY ACCOUNT</Typography>
            <center>
                <Grid container style={{ marginTop: '50px', align: 'center' }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <div>
                            <Typography component="h1" variant="h6" style={{ fontFamily: 'Montserrat', textAlign: 'center', fontWeight: 600 }}>Hello </Typography>
                            <List style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{ marginLeft: '130px' }}>NB</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText><Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', marginLeft: '15px', fontWeight: 600 }}>Nimal Bandara</Typography></ListItemText>
                                </ListItem>
                            </List>
                            <br />
                        </div>
                        <Divider />
                        <div>
                            <center>
                                <div>
                                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                                        <Typography component="h1" variant="h6" style={{ marginTop: '50px', marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            My Account
                                        </Typography>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/myOrders" style={{ textDecoration: 'none', hover: 'red' }}>
                                        <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            Order History
                                        </Typography>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/myWishlist" style={{ textDecoration: 'none' }}>
                                        <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            Wishlist
                                        </Typography>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/auth" style={{ textDecoration: 'none' }}>
                                        <Typography component="h1" variant="h6" style={{ marginLeft: '80px', fontFamily: 'Montserrat', color: 'black', textAlign: 'left', marginBottom: '30px' }}>
                                            Logout
                                        </Typography>
                                    </Link>
                                </div>
                            </center>
                        </div>
                        <Divider orientation="vertical" flexItem />
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={12} sm={12} md={7} lg={7}>
                    <Formik initialValues={initialValues1} onSubmit={onSubmit1} validationSchema={validationSchema1}>
                        {(props) => (
                            <Form className={classes.form}>
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
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
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
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
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
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
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
                        </Form>
                        )}
                    </Formik>
                    </Grid>
                </Grid>
            </center>
        </container>

    );
}

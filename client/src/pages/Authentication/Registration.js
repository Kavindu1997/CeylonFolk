import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import * as Yup from 'yup';
import Notification from '../../components/Reusable/Notification';
import { TextField, FormControlLabel, Checkbox, Grid, Button } from '@material-ui/core';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { calculateCartCount, getCart } from '../../_actions/index';
import { API_URL } from '../../_constants';

function Registration() {
    let history = useHistory();
    const classes = useStyles();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const dispatch = useDispatch();
    var cart = [];
    cart = useSelector(state => state.cart);

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

    const register = (data) => {
        axios.post(API_URL + "/auth/register", data).then((response) => {
            if (response.data.error) {
                setNotify({
                    isOpen: true,
                    message: response.data.error,
                    type: 'error'
                });
                setTimeout(() => {
                    window.location.reload(true)
                }, 1500)
            }
            else {
                console.log(response.data[0])
                dispatch(getCart())
                dispatch(calculateCartCount())

                var uid = localStorage.getItem("userId");

                if (uid == '0' && cart.cart.length > 0) {
                    console.log("login")
                    const url = API_URL + "/check/addToCartBatchwise/"
                    var data = { uid: response.data[0].id, cart: cart.cart };
                    axios.post(url, data).then((response) => {
                        if (response.data.error) alert(response.data.error);

                    });
                }

                localStorage.setItem("userId", response.data[0].id);
                localStorage.setItem("fullname", response.data[0].firstName + ' ' + response.data[0].lastName)
                localStorage.setItem("userEmail", response.data[0].email);

                if (localStorage.getItem("fromTheCart") == "true") {
                    history.push("/cart");
                    localStorage.setItem("fromTheCart", false);
                } else {
                    history.push("/profile")
                }
            }
        });
    };

    return (
        <div>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
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
        </div>
    )
}

export default Registration;

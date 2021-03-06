import { React, useState } from 'react'
import useStyles from './style';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { CssBaseline, TextField, Button, Grid, Typography, Link } from '@material-ui/core';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { API_URL } from '../../_constants';
import Notification from '../../components/Reusable/Notification';

function ForgotPassword() {
    const classes = useStyles();
    let history = useHistory();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const initialForgotValues = {
        forgotEmail: '',
    }

    const forgotValidation = Yup.object().shape({
        forgotEmail: Yup.string().email("Email is not valid").required("Email is required"),
    });


    const forgot = (data, props) => {
        console.log(data);
        axios.post(API_URL + "/auth/forgotPassword", data).then((response) => {
            if (response.data.error) {
                setNotify({
                    isOpen: true,
                    message: response.data.error,
                    type: 'error'
                });
            }
            else {
                setNotify({
                    isOpen: true,
                    message: response.data.message,
                    type: 'success'
                });
            }
        });
        props.resetForm();
    }
    return (
        <div>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <CssBaseline />
            <div className={classes.forgotPass}>
                <Grid container >
                    <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginLeft: '700px', marginTop: '300px', align: 'right' }}>
                        <Typography variant="h4" style={{ padding: '0px', fontFamily: 'Montserrat' }}> Reset your password</Typography>
                        <Typography variant="h5" style={{ marginTop: '20px', fontSize: '20px', fontFamily: 'Montserrat' }}> We'll email you instructions to reset the password.</Typography>
                        <Formik initialValues={initialForgotValues} onSubmit={forgot} validationSchema={forgotValidation}>
                            {(props) => (
                                <Form className={classes.form}>
                                    <Field as={TextField}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="forgotEmail"
                                        label="Email Address"
                                        name="forgotEmail"
                                        autoComplete="off"
                                        helperText={<ErrorMessage name="forgotEmail" />}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={!props.isValid}
                                    >Reset Password</Button>

                                    <Link href="/auth" className={classes.forgotLink}>Return to Login</Link>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </div >
        </div>

    )
}

export default ForgotPassword

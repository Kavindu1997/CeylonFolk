import React from 'react'
import useStyles from './style';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { CssBaseline, TextField, Button, Grid, Typography, Link } from '@material-ui/core';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { API_URL } from '../../_constants';

function NewPassword() {
    const classes = useStyles();
    let history = useHistory();
    const { token } = useParams();
    //console.log(token)
    const initialNewPasswordValues = {
        newPassword: '',
        confirmPassword: '',
    }

    const newPasswordValidation = Yup.object().shape({
        newPassword: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
        confirmPassword: Yup.string().test('passwords-match', 'Passwords must match', function (value) { return this.parent.newPassword === value }),
    });


    const reset = (data, props) => {
        const data1 = {
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
            token: token,
        }

        axios.post(API_URL + "/auth/newPassword", data1).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }
        });
        props.resetForm();
    }
    return (
        <div>
            <CssBaseline />
            <div className={classes.forgotPass}>
                <Grid container >
                    <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginLeft: '700px', marginTop: '300px', align: 'right' }}>
                        <Typography variant="h4" style={{ padding: '0px', fontFamily: 'Montserrat' }}> Reset your password</Typography>
                        <Formik initialValues={initialNewPasswordValues} onSubmit={reset} validationSchema={newPasswordValidation}>
                            {(props) => (
                                <Form className={classes.form}>
                                    <Field as={TextField}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="newPassword"
                                        label="New Password"
                                        type="password"
                                        id="newPassword"
                                        autoComplete="new-password"
                                        helperText={<ErrorMessage name="newPassword" />}
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

export default NewPassword

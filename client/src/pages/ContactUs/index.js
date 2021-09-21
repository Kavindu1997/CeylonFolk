import React from 'react';
import { makeStyles, IconButton, Typography, Paper, Grid, TextField, Button } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import StreetviewIcon from '@material-ui/icons/Streetview';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import "yup-phone";
import Select from '../../components/FormsUI/Select';
import types from '../../components/Data/types.json';
import useStyles from './style';
import { useEffect, useState } from 'react';
import Notification from '../../components/Reusable/Notification';

const initialValues = {
  fullName: '',
  orderId:'',
  mobile: '',
  email: '',
  message: '',
  enqueryType: '',
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("First Name is required"),
  mobile: Yup.string().required("Phone number is required").matches(/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/, "Invalid phone number"),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  message: Yup.string().required("Message is required"),
  enquiryType: Yup.string().required("Your Issue is required"),
  // orderId: Yup.string().required("Your Order ID is required"),

});






export default function ContactUs() {
  const classes = useStyles();

  const [age, setAge] = React.useState('');
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const onSubmit = (data, props) => {
    axios.post("http://localhost:3001/contact/contactus", data).then((response) => {
      console.log(data);
      alert('Message Successfully Sent')
      if (response.data.error) {
        setNotify({
          isOpen: true,
          message: 'Message Not Successfullt Sent !',
          type: 'error'
        });
      }
              else {
                setNotify({
                  isOpen: true,
                  message: 'Message Successfullt Sent !',
                  type: 'success'
                });
              }

              setNotify({
                isOpen: true,
                message: 'Message Successfullt Sent !',
                type: 'success'
              });
    });
    console.log(data);
    props.resetForm();
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <container>
        <CommonNav />
        <CssBaseline />
      <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> CONTACT US</Typography>
      <Paper className={classes.pageContent}>
        <Grid container style={{ marginTop: '20px' }}>
          <Grid item md={6} style={{ paddingLeft: '100px', paddingRight: '100px' }}>
            <Typography component="h1" variant="subtitle2" className={classes.textStyle} style={{paddingBottom:'20px'}}>
              Please contact us using one of the option below. <br />You will recieve a response within 24 hours by email.
            </Typography>

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              {(props) => (
                <Form>
                    <Select
                      name="enquiryType"
                      label="What is Your Issue"
                      options={types}
                      required
                    />
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
                    fullWidth
                    id="orderId"
                    label="Enter the Order ID "
                    name="orderId"
                    autoComplete="orderId"
                    helperText={<ErrorMessage name="orderId" />}
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
                    id="message"
                    label="Message"
                    name="message"
                    autoComplete="lname"
                    helperText={<ErrorMessage name="message" />}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >Send Message</Button>
                </Form>
              )}
            </Formik>
          </Grid>

          <Grid item md={6} className={classes.infoContent}>
            <Typography component="h1" variant="h5" gutterBottom>
              <IconButton><BusinessIcon fontSize="large" /></IconButton>
              Company Information
            </Typography>
            <Typography component="div" variant="subtitle1" gutterBottom>
              ·  Clothing (brand) · Design & fashion · Screen Printing & Embroidery
            </Typography>
            <Typography component="h1" variant="h5" gutterBottom>
              <IconButton><PhoneInTalkIcon fontSize="large" /></IconButton>
              Customer Care Hotline
            </Typography>
            <Typography component="div" variant="subtitle1" gutterBottom>
              +94 71 461 1122
            </Typography>

            <Typography component="h1" variant="h5" gutterBottom>
              <IconButton><StreetviewIcon fontSize="large" /></IconButton>
              CeylonFolk, Kaduwela
            </Typography>
            <Typography component="div" variant="subtitle1" gutterBottom>
              328 Kaduwela Rd, Colombo 10115, Sri Lanka<br />
              +94 71 461 1122<br />
              ceylonfolk@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Footer/>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </container>

  );
}




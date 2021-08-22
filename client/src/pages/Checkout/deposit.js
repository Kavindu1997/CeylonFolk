import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline,Table, Divider,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from '@material-ui/core';
import 'font-awesome/css/font-awesome.min.css';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useStyles from './style';
import sampath from '../../images/sampath.jpg';
import useStyles1 from './style1';

export default function Deposit() {
    const classes = useStyles1();

    return (
        <div>
          <CommonNav />
            <CssBaseline />

        <container>
            <center>
            <div className={classes.subText}>
                <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>BANK DEPOSIT</Typography>
                <Typography style={{ marginTop: '40px', textAlign: 'center', fontFamily: 'Montserrat' }}>Your order has been placed.</Typography>
                <Typography style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Montserrat' }}>Order ID: #1122447</Typography>
                <Typography style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Montserrat' }}>Rs. 2,000</Typography>
                <Divider variant="middle" />
                
                <Typography style={{ marginTop: '20px', textAlign: 'center', fontFamily: 'Montserrat' }}>Deposit the amount into one of these bank accounts listed below.</Typography>
                <Typography style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Montserrat' }}>Then, upload the slip to confirm the payment.</Typography>
            </div>
                <div>
                    <img src={sampath} className={classes.image} />
                </div>
                <div className={classes.subText}>
                <Typography style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Montserrat', fontWeight: "bold" }}>Sampath Bank</Typography>
                <Typography style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Montserrat' }}>CeylonFolk (Pvt) Ltd</Typography>
                <Typography style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Montserrat' }}>11112222266666</Typography>
                <Typography style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Montserrat' }}>Kaduwela</Typography>
                </div>
                <div>
                    <Box
                        component="span"
                        m={1}
                        className={`${classes.spreadBox} ${classes.box}`}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.back}
                        >Pay Later
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Upload Slip
                        </Button>
                    </Box>
                </div>

                <div className={classes.subText}>
                    <Typography  style={{ marginTop: '20px', textAlign: 'center', fontFamily: 'Montserrat', color: 'red' }}>Please upload your slip within 48 hours from the time if your order.</Typography>
                    <Typography style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Montserrat', color: 'red' }}>You can use a bank slip or screenshot of the online transfer to confirm thee payment.</Typography>
                    <Typography style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Montserrat', color: 'red' }}>We have also emailed you a link to confirm the payment once you have done the payment.</Typography>
                </div>
            </center>

        </container>
        <Footer />
        </div>
    );
}
import React from 'react';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import Registration from './Registration';
import Login from './Login';
import useStyles from './style';
import { CssBaseline, Grid, Typography } from '@material-ui/core';

const Authentication = () => {
    const classes = useStyles();

    return (
        <div>
            <CommonNav />
            <CssBaseline />
            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}> MY ACCOUNT</Typography>
            <center>
                <Grid container style={{ marginTop: '50px', align: 'center' }}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', textAlign: 'center' }}>Already Registered?</Typography>
                        <Login />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Typography component="h1" variant="h5" style={{ fontFamily: 'Montserrat', textAlign: 'center' }}>New Member?</Typography>
                        <Registration />
                    </Grid>
                </Grid>
            </center>
            <Footer />
        </div>
    );
};

export default Authentication;



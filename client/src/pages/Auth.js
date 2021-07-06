import React from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../components/Navbars/CommonNav';
import User from '../components/User/User';
import useStyles from '../components/User/UserStyle';
import Footer from '../components/Footer/Footer';
const Auth = () => {
    const classes=useStyles();
    return (
        <div className={classes.base}>
            <CssBaseline/> 
            <CommonNav/>
            <User/>
            <Footer/>
        </div>
    );
};

export default Auth;

//pramuka seneviratne
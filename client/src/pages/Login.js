import React from 'react';
import { CssBaseline } from '@material-ui/core';
import SignIn from '../components/Login/Signin/SignIn';
import useStyles from '../components/Login/Signin/styles';
const Login = () => {
    const classes=useStyles();
    return (
        <div className={classes.base}>
       <CssBaseline/> 
        <SignIn/>
        </div>
    );
};

export default Login;
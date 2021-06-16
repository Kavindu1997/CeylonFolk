import React from 'react';
import { CssBaseline } from '@material-ui/core';
import Header from '../components/Header/Header';
import useStyles from '../components/Header/styles';
const Home = () => {
    const classes=useStyles();
    return (
        <div className={classes.base}>        
          <CssBaseline/>
          <Header/>
        </div>
    );
};

export default Home;
import React from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../components/Navbars/CommonNav';
import Cart from '../components/Cart/Cart';
import useStyles from '../components/Cart/Cart-style';
import Footer from '../components/Footer/Footer';
const Shop = () => {
    const classes=useStyles();
    return (
        <div className={classes.base}>
            <CssBaseline/> 
            <CommonNav/>
            <Cart/>
            <Footer/>
        </div>
    );
};

export default Shop;
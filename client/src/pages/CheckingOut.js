import React from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../components/Navbars/CommonNav';
import Checkout from '../components/Cart/Checkout';
import Footer from '../components/Footer/Footer';
const CheckingOut = () => {
    return (
        <div>
            <CssBaseline/> 
            <CommonNav/>
            <Checkout/>
            <Footer/>
        </div>
    );
};

export default CheckingOut;
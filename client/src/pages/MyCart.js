import React from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../components/Navbars/CommonNav';
import Cart from '../components/Cart';
import Footer from '../components/Footer/Footer';
const MyCart = () => {
    return (
        <div>
            <CssBaseline/> 
            <CommonNav/>
            <Cart/>
            <Footer/>
        </div>
    );
};

export default MyCart;
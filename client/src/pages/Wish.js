import React from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../components/Navbars/CommonNav';
import Wishlist from '../components/Wishlist';
import Footer from '../components/Footer/Footer';
const Wish = () => {
    return (
        <div>
            <CssBaseline/> 
            <CommonNav/>
            <Wishlist/>
            <Footer/>
        </div>
    );
};

export default Wish;
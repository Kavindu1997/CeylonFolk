import React from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../components/Navbars/CommonNav';
import Auth from '../components/Auth';
import Footer from '../components/Footer/Footer';

const Authentication = () => {
    return (
        <div>
            <CssBaseline/> 
            <CommonNav/>
            <Auth/>
            <Footer/>
        </div>
    );
};

export default Authentication;



import React from 'react';
import { CssBaseline } from '@material-ui/core';
import UserNav from '../components/Navbars/UserNav';
import OrderHistory from '../components/OrderHistory';
import Footer from '../components/Footer/Footer';
const UserOrders = () => {
    return (
        <div>
            <CssBaseline/> 
            <UserNav/>
            <OrderHistory/>
            <Footer/>
        </div>
    );
};

export default UserOrders;
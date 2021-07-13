import React from 'react';
import { CssBaseline } from '@material-ui/core';
import UserNav from '../components/Navbars/UserNav';
import ProfileWishlist from '../components/ProfileWishlist';
import Footer from '../components/Footer/Footer';
const UserWishlist = () => {
    return (
        <div>
            <CssBaseline/> 
            <UserNav/>
            <ProfileWishlist/>
            <Footer/>
        </div>
    );
};

export default UserWishlist;
import React from 'react';
import { CssBaseline } from '@material-ui/core';
import UserNav from '../components/Navbars/UserNav';
import MyAccount from '../components/MyAccount';
import Footer from '../components/Footer/Footer';
const Profile = () => {
    return (
        <div>
            <CssBaseline/> 
            <UserNav/>
            <MyAccount/>
            <Footer/>
        </div>
    );
};

export default Profile;
import React from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../components/Navbars/CommonNav';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer/Footer';

const About = () => {
    return (
        <div>
            <CssBaseline/> 
            <CommonNav/>
            <AboutUs/>
            <Footer/>
        </div>
    );
};

export default About;



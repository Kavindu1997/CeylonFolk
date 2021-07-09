import React from 'react';
import { CssBaseline } from '@material-ui/core';
import HomeNav from '../components/Navbars/HomeNav';
import Content from '../components/Content';
import Footer from '../components/Footer/Footer';
const Home = () => {
    return (
        <div>        
          <CssBaseline/>
          <HomeNav/>
          <Content/>
          <Footer/>
        </div>
    );
};

export default Home;
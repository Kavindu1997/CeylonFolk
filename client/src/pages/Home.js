import React from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../components/Navbars/CommonNav';
import Content from '../components/Content';
import Footer from '../components/Footer/Footer';
const Home = () => {
    return (
        <div>        
          <CssBaseline/>
          <CommonNav/>
          <Content/>
          <Footer/>
        </div>
    );
};

export default Home;
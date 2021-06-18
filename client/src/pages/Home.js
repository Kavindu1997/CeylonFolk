import React from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../components/Navbars/CommonNav';
import Content from '../components/Content';
const Home = () => {
    return (
        <div>        
          <CssBaseline/>
          <CommonNav/>
          <Content/>
        </div>
    );
};

export default Home;
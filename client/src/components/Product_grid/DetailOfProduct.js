import React from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../Navbars/CommonNav';
import Footer from '../Footer/Footer';
import { Product_detail } from './Product_detail';
// import { Corousel_img } from './Corousel_img';


const DetailOfProduct = () => {
    return (
        <div>        
          <CssBaseline/>
          <CommonNav/>
          <Product_detail/>
      
          <Footer/> 
        </div>
    );
};

export default DetailOfProduct;
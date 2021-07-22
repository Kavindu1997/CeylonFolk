import React from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../components/Navbars/CommonNav';
import Footer from '../components/Footer/Footer';
// import Product_grid from '../components/Product_grid/Product_grid';
import { Product_grid } from '../components/Product_grid/Product_grid';
// import { DropDown } from '../components/Product_grid/DropDown';

const Shop = () => {
  return (
    <div>
      <CssBaseline />
      <CommonNav />
      <Product_grid />
      <Footer />
    </div>
  );
};

export default Shop;
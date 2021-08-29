import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contactus from './pages/ContactUs';
import Authentication from './pages/Authentication';
import AdminPanel from './pages/Admin';
import Users from './pages/Admin/UserTable';
import Collections from './pages/Admin/CollectionTable';
import Designs from './pages/Admin/DesignTable';
import Inventory from './pages/Admin/InventoryTable';
import Coupon from './pages/Admin/CouponTable';
import NotFound from './pages/404/notfound';
import AvailableColors from './pages/Admin/AvailableColors/AvailableColorsTable';

import Product_detail from './pages/Shop/Product_detail';
//import Collections from './pages/Collections'
//import Inventory from './pages/Inventory';
//import Design from './pages/Design';
import MyCart from './pages/Cart'
import Checkout from './pages/Checkout'
//import Coupon from './pages/Coupon';
import Wishlist from './pages/Wishlist';
import About from './pages/AboutUs';
import Profile from './pages/MyAccount';
import ProfileWishlist from './pages/Wishlist/userWishlist';
import OrderHistory from './pages/MyOrders';
import Customize from './pages/Customize';
import Tab from './pages/tab';
import Termnconditions from './pages/TermsAndConditions';
import CreateForm from './pages/CreateForm';
import ProductD from './pages/ProductD';
import MyCanvas from './pages/MyCanvas';

import MyLayers from './pages/Customize/MyLayer';
import MyLayers2 from './pages/Customize/MyLayers2';
import TransformText from './pages/Customize/TransformText';

import { Component } from 'react';
import { Class } from '@material-ui/icons';
import { render } from 'react-dom';
import CommonNav from './components/Navbars/HomeNav';
import {Provider} from 'react-redux';
import {createStore } from 'redux';
import {cart} from './_reducers/cart.reducer';
import { StoreProvider } from "./_util";
import Deposit from './pages/Deposit/index.js';




const theme = createMuiTheme({
  typography: {
    fontFamily: 'Open Sans',
    fontWeightThin: 100,
    fontWeightThinItalic: 100,
    fontWeightExtraLight: 200,
    fontWeightExtraLightItalic: 200,
    fontWeightLight: 300,
    fontWeightLightItalic: 300,
    fontWeightRegular: 400,
    fontWeightRegularItalic: 400,
    fontWeightMedium: 500,
    fontWeightMediumItalic: 500,
    fontWeightSemiblod: 600,
    fontWeightSemiblodtalic: 600,
    fontWeightBlod: 700,
    fontWeightBlodtalic: 700,
    fontWeightExtrablod: 800,
    fontWeightExtrablodtalic: 800,
    fontWeightBlack: 900,
    fontWeightBlackItalic: 900,
    padding: '10px'
  },
  button: {
    fontFamily: 'Work Sans',
    fontWeightThin: 100,
    fontWeightThinItalic: 100,
    fontWeightExtraLight: 200,
    fontWeightExtraLightItalic: 200,
    fontWeightLight: 300,
    fontWeightLightItalic: 300,
    fontWeightRegular: 400,
    fontWeightRegularItalic: 400,
    fontWeightMedium: 500,
    fontWeightMediumItalic: 500,
    fontWeightSemiblod: 600,
    fontWeightSemiblodtalic: 600,
    fontWeightBlod: 700,
    fontWeightBlodtalic: 700,
    fontWeightExtrablod: 800,
    fontWeightExtrablodtalic: 800,
    fontWeightBlack: 900,
    fontWeightBlackItalic: 900,
  },
  palette: {
    primary: {
      main: "#2C2D2D",
      light: "#c8d6e5"
    },
    secondary: {
      main: "#74b9ff",
      light: "#dff9fb"
    },
    background: {
      default: '#FFFFFF'
    },
  },
});

//export const  store = createStore(cart, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends Component {
  render() {
  return (
   <StoreProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"}  component = {Home} />
          <Route exact path="/shop" component = {Shop} />
          <Route exact path="/contactus" component = {Contactus} />
          <Route path="/auth" exact render={() => < Authentication />} />
          <Route exact path={"/cart"} component = {MyCart} />
          <Route exact path={"/productDetails/:id"} component = {Product_detail} />
          <Route exact path={"/deposit"} component = {Deposit} />
          <Route exact path={"/profile"} component = {Profile} />
          <Route exact path={"/myOrders"} component = {OrderHistory} />
          <Route exact path={"/myWishlist"} component = {ProfileWishlist} />
          <Route path="/admin" exact render={() => <AdminPanel />} />
          <Route path="/users" exact render={() => <Users />} />
          <Route path="/collections" exact render={() => <Collections />} />
          <Route path="/designs" exact render={() => <Designs />} />
          <Route path="/inventory" exact render={() => <Inventory />} />
          <Route path="/coupon" exact render={() => <Coupon />} />
          <Route path="/availableColors" exact render={() => <AvailableColors />} />
          <Route path="/checkout" exact render={() => <Checkout />} />
          <Route path="/wishlist" exact render={() => <Wishlist />} />
          <Route path="/aboutUs" exact render={() => <About />} />
          {/* <Route path="/profile" exact render={() => <Profile />} />
          <Route path="/myWishlist" exact render={() => <ProfileWishlist />} />
          <Route path="/myOrders" exact render={() => <OrderHistory />} /> */}
          {/* <Route path="/collections" exact render={() => <Collections />} />
          <Route path="/coupon" exact render={() => <Coupon />} />
          <Route path="/inventory" exact render={() => <Inventory />} />
          <Route path="/designs" exact render={() => <Design />} />  */}
          <Route path="/customize" exact render={() => <Customize />} />
          <Route path="/termnconditions" exact render={() => <Termnconditions />} />
          <Route path="/tab" exact render={() => <Tab />} />
          <Route path="/form" exact render={() => <CreateForm />} />
          <Route path="/productD" exact render={() => <ProductD />} />
          <Route path="/canvas" exact render={() => <MyCanvas />} />
          <Route path="/*" exact render={() => <NotFound />} />
          <Route path="/myLayers" exact render={() => <MyLayers />} />
          <Route path="/myLayers2" exact render={() => <MyLayers2 />} />
          <Route path="/tText" exact render={() => <TransformText />} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
    </StoreProvider>
   
  );
}
}

export default App;
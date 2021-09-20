import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { StoreProvider } from "./_util";
import ProtectedRoute from "./ProtectedRoute";

import Home from './pages/Home';
import Shop from './pages/Shop';
import Contactus from './pages/ContactUs';
import Authentication from './pages/Authentication';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import NewPassword from './pages/Authentication/NewPassword';
import Product_detail from './pages/Shop/Product_detail';
import MyCart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist';
import About from './pages/AboutUs';
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
import Deposit from './pages/Deposit/index.js';
import OrderDetail from './pages/MyOrders/orderDetail'
import CustCustomizeOrderDetails from './pages/MyOrders/CustomizeOrders';
import Types from './pages/Shop/Types';
import OrderView from './pages/MyOrders/OrderView'
import CustomizeCheckout from './pages/Checkout/CustomizeCheckout';
import Profile1 from './pages/MyAccount/index2';
import SpecialOffers from './pages/SpecialOffers';

import AdminPanel from './pages/Admin';
import Users from './pages/Admin/UserManagement/UserTable';
import Collections from './pages/Admin/CollectionTable';
import Designs from './pages/Admin/DesignTable';
import Inventory from './pages/Admin/InventoryTable';
import Coupon from './pages/Admin/Coupons/CouponTable';
import Offers from './pages/Admin/Offers/OffersTable';
import AvailableColors from './pages/Admin/AvailableColors/AvailableColorsTable';
import AvailableSizes from './pages/Admin/SizeTable';
import AvailableTypes from './pages/Admin/TypesTable';
import Inquiries from './pages/Admin/Inquiries/InquiriesTable';
import ResolvedInquiries from './pages/Admin/Inquiries/ResolvedInquiries'
import ViewDesigns from './pages/Admin/ViewDesignTable';
import DepositSlips from './pages/Admin/Deposit/depositSlips';
import AdminOrders from './pages/Admin/InhouseOrders/AdminOrders';
import CustomizeOrderDetails from './pages/Admin/CustomizeOrder/CustomizeOrderTable';
import OfferCollections from './pages/SpecialOffers/OfferCollections';


import Manager from './pages/Manager';
import Assistant from './pages/Assistant';
import NotFound from './pages/PageNotFound/Notfound';



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

class App extends Component {
  render() {
    return (
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route exact path={"/"} component={Home} />
              <Route exact path="/shop" component={Shop} />
              <Route exact path="/contactus" component={Contactus} />
              <Route exact path="/auth" component={Authentication} />
              <Route exact path={"/cart"} component={MyCart} />
              <Route exact path={"/productDetails/:id"} component={Product_detail} />
              <Route exact path={"/deposit"} component={Deposit} />
              <Route exact path={"/deposit/:id/:orderIdFromEmail"} component={Deposit} />
              <Route exact path={"/profile"} component={Profile1} />
              <Route exact path={"/myOrders"} component={OrderHistory} />
              <Route exact path={"/myOrders/:id"} component={OrderHistory} />
              <Route exact path={"/orderDetail/:oId"} component={OrderDetail} />
              <Route exact path={"/myWishlist"} component={ProfileWishlist} />
              <Route exact path={"/specialOffers/:id"} component={SpecialOffers} />
              <Route exact path={"/checkout"} component={Checkout} />
              <Route exact path={"/wishlist"} component={Wishlist} />
              <Route exact path={"/aboutUs"} component={About} />
              <Route exact path={"/forgotPassword"} component={ForgotPassword} />
              <Route exact path={"/reset/:token"} component={NewPassword} />
              <Route exact path={"/customize"} component={Customize} />
              <Route exact path={"/termnconditions"} component={Termnconditions} />
              <Route exact path={"/custcustomizeOrders"} component={CustCustomizeOrderDetails} />
              <Route exact path={"/customize/checkout/:id"} component={CustomizeCheckout} />
              <Route exact path={"/orderView/:id"} component={OrderView} />
              <Route exact path={"/offerCollections"} component={OfferCollections} />
              <Route exact path={"/types/:id"} component={Types} />

              <ProtectedRoute exact path={"/admin"} component={AdminPanel} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/users"} component={Users} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/collections"} component={Collections} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/inquiries"} component={Inquiries} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/resolvedinquiries"} component={ResolvedInquiries} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/designs"} component={Designs} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/inventory"} component={Inventory} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/coupon"} component={Coupon} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/offers"} component={Offers} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/availableColors"} component={AvailableColors} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/availableSizes"} component={AvailableSizes} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/availableTypes"} component={AvailableTypes} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/viewDesigns"} component={ViewDesigns} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/AdminOrders/:id"} component={AdminOrders} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/customizeOrders"} component={CustomizeOrderDetails} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />
              <ProtectedRoute exact path={"/depositlips"} component={DepositSlips} guardFunctionArgs={{ 'one': 'one' }} guardFunction={(args) => {
                const isAuth = localStorage.getItem('userType'); if (isAuth) return true; else return false;
              }} />

              <Route exact path={"/manager"} component={Manager} />
              <Route exact path={"/assistant"} component={Assistant} />
              <Route exact path="/*" component={NotFound} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </StoreProvider>

    );
  }

}

export default App;
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { StoreProvider } from "./_util";

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
              <Route exact path={"/profile1"} component={Profile} />
              <Route exact path={"/profile"} component={Profile1} />
              <Route exact path={"/myOrders"} component={OrderHistory} />
              <Route exact path={"/myOrders/:id"} component={OrderHistory} />
              <Route exact path={"/orderDetail/:oId"} component={OrderDetail} />
              <Route exact path={"/myWishlist"} component={ProfileWishlist} />
              <Route exact path={"/specialOffers/:id"} component={SpecialOffers} />
              <Route exact path="/admin" component={AdminPanel} />
              <Route exact path="/users" exact render={() => <Users />} />
              <Route exact path="/collections" exact render={() => <Collections />} />
              <Route exact path="/inquiries" exact render={() => <Inquiries />} />
              <Route exact path="/resolvedinquiries" exact render={() => <ResolvedInquiries />} />
              <Route exact path="/designs" exact render={() => <Designs />} />
              <Route exact path="/inventory" exact render={() => <Inventory />} />
              <Route exact path="/coupon" exact render={() => <Coupon />} />
              <Route exact path="/offers" exact render={() => <Offers />} />
              <Route exact path="/availableColors" exact render={() => <AvailableColors />} />
              <Route exact path="/availableSizes" exact render={() => <AvailableSizes />} />
              <Route exact path="/availableTypes" exact render={() => <AvailableTypes />} />
              <Route exact path="/viewDesigns" exact render={() => <ViewDesigns />} />
              <Route exact path="/checkout" exact render={() => <Checkout />} />
              <Route exact path="/wishlist" exact render={() => <Wishlist />} />
              <Route exact path="/aboutUs" exact render={() => <About />} />


              <Route exact path="/forgotPassword" component={ForgotPassword} />
              <Route exact path="/reset/:token" component={NewPassword} />
              <Route exact path={"/AdminOrders/:id"} component={AdminOrders} />

              <Route path="/customize" exact render={() => <Customize />} />
              <Route path="/termnconditions" exact render={() => <Termnconditions />} />
              <Route path="/tab" exact render={() => <Tab />} />
              <Route path="/form" exact render={() => <CreateForm />} />
              <Route path="/productD" exact render={() => <ProductD />} />
              <Route path="/canvas" exact render={() => <MyCanvas />} />

              <Route path="/myLayers" exact render={() => <MyLayers />} />
              <Route path="/myLayers2" exact render={() => <MyLayers2 />} />
              <Route path="/tText" exact render={() => <TransformText />} />

              <Route path="/manager" exact render={() => <Manager />} />
              <Route path="/assistant" exact render={() => <Assistant />} />
              <Route path="/customizeOrders" exact render={() => <CustomizeOrderDetails />} />
              <Route path="/custcustomizeOrders" exact render={() => <CustCustomizeOrderDetails />} />
              <Route path="/depositlips" exact render={() => <DepositSlips />} />
              <Route exact path={"/types/:id"} component={Types} />
              <Route exact path={"/orderView/:id"} component={OrderView} />
              <Route exact path={"/customize/checkout/:id"} component={CustomizeCheckout} />
              <Route path="/offerCollections" exact render={() => <OfferCollections />} />

              <Route path="/*" exact render={() => <NotFound />} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </StoreProvider>

    );
  }

}

export default App;
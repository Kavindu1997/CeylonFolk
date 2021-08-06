import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contactus from './pages/ContactUs';
import Authentication from './pages/Authentication';
import AdminPanel from './pages/Admin';
import Users from './pages/Admin/UserTable';
import DetailOfProduct from './components/Product_grid/DetailOfProduct';
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


const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact render={() => < Home />} />
          <Route path="/shop" exact render={() => < Shop />} />
          <Route path="/contactus" exact render={() => < Contactus />} />
          <Route path="/auth" exact render={() => < Authentication />} />
          <Route path="/productDetails" exact render={() => <DetailOfProduct />} />
          <Route path="/admin" exact render={() => <AdminPanel />} />
          <Route path="/users" exact render={() => <Users />} />
          <Route path="/cart" exact render={() => <MyCart />} />
          <Route path="/checkout" exact render={() => <Checkout />} />
          <Route path="/wishlist" exact render={() => <Wishlist />} />
          <Route path="/aboutUs" exact render={() => <About />} />
          <Route path="/profile" exact render={() => <Profile />} />
          <Route path="/myWishlist" exact render={() => <ProfileWishlist />} />
          <Route path="/myOrders" exact render={() => <OrderHistory />} />
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

        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
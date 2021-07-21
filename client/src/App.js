import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contactus from './pages/Contactus';
import Authentication from './pages/Authentication';
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/Users';
import DetailOfProduct from './components/Product_grid/DetailOfProduct';
import Collections from './pages/Collections'
import Inventory from './pages/Inventory';
import Design from './pages/Design';
import MyCart from './pages/MyCart'
import CheckingOut from './pages/CheckingOut'
import Coupon from './pages/Coupon';
import Wish from './pages/Wish';
import About from './pages/About';
import Profile from './pages/Profile';
import UserWishlist from './pages/UserWishlist';
import UserOrders from './pages/UserOrders';
import Customize from './pages/Customize';
import Tab from './pages/tab';
import Termnconditions from './pages/Termnconditions';


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
          <Route path="/admin" exact render={() => <AdminDashboard />} />
          <Route path="/users" exact render={() => <Users />} />
          <Route path="/cart" exact render={() => <MyCart />} />
          <Route path="/checkout" exact render={() => <CheckingOut />} />
          <Route path="/wishlist" exact render={() => <Wish />} />
          <Route path="/aboutUs" exact render={() => <About />} />
          <Route path="/profile" exact render={() => <Profile />} />
          <Route path="/myWishlist" exact render={() => <UserWishlist />} />
          <Route path="/myOrders" exact render={() => <UserOrders />} />
          <Route path="/collections" exact render={() => <Collections />} />
          <Route path="/coupon" exact render={() => <Coupon />} />
          <Route path="/inventory" exact render={() => <Inventory />} />
          <Route path="/designs" exact render={() => <Design />} />
          <Route path="/customize" exact render={() => <Customize />} />
          <Route path="/termnconditions" exact render={() => <Termnconditions />} />
          <Route path="/tab" exact render={() => <Tab/>}/>

        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
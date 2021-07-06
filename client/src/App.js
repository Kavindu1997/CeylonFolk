import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { createMuiTheme,ThemeProvider } from '@material-ui/core';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contactus from './pages/Contactus';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/Users';


const theme = createMuiTheme({
    typography: {
      fontFamily:'Work Sans',
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
      fontFamily:'Work+Sans',
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
    palette:{
        primary:{
            main:"#2C2D2D"
        },
        secondary:{
            main:"#1B9CFC"
        },
    }
  });


const App = () => {
  
    return(
        <ThemeProvider theme={theme}>
          <Router>
              <Route path="/index" exact render={() => < Home/>}/>
              <Route path="/shop" exact render={() => < Shop/>}/>
              <Route path="/contactus" exact render={() => < Contactus/>}/>       
              <Route path="/auth" exact render={() => < Auth/>}/>
              <Route path="/admin" exact render={() => <AdminDashboard/>}/>
              <Route path="/users" exact render={() => <Users/>}/>
          </Router>
        </ThemeProvider>
    );
}

export default App;
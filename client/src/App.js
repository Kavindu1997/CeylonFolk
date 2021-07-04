import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { createMuiTheme,ThemeProvider } from '@material-ui/core';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contactus from './pages/Contactus';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/Users';


const theme = createMuiTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        'Montserrat',
      ].join(','),
    },
    palette:{
        primary:{
            main:"#2C2D2D"
        }

    }
  });


const App = () => {
  
    return(
        <ThemeProvider theme={theme}>
          <Router>
              <Route path="/index" exact render={() => < Home/>}/>
              <Route path="/shop" exact render={() => < Shop/>}/>
              <Route path="/contactus" exact render={() => < Contactus/>}/>
              <Route path="/signup" exact render={() => < Signup/>}/>
              <Route path="/login" exact render={() => < Login/>}/>
              <Route path="/auth" exact render={() => < Auth/>}/>

              <Route path="/admin" exact render={() => <AdminDashboard/>}/>
              <Route path="/users" exact render={() => <Users/>}/>
          </Router>
        </ThemeProvider>
    );
}

export default App;
import React from 'react';
import useStyles from './styles';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contactus from './pages/Contactus';
import Login from './pages/Login';


const App = () => {
    const classes=useStyles();
    return(
        <>
          <Navbar/>
          <Router>
              <Route path="/index" exact render={() => < Home/>}/>
              <Route path="/shop" exact render={() => < Shop/>}/>
              <Route path="/about" exact render={() => < About/>}/>
              <Route path="/contactus" exact render={() => < Contactus/>}/>
              <Route path="/login" exact render={() => < Login/>}/>

          </Router>
          </>
    );
}

export default App;
import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Contactus from './pages/Contactus';
import Signup from './pages/Signup';
import Login from './pages/Login';


const App = () => {
  
    return(
        <>
          <Router>
              <Route path="/index" exact render={() => < Home/>}/>
              <Route path="/shop" exact render={() => < Shop/>}/>
              <Route path="/contactus" exact render={() => < Contactus/>}/>
              <Route path="/signup" exact render={() => < Signup/>}/>
              <Route path="/login" exact render={() => < Login/>}/>
          </Router>
        </>
    );
}

export default App;
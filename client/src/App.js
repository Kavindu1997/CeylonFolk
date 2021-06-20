import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Contactus from './pages/Contactus';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/Users';
const App = () => {
  
    return(
        <>
          <Router>
              <Route path="/index" exact render={() => < Home/>}/>
              <Route path="/shop" exact render={() => < Shop/>}/>
              <Route path="/contactus" exact render={() => < Contactus/>}/>
              <Route path="/signup" exact render={() => < Signup/>}/>
              <Route path="/login" exact render={() => < Login/>}/>

              <Route path="/admin" exact render={() => <AdminDashboard/>}/>
              <Route path="/users" exact render={() => <Users/>}/>
          </Router>
        </>
    );
}

export default App;
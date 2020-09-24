import React, { createContext, useState } from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Review from './components/Review/Review';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SetUserPhoto from './components/SetUserPhoto/SetUserPhoto';

export const UserContext  = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <img style={{height:'50px', borderRadius:'100%', marginTop:'5px'}} src={loggedInUser.photo} alt=""/>
        <h2>{loggedInUser.name}</h2>
        <h1 style={{color:'orange'}}>WELOCME: {loggedInUser.email}</h1>
        <Header />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/review">
            <Review />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/setPhoto">
            <SetUserPhoto />
          </Route>
          <PrivateRoute>
            <Shipment />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

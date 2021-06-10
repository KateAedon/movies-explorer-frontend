import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path ='/'>
        <Header />
        <Promo />
        <NavTab />
        <Main />
      </Route>
      
      
    </div>
  );
}

export default App;

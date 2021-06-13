import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import './App.css';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function App() {

  const isloggedIn = true; //change to false!

  

  return (
    <div className="App">
      <Route exact path ='/'>
        <Header isLoggedIn={isloggedIn}/>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
        <Main />
      </Route>
      
      
    </div>
  );
}

export default App;

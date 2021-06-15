import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import './App.css';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {

  const isloggedIn = true; //change to false!

  

  return (
    <div className="App">
      <Route exact path ='/'>
      
        <Register />
        {/*<PageNotFound />
        <Header isLoggedIn={isloggedIn}/>*
        {/* <Movies />
            <Main /> 
        <Footer />*/}
      </Route>
      
      
    </div>
  );
}

export default App;

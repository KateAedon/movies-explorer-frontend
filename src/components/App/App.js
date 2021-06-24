import React, { useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import './App.css';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import MoviesApi from '../../utils/MoviesApi';
import moviesApi from '../../utils/MoviesApi';

function App() {

  const [moviesData, setMoviesData] = React.useState([]);

  useEffect(() => {
    moviesApi
      .getMoviesData()
      .then(res => {
        setMoviesData(res)
      })
  }, []);

  console.log(moviesData);

  const isloggedIn = true; //change to false!

  return (
    <div className='App'>
      <div className='app_container'>
        <Route exact path ={['/', '/movies', '/saved-movies', '/profile']}>
          <Header isLoggedIn={isloggedIn} />
        </Route>
        
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>

          <Route exact path='/movies'>
            <Movies movies={ moviesData }/>
          </Route>

          <Route exact path='/saved-movies'>
            <SavedMovies />
          </Route>

          <Route exact path='/profile'>
            <Profile />
          </Route>

          <Route exact path='/signin'>
            <Login />
          </Route>

          <Route exact path='/signup'>
            <Register />
          </Route>

          <Route component={PageNotFound} />

        </Switch>

        <Route exact path ={['/', '/movies', '/saved-movies']}>
          <Footer />
        </Route>

      </div>
    </div>
  );
}

export default App;

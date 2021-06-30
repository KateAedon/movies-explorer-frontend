import React, { useEffect } from 'react';
import { Route, Switch, useHistory, Redirect, withRouter } from 'react-router-dom';
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
import moviesApi from '../../utils/MoviesApi';
import api from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [moviesData, setMoviesData] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });

  React.useEffect(() => {
    moviesApi
      .getMoviesData()
      .then(res => {
        setMoviesData(res)
      })
  }, []);

  React.useEffect((res) => {
    api
    .getProfileInfo(res)
    .then(res => {
        setCurrentUser(res)
})
.catch((err) => {
    console.log(err)
})
}, [])

  const history = useHistory();

  function checkToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      api
      .checkToken(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((error) => {
        console.log(error)
      });
    }
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  function handleRegister( name, email, password ) {
    api
    .register( name, email, password )
    .then((res) => {
      if (res) {
        handleLogin( email, password )
      }
      alert('Вы успешно зарегистрировались!');
      history.push('/movies')
    })
    .catch((err) => {
      console.log(err)
  })
  }

  function handleLogin( email, password ) {
    api
    .login( email, password )
    .then((res) => {
        // setEmail(data.email);
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        history.push('/movies');
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleLogOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/signin');
  }

  function handleUpdateUser(data) {
    api
    .updateProfileInfo(data)
    .then(data => {
      setCurrentUser(data)
      history.push('/')
    })
    .catch((err) => {
        console.log(err)
    })
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className='App'>
      <div className='app_container'>
        <Route exact path ={['/', '/movies', '/saved-movies', '/profile']}>
          <Header isLoggedIn={isLoggedIn} />
        </Route>
        
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>

          <ProtectedRoute
            exact
            path='/movies'
            loggedIn={isLoggedIn}
            component={Movies}
            movies={moviesData}
          />

        <ProtectedRoute
              exact
              path='/saved-movies'
              loggedIn={isLoggedIn}
              component={SavedMovies}
              movies={moviesData}
            />    

        <ProtectedRoute
              exact
              path='/profile'
              loggedIn={isLoggedIn}
              component={Profile}
              onUpdateUser={handleUpdateUser}
              onLogOut={handleLogOut}
              currentUser={currentUser}
            />  

          <Route exact path='/signin'>
            <Login 
              onLogin={handleLogin} 
              onClick={setData} 
              data={data} 
            />
          </Route>

          <Route exact path='/signup'>
            <Register onRegister={ handleRegister } />
          </Route>

          <Route path='*'>
            <PageNotFound />
          </Route>

        </Switch>

        <Route exact path ={['/', '/movies', '/saved-movies']}>
          <Footer />
        </Route>

      </div>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;

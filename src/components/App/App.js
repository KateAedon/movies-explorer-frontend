import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect, withRouter } from 'react-router-dom';
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
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [isMovieSaved, setIsMovieSaved] = React.useState(false);
  const [data, setData] = React.useState({ mail: '', password: '' });

  const history = useHistory();
  const location = useLocation();

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

function getAllMovies() {
  moviesApi
    .getMoviesData()
    .then((data) => {
      formatMoviesData(data);
    })
    .catch((error) => {
      console.log(error);
    })
}

function getSavedMovies() {
  api
    .getSavedMovies()
    .then((res) => {
      localStorage.setItem('savedMovies', JSON.stringify(res))
    })
    .catch((error) => {
      console.log(error);
    }) 
}



function handleSaveMovie(movie) {
    api
      .saveMovie(movie)
      .then((res) => {
       setSavedMovies([...savedMovies, { ...res, id: res.movieId }])
      localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, { ...res, id: res.movieId }]));
      setIsMovieSaved(true);
      })
      .catch((error) => {
        console.log(error);
      })
  }

function handleRemoveMovie (movie) {
  const movieId = savedMovies.find((item) => item._id === movie._id)._id;

  api
      .deleteMovie(movieId)
      .then((res) => {
        if (res) {
          const newSaved = savedMovies.filter((item) => item.movieId !== res.movieId);
          setSavedMovies(newSaved)
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function handleBookmark(movie) {
    console.log(movie, 'movie')
    const isSaved = savedMovies.find((item)=> item.movieId.toString() === movie.movieId);
    console.log(isSaved, 'isSaved')
    if (isSaved) {
      handleRemoveMovie(isSaved);
    } else {
      handleSaveMovie(movie);
    }
  }

React.useEffect(() => {
  if (isLoggedIn) {
    api
      .getSavedMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies)
      })
      .catch((err) => console.log(err));
  }
}, [isLoggedIn]);

function formatMoviesData(movies) {
  const allMovies = movies.map((movie) => {
    return {
        movieId: `${movie.id}`,
        country: `${movie.country ? `${movie.country}` : `Нет данных`}`,
        director: `${movie.director ? `${movie.director}` : `Нет данных`}`,
        duration: `${movie.duration ? `${movie.duration}` : `0`}`,
        year: `${movie.year ? `${movie.year}` : `0`}`,
        description: `${movie.description ? `${movie.description}` : `Нет данных`}`,
        image: `${movie.image && movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : ``}`,
        trailer: `${movie.trailerLink ?  `${movie.trailerLink}` : `https://youtube.com`}`,
        thumbnail: `${movie.image && movie.image.formats && movie.image.formats.thumbnail && movie.image.formats.thumbnail.url ? `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}` : `https://sun9-21.userapi.com/impg/OBUbO8dqPtjzr0BXCnW4hDXaWrNzse_DduMJfA/7VsYiVFOOW8.jpg`}`,
        nameRU: `${movie.nameRU}` || `Нет данных`,
        nameEN: `${movie.nameEN}` || `Нет данных`
    }
  });

  localStorage.setItem('allMovies', JSON.stringify(allMovies));
}

useEffect(() => {
  const allMoviesArray = JSON.parse(localStorage.getItem('allMovies'));
  if (allMoviesArray) {
    setMoviesData(allMoviesArray);
  } else {
    getAllMovies();
  }
}, []);


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
            savedMovies={savedMovies}
            handleSaveMovie={handleSaveMovie}
            handleBookmark={handleBookmark}
            handleRemoveMovie={handleRemoveMovie}
          />

        <ProtectedRoute
              exact
              path='/saved-movies'
              loggedIn={isLoggedIn}
              component={SavedMovies}
              movies={moviesData}
              savedMovies={savedMovies}
              handleBookmark={handleBookmark}
              handleRemoveMovie={handleRemoveMovie}
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

import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect, withRouter } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
import { shortMovieLength } from '../../utils/constants';

function App() {

  const [currentUser, setCurrentUser] = React.useState([]);
  const [data, setData] = React.useState({ mail: '', password: '' });
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const [allMovies, setAllMovies] = React.useState([]); // все фильмы с сервера
  const [savedMovies, setSavedMovies] = React.useState([]); // фильмы добавленные пользователем
  const [shortMovieToggle, setShortMovieToggle] = React.useState(false);
  const [foundMovies, setFoundMovies] = React.useState([]); // найденные фильмы
  const [isMovieSaved, setIsMovieSaved] = React.useState(false);
  
  const [isComponentSavedMovies, setIsComponentSavedMovies] = React.useState(false);
  const [isPreloaderShown, setIsPreloaderShown] = React.useState(false);

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
    .then(({ _id, name, email }) => {
      if (_id) {
        setCurrentUser( name, email );
        localStorage.setItem('userId', _id);
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
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('userId');
    setLoggedIn(false);
    setCurrentUser('');
    setData('');
    setSavedMovies('');
    setFoundMovies('');
    history.push('/');
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
    showPreloader(true);
    moviesApi
      .getMoviesData()
      .then((data) => {
        formatMoviesData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        showPreloader(false);
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
      
  function filterShortMovies () {
    if (location.pathanme === 'saved-movies') {
      return savedMovies.filter((movie) => movie.duration < shortMovieLength);
    } else {
      return foundMovies.filter((movie) => movie.duration < shortMovieLength);
    }
  }
    

  const handleShortMovieToggle = () => setShortMovieToggle(!shortMovieToggle);

  function handleMovieSearch(searchInput) {
    setIsPreloaderShown(true);
    if (location.pathname === 'saved-movies') {
      setSavedMovies(savedMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchInput.toLowerCase());
      }))
    } else {
      setFoundMovies(allMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchInput.toLowerCase());
      }))
    }
    setIsPreloaderShown(false);
  }

  function handleSaveMovie(movie) {
    const isSaved = savedMovies.some(i => i.movieId === movie.movieId);
    if (!isSaved) {
        api
        .saveMovie(movie)
        .then((newSavedMovie) => {
        setSavedMovies([newSavedMovie, ...savedMovies]);
        localStorage.setItem('savedMovies', JSON.stringify([newSavedMovie, ...savedMovies]));
        setIsMovieSaved(true);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  function handleRemoveMovie (movie) {
  // const movieId = savedMovies.find((item) => item._id === movie._id)._id;
  const savedMovie = savedMovies.find(i => i.movieId.toString() === movie.movieId.toString());
    api
        .deleteMovie(savedMovie._id)
        .then(() => {
          const newSavedMoviesList = savedMovies.filter((newSavedMovie) => {
            return newSavedMovie.movieId !== savedMovie.movieId;
          });
          setSavedMovies(newSavedMoviesList);
          setIsMovieSaved(false);
          localStorage.setItem('savedMovies', JSON.stringify(newSavedMoviesList))
        })
        .catch((err) => {
          console.error(err);
        });
    };

  function handleBookmark(movie) {
    const isSaved = savedMovies.some(i => i.movieId === movie.movieId);
      if (!movie._id && !isSaved) {
        handleSaveMovie(movie);
      } else {
        handleRemoveMovie(movie);
      }
    }

  React.useEffect(() => {
    if (!isLoggedIn) 
      return;
    
      const token = localStorage.getItem('token');
      if (token) {
        api
          .getSavedMovies()
          .then((res) => {
            if (res) {
              setSavedMovies(res);
              localStorage.setItem('savedMovies', JSON.stringify(res) );
            }
          })
          .catch((err) => console.log(err));
      }
    // if (isLoggedIn) {
    //   api
    //     .getSavedMovies()
    //     .then((savedMovies) => {
    //       setSavedMovies(savedMovies)
    //     })
    //     .catch((err) => console.log(err));
    // }
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

  React.useEffect(() => {
    const allMoviesArray = JSON.parse(localStorage.getItem('allMovies'));
    if (allMoviesArray) {
      setAllMovies(allMoviesArray);
    } else {
      getAllMovies();
    }
  }, []);

  function showPreloader(isDataLoading) {
    isDataLoading ? setIsPreloaderShown(true) : setIsPreloaderShown(false);
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
            movies={allMovies}
            savedMovies={savedMovies}
            foundMovies={foundMovies}
            shortMovies={handleShortMovieToggle}
            shortMovieFilter={filterShortMovies}
            handleMovieSearch={handleMovieSearch}
            handleSaveMovie={handleSaveMovie}
            handleBookmark={handleBookmark}
            handleRemoveMovie={handleRemoveMovie}
            preloader={isPreloaderShown}
          />

        <ProtectedRoute
              exact
              path='/saved-movies'
              loggedIn={isLoggedIn}
              component={SavedMovies}
              movies={allMovies}
              savedMovies={savedMovies}
              foundMovies={foundMovies}
              shortMovies={handleShortMovieToggle}
              handleMovieSearch={handleMovieSearch}
              handleBookmark={handleBookmark}
              handleRemoveMovie={handleRemoveMovie}
              preloader={isPreloaderShown}
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

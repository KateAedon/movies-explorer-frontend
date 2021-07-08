import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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

  // пользователь
  const [currentUser, setCurrentUser] = React.useState([]);
  const [data, setData] = React.useState({ mail: '', password: '' });
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  //фильмы
  const [allMovies, setAllMovies] = React.useState([]); // все фильмы с сервера
  const [savedMovies, setSavedMovies] = React.useState([]); // фильмы в избранном
  const [foundMovies, setFoundMovies] = React.useState([]); // найденные фильмы
  const [foundSavedMoveis, setFoundSavedMoveis] = React.useState([]); // найденные фильмы в избранном
  const [isShortMovies, setIsShortMovies] = React.useState(true);
  const [loadingError, setLoadingError] = React.useState('');
  const [noMoviesFound, setNoMoviesFound] = React.useState(true);
  
  const [isPreloaderShown, setIsPreloaderShown] = React.useState(false);

  const history = useHistory();
  const location = useLocation().pathname;

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
      alert(`${err.message}`)
      console.log(err)
  })
  }

  function handleLogin( email, password ) {
    api
    .login( email, password )
    .then((res) => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        alert('Добро пожаловать!');
        history.push('/movies');
    })
    .catch((err) => {
      alert(`${err.message}`)
      console.log(err);
    })
  }

  function handleLogOut() {
    localStorage.clear()
    setLoggedIn(false);
    setCurrentUser('');
    setData('');
    setSavedMovies([]);
    setFoundMovies([]);
    setFoundSavedMoveis([]);
    history.push('/');
  }

  function handleUpdateUser(data) {
    api
    .updateProfileInfo(data)
    .then(data => {
      setCurrentUser(data)
      alert('Информация успешно обновлена')
    })
    .catch((err) => {
        console.log(err)
    })
    }

  React.useEffect(() => {
    if (isLoggedIn) {
      getSavedMovies();
      getAllMovies();
    }
  }, [isLoggedIn])

  React.useEffect(() => {
  
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));
    if (allMovies) {
      setAllMovies(allMovies);
    } else {
      getAllMovies();
    }

    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (savedMovies) {
      setSavedMovies(savedMovies);
    } else {
      getSavedMovies();
    }
  }, []);

  function showPreloader(isDataLoading) {
    isDataLoading ? setIsPreloaderShown(true) : setIsPreloaderShown(false);
  }
  
  //function showNoMoviesFound(searchInput) {
  //  searchInput.length === 0 ? setNoMoviesFound(true) : setNoMoviesFound(false);
  //}
    
  function getAllMovies() {
    showPreloader(true);
    moviesApi
      .getMoviesData()
      .then((data) => {
        formatMoviesData(data);
      })
      .catch(() => {
        setLoadingError('Во время запроса произошла ошибка. '
          + 'Возможно, проблема с соединением или сервер недоступен. '
          + 'Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        showPreloader(false);
      })
  }

  React.useEffect(() => {
      localStorage.setItem('allMovies', JSON.stringify(allMovies));
    }, [allMovies, isLoggedIn]) 

  function getSavedMovies() {
    showPreloader(true);
    api
      .getSavedMovies()
      .then((res) => {
        const savedMovies = res.map((item) => { return { ...item, id: item.movieId } })
        const userSavedMovies = savedMovies.filter(item => item.owner === currentUser._id);
        setSavedMovies(userSavedMovies);
      })
      .catch(() => {
        setLoadingError('Во время запроса произошла ошибка. '
          + 'Возможно, проблема с соединением или сервер недоступен. '
          + 'Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        showPreloader(false);
      })
  }

  React.useEffect(() => {
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }, [savedMovies, isLoggedIn])

  // фильтр короткометражек
  const shortMovies = (foundMovies) => foundMovies.filter((movie) =>  movie.duration < shortMovieLength)  
  const handleShortMovieToggle = () => setIsShortMovies(!isShortMovies);

  React.useEffect(() => {
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies))
  }, [foundMovies])

  React.useEffect(() => {
    localStorage.setItem('foundMoviesSaved', JSON.stringify(foundSavedMoveis))
  }, [foundSavedMoveis])

  function handleMovieSearch(searchInput) {
    setIsPreloaderShown(true);
    if (location === '/saved-movies') {
      setFoundSavedMoveis(savedMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchInput.toLowerCase());
      }))
    } if (location === '/movies') {
      setFoundMovies(allMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchInput.toLowerCase());
      }))
    }
    setIsPreloaderShown(false);
  }

  function handleSaveMovie(movie) {
        api
        .saveMovie(movie)
        .then((newSavedMovie) => {
        setSavedMovies([newSavedMovie, ...savedMovies]);
        localStorage.setItem('savedMovies', JSON.stringify([newSavedMovie, ...savedMovies]));
        })
        .catch((error) => {
          console.log(error);
        })
  }

  function handleRemoveMovie (movie) {
    const savedMovieDelete = savedMovies.find((item) => item.id === movie.id);
  const movieId = savedMovieDelete._id;

    api
        .deleteMovie(movieId)
        .then((res) => {
          if (res) {
            if (location === "/movies") {
              const updatedSavedMovies = savedMovies.filter((movie) => { return movie._id !== movieId})
              setSavedMovies(updatedSavedMovies)
            } else {
              const updatedSavedMovies = savedMovies.filter((movie) => { return movie._id !== movieId})
              setSavedMovies(updatedSavedMovies)
              setFoundSavedMoveis((oldArray) => 
              oldArray.filter((movie) => movie._id !== movieId));
            }
            }
          })
        .catch((err) => {
          console.error(err);
        });
    };
   
  const isMovieSaved = (movie) => savedMovies.some(i => i.movieId.toString() === movie.movieId.toString());

  const handleBookmark = (movie, isMovieAdded) => (isMovieAdded ? handleRemoveMovie(movie, foundMovies, foundSavedMoveis) : handleSaveMovie(movie) );

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
            isMovieSaved={isMovieSaved}
            savedMovies={savedMovies}
            foundMovies={foundMovies}
            shortMovies={shortMovies}
            isShortMovies={isShortMovies}
            handleShortMovieToggle={handleShortMovieToggle}
            handleMovieSearch={handleMovieSearch}
            handleSaveMovie={handleSaveMovie}
            handleBookmark={handleBookmark}
            handleRemoveMovie={handleRemoveMovie}
            noMoviesFound={noMoviesFound}
            preloader={isPreloaderShown}
          />

        <ProtectedRoute
              exact
              path='/saved-movies'
              loggedIn={isLoggedIn}
              component={SavedMovies}
              savedMovies={savedMovies}
              foundMovies={foundSavedMoveis}
              shortMovies={shortMovies}
              handleShortMovieToggle={handleShortMovieToggle}
              isShortMovies={isShortMovies}
              handleMovieSearch={handleMovieSearch}
              handleBookmark={handleBookmark}
              handleRemoveMovie={handleRemoveMovie}
              noMoviesFound={noMoviesFound}
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

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './MoviesCard.css';

function MoviesCard({ movie, handleBookmark, handleSaveMovie, handleRemoveMovie, savedMovies, }) {

    const [currentUser, setCurrentUser] = React.useState([]);
 //const [isMovieSaved, setIsMovieSaved] = useState(false);
    const isMovieSaved = savedMovies.find((i) => i.movieId.toString() === movie.movieId.toString()); //&& i.owner === currentUser.id);
    const movieButtonClassname = (`${isMovieSaved ? 'movies-card_saved-icon' : 'movies-card_save-button'}`);
    const savedMovieButtonClassname = (`${isMovieSaved ? 'movies-card_remove-button' : ''}`);
    const location = useLocation();
    const { nameRU, trailerLink, image, duration } = movie;

    const minutesToHours = (time) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return(`${hours > 0 ? `${hours}ч ` : ''}${minutes}м`);
    }

    // function checkButtonState(savedMovies, movie) {
    //     const res = savedMovies.some((el) => el.nameRU === movie.nameRU);
    //     //const res = savedMovies.find((i) => i.movieId.toString() === movie.movieId.toString());
    //      console.log('res', res);
    //      return res;
    // }
    
    function onSaveClick() {
        handleBookmark(movie);
  
    }

    function onRemoveClick() {
        handleRemoveMovie(movie);

    }

    //  useEffect(() => {
    //      const buttonState = checkButtonState(savedMovies, movie)
    //      setIsMovieSaved(buttonState);
    //    }, [savedMovies, movie]);

    return (
        <section className='movies-card'>
            <div className='movies-card_container'>
                {(location.pathname ==='/movies')

                    ? (<button 
                        className={movieButtonClassname} 
                        type='button'
                        onClick={onSaveClick}>
                    </button> )

                    : (<button 
                        className={savedMovieButtonClassname} 
                        type='button'
                        onClick={onRemoveClick}>
                    </button> )

                }            
               <a href={trailerLink} className='movies-card_link' >
                    <img className='movies-card_cover' alt='изображение к фильму' src={image} />
                </a>
                <div className='movies-card_data'>
                    <h4 className='movies-card_title'>{nameRU}</h4>
                    <p className='movies-card_length'>{minutesToHours(duration)}</p>
                </div>
            </div>
        </section>
    );
}

export default MoviesCard;
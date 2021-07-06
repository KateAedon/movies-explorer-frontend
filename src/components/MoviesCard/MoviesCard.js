import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ 
    movie, 
    handleBookmark, 
    handleSaveMovie, 
    handleRemoveMovie, 
    savedMovies, 
    isMovieSaved,
}) {

    const location = useLocation();
    const isSaved = (location.pathname === "/saved-movies" ? true : isMovieSaved(movie)) ;
    const movieButtonClassname = (`${isSaved ? 'movies-card_saved-icon' : 'movies-card_save-button'}`);
    const savedMovieButtonClassname = (`${isSaved ? 'movies-card_remove-button' : ''}`);    
    const { nameRU, trailer, image, duration } = movie;
    
    const minutesToHours = (time) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return(`${hours > 0 ? `${hours}ч ` : ''}${minutes}м`);
    }
    
    function onSaveClick(e) {
        e.preventDefault();
        handleBookmark(movie, isSaved); 
    }

    function onRemoveClick() {
        handleRemoveMovie(movie);
    }

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
               <a href={trailer} className='movies-card_link' >
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
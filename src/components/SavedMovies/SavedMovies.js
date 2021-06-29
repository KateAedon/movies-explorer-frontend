import React from 'react';
import SavedMovieIcon from '../SavedMovieIcon/SavedMovieIcon';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies({ movies }) {
    return (
        <div className='saved-movies'>
            <MoviesCardList addedMovie='true' data={movies}/>
        </div>
    );
}

export default SavedMovies;
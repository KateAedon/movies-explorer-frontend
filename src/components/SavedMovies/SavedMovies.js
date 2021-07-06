import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies({ 
    savedMovies,
    foundMovies, 
    handleMovieSearch, 
    handleRemoveMovie, 
    handleBookmark, 
    isShortMovies,
    handleShortMovieToggle,
    shortMovies, 
    preloader, 
    }) {


    return (
        <div className='movies'>
            <SearchForm 
                onFilterCheckbox={handleShortMovieToggle}
                handleMovieSearch={handleMovieSearch}
            />
            { preloader && <Preloader/>} 
            <MoviesCardList 
                data={ isShortMovies ? shortMovies(foundMovies) : foundMovies }
                savedMovies={savedMovies}
                handleRemoveMovie={handleRemoveMovie}
                handleBookmark={handleBookmark}
            />
        </div>
    );
}

export default SavedMovies;
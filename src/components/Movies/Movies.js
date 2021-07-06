import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({ 
    savedMovies,
    foundMovies,
    isMovieSaved,
    handleMovieSearch, 
    handleSaveMovie, 
    handleRemoveMovie, 
    handleBookmark,
    isShortMovies,
    handleShortMovieToggle,
    shortMovies,
    noMoviesFound, 
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
                isMovieSaved={isMovieSaved}
                handleSaveMovie={handleSaveMovie}
                handleRemoveMovie={handleRemoveMovie}
                savedMovies={savedMovies}
                handleBookmark={handleBookmark}
            />
        </div>
    );
}

export default Movies;
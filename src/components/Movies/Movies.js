import React from 'react';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({ 
    movies, 
    savedMovies,
    foundMovies,
    handleMovieSearch, 
    handleSaveMovie, 
    handleRemoveMovie, 
    handleBookmark,
    handleShortMovieFilter,
    filterShortMovies, 
    preloader}) {

    return (
        <div className='movies'>
            <SearchForm 
                onFilterCheckbox={handleShortMovieFilter}
                handleMovieSearch={handleMovieSearch}
                 />
            { preloader && <Preloader/>}
            <MoviesCardList 
                data={ filterShortMovies ? filterShortMovies() : foundMovies }
                handleSaveMovie={handleSaveMovie}
                handleRemoveMovie={handleRemoveMovie}
                savedMovies={savedMovies}
                handleBookmark={handleBookmark}
            />
            <LoadMoreButton />
        </div>
    );
}

export default Movies;
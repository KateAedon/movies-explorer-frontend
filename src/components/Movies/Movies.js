import React from 'react';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies() {
    return (
        <div className='movies'>
            <SearchForm />
            <Preloader />
            <MoviesCardList />
            <LoadMoreButton />
        </div>
    );
}

export default Movies;
import React from 'react';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({ movies }) {
    return (
        <div className='movies'>
            <SearchForm />
            {/* <Preloader /> */}
            <MoviesCardList data={ movies }/>
            <LoadMoreButton />
        </div>
    );
}

export default Movies;
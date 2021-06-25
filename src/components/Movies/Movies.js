import React from 'react';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import { shortMovieLength } from '../../utils/constants';
import './Movies.css';

function Movies({ movies }) {

    // фильтрация фильмов по длительности
    const [isShortMovieFilterOn, setIsShortMovieFilterOn] = React.useState(true);
    const handleShortMovieFilter = () => {
        setIsShortMovieFilterOn(!isShortMovieFilterOn);
    }
    const filterMoviesByLength = ( allMovies ) => allMovies.filter((movie) => movie.duration < shortMovieLength);


    return (
        <div className='movies'>
            <SearchForm onFilterCheckbox={ handleShortMovieFilter } />
            {/* <Preloader /> */}
            <MoviesCardList data={ isShortMovieFilterOn ? filterMoviesByLength(movies) : movies }/>
            <LoadMoreButton />
        </div>
    );
}

export default Movies;
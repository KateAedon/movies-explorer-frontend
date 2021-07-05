import React from 'react';
import SavedMovieIcon from '../SavedMovieIcon/SavedMovieIcon';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { shortMovieLength } from '../../utils/constants';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';


function SavedMovies({ movies, savedMovies, handleRemoveMovie, handleBookmark, preloader }) {
    const [isShortMovieFilterOn, setIsShortMovieFilterOn] = React.useState(true);
    const handleShortMovieFilter = () => {
        setIsShortMovieFilterOn(!isShortMovieFilterOn);
    }
    const filterMoviesByLength = ( allMovies ) => allMovies.filter((movie) => movie.duration < shortMovieLength);


    return (
        <div className='movies'>
            <SearchForm onFilterCheckbox={ handleShortMovieFilter } />
            { preloader && <Preloader/>} 
            <MoviesCardList 
                data={ isShortMovieFilterOn ? filterMoviesByLength(savedMovies) : savedMovies }
                savedMovies={savedMovies}
                handleRemoveMovie={handleRemoveMovie}
                handleBookmark={handleBookmark}
            />
            <LoadMoreButton />
        </div>
    );
}

export default SavedMovies;
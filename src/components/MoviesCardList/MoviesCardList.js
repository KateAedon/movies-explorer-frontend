import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import { 
    desktop_resolution, 
    tablet_resolution, 
} from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList({
    isMovieSaved, 
    handleSaveMovie, 
    handleRemoveMovie, 
    handleBookmark, 
    data, 
    savedMovies, 
    foundMovies }) {
     
    const [showMovies, setShowMovies] = useState([]);
    const [currentMoviesNumber, setCurrentMoviesNumber] = useState(0);
    const [moreMovies, setMoreMovies] = useState(3);
     
    const resizeHandler = () => {
        const windowSize = window.innerWidth;
        setMoreMovies(getMoviesNumber(windowSize));
      };

    const getMoviesNumber = (windowSize) => {

        const isDesktop = windowSize >= desktop_resolution;
        const isTablet = (windowSize >= tablet_resolution) && (windowSize < desktop_resolution);
       
        if (isDesktop) {
          return { first: 12, extra: 3 };
        } if (isTablet) {
          return { first: 8, extra: 2 };
        }
        return { first: 5, extra: 2 };
      };

    const showExtraMovies = () => {
        const number = Math.min(data.length, currentMoviesNumber + moreMovies);
        const extraMovies = data.slice(currentMoviesNumber, number);
        setShowMovies([...showMovies, ...extraMovies]);
        setCurrentMoviesNumber(number);
    }

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    })

    useEffect(() => {
        const windowSize = window.innerWidth;
        setMoreMovies(getMoviesNumber(windowSize).extra);
        const number = Math.min(data.length, getMoviesNumber(windowSize).first);
        setShowMovies(data.slice(0, number));
        setCurrentMoviesNumber(number);
      }, [data]);

      const showMore = () => showExtraMovies();

    return (
        <section className='movies-card-list'>
            <ul className='movies-card-list_list'>
                {showMovies.map((item) => (
                    <li className='' key={item.id || item._id}>
                        <MoviesCard
                            movie={item}
                            isMovieSaved={isMovieSaved}
                            savedMovies={savedMovies}
                            foundMovies={foundMovies}
                            handleSaveMovie={handleSaveMovie}
                            handleRemoveMovie={handleRemoveMovie}
                            handleBookmark={handleBookmark}
                        />
                    </li> 
                ))}
            </ul>
            { currentMoviesNumber < data.length && <LoadMoreButton onClick={showMore} />}
        </section>
    );
}

export default MoviesCardList;
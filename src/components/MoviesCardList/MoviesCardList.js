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
    foundMovies,
    noMoviesFound
 }) {
     
    const [showMovies, setShowMovies] = useState([]);
    const [currentMoviesNumber, setCurrentMoviesNumber] = useState(0);
    const [moreMovies, setMoreMovies] = useState(3);
    const [userScreenSize, setUserScrennSize] = useState(window.innerWidth);
    
    function checkUserScrenSize() {
        setTimeout(() => {
            setUserScrennSize(window.innerWidth);
        }, 1000);
    }

    const resizeHandler = () => {
       // const userScreenSize = window.innerWidth;
        setMoreMovies(getMoviesNumber(userScreenSize));
      };

    const getMoviesNumber = (userScreenSize) => {

        const isDesktop = userScreenSize >= desktop_resolution;
        const isTablet = (userScreenSize >= tablet_resolution) && (userScreenSize < desktop_resolution);
       
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
        checkUserScrenSize();
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    })

    useEffect(() => {
        const userScreenSize = window.innerWidth;
        setMoreMovies(getMoviesNumber(userScreenSize).extra);
        const number = Math.min(data.length, getMoviesNumber(userScreenSize).first);
        setShowMovies(data.slice(0, number));
        setCurrentMoviesNumber(number);
      }, [data]);

      const showMore = () => showExtraMovies();

    return (
        <section className='movies-card-list'>
            <ul className='movies-card-list_list'>
                {noMoviesFound &&
                    <p className='movies-card-list_no-results'>Ничего не найдено</p>
                }
                {!noMoviesFound && 
                showMovies.map((item) => (
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
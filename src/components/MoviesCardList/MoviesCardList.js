import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

function MoviesCardList({ handleSaveMovie, handleRemoveMovie, handleBookmark, data, savedMovies }) {

    
    return (
        <section className='movies-card-list'>
            <ul className='movies-card-list_list'>
                {data.map((item) => (
                        <MoviesCard
                            key={item.id || item._id}  
                            movie={item}
                            savedMovies={savedMovies}
                            handleSaveMovie={handleSaveMovie}
                            handleRemoveMovie={handleRemoveMovie}
                            handleBookmark={handleBookmark}
                        />
                ))}
            </ul>
        </section>
    );
}

export default MoviesCardList;
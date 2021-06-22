import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList(addedMovie) {
    return (
        <section className='movies-card-list'>
            <ul className='movies-card-list_list'>
                <MoviesCard savedMovie='true' />
                <MoviesCard addedMovie={addedMovie} savedMovie='false'/>
                <MoviesCard />
                <MoviesCard />
            </ul>
        </section>
    );
}

export default MoviesCardList;
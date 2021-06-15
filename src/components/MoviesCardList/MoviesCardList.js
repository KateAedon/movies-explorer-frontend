import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList() {
    return (
        <section className='movies-card-list'>
            <ul className='movies-card-list_list'>
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </ul>
        </section>
    );
}

export default MoviesCardList;
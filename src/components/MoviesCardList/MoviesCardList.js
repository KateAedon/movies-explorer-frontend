import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList( {data} ) {
    return (
        <section className='movies-card-list'>
            <ul className='movies-card-list_list'>
                {data.map((item) => (
                    <li key={item.id}>
                        <MoviesCard  
                            movie={item}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default MoviesCardList;
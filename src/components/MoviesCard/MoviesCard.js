import React from 'react';
import './MoviesCard.css';
import cover1 from '../../images/movie1_cover.svg'
import SaveMovieButton from '../SaveMovieButton/SaveMovieButton';
import RemoveMovieButton from '../RemoveMovieButton/RemoveMovieButton';
import SavedMovieIcon from '../SavedMovieIcon/SavedMovieIcon';

function MoviesCard({savedMovie, addedMovie}) {
    return (
        <section className='movies-card'>
            <div className='movies-card_container'>
                <img className='movies-card_cover' alt='изображение к фильму' src={cover1} />
                {savedMovie ? <RemoveMovieButton /> : <SaveMovieButton />}
                {addedMovie ? <SavedMovieIcon /> : ''}
                <div className='movies-card_data'>
                    <h4 className='movies-card_title'>33 слова о дизайне</h4>
                    <p className='movies-card_length'>1ч 17м</p>
                </div>
            </div>
        </section>
    );
}

export default MoviesCard;
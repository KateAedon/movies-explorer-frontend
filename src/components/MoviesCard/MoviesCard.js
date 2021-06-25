import React from 'react';
import './MoviesCard.css';
import { movies_url } from '../../utils/constants';
import RemoveMovieButton from '../RemoveMovieButton/RemoveMovieButton';
import SavedMovieIcon from '../SavedMovieIcon/SavedMovieIcon';
import SaveMovieButton from '../SaveMovieButton/SaveMovieButton';

function MoviesCard({ movie }) {

    const minutesToHours = (time) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;

        return(`${hours > 0 ? `${hours}ч ` : ''}${minutes}м`);
    }

    const [isHover, setIsHover] = React.useState(false);

    function handleMovieHover() {
        setIsHover(!isHover);
    }

    return (
        <section className='movies-card'>
            <div className='movies-card_container' onMouseOver={handleMovieHover}>
                <button className='movies-card_save-button' type='button'>Сохранить</button>
                <a href={movie.trailerLink} className='movies-card_link' >
                    <img className='movies-card_cover' alt='изображение к фильму' src={`${movies_url}${movie.image.url}`} />
                </a>
                <div className='movies-card_data'>
                    <h4 className='movies-card_title'>{movie.nameRU}</h4>
                    <p className='movies-card_length'>{minutesToHours(movie.duration)}</p>
                </div>
            </div>
        </section>
    );
}

export default MoviesCard;
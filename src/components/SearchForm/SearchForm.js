import React from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onFilterCheckbox, handleMovieSearch }) {

   // let location = useLocation().pathname;
    const [searchInput, setSearchInput] = React.useState([]);

    function handleSearch(event) {
        setSearchInput(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        handleMovieSearch(searchInput);
    }

    return (
        <form className='search-form' onSubmit={handleSubmit} noValidate>
            <div className='search-form_container' noValidate>
                <input 
                    className='search-form_input'
                    name='search_movie'
                    placeholder='Фильм'
                    value={searchInput ? searchInput : ''}
                    onChange={handleSearch}
                    autoComplete='off'
                    minLength='2'
                    maxLength='30'
                    required
                />
                <span className='search-form_error'></span>
                <button className='search-form_button' type="submit">Найти</button>
            </div>
            <div className='search-form_short-movies_container'>
                <FilterCheckbox onFilterCheckbox={onFilterCheckbox} />
                <p className='search-from_short-movies_heading'>Короткометражки</p>
            </div>
            <hr className='search-form_hr'></hr>
        </form>
    );
}

export default SearchForm;
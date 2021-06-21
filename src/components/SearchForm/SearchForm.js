import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
    return (
        <form className='search-form' noValidate>
            <div className='search-form_container' noValidate>
                <input 
                    className='search-form_input'
                    name='search_movie'
                    placeholder='Фильм'
                    value={''}
                    autoComplete='off'
                    minLength='2'
                    maxLength='30'
                    required
                />
                <span className='search-form_error'></span>
                <button className='search-form_button' type="submit">Найти</button>
            </div>
            <div className='search-form_short-movies_container'>
                <FilterCheckbox />
                <p className='search-from_short-movies_heading'>Короткометражки</p>
            </div>
            <hr className='search-form_hr'></hr>
        </form>
    );
}

export default SearchForm;
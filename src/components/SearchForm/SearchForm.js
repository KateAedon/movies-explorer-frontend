import React from 'react';
import './SearchForm.css';

function SearchForm() {
    return (
        <form className='search-form' noValidate>
            <div className='search-form_container'>
                <input 
                    className='search-form_input'
                    name='search_movie'
                    placeholder='Фильм'
                    value={''}
                    autoComplete='off'
                    required
                />
                <span className='search-form_error'></span>
                <button className='search-form_button' type="submit">Найти</button>
            </div>
        </form>
    );
}

export default SearchForm;
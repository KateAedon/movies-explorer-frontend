import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onFilterCheckbox, handleMovieSearch }) {

    let location = useLocation().pathname;
    const savedMoviesComponent = location === '/saved-movies';
    const moviesComponent = location === '/movies';
    const previousSearchInput = localStorage.getItem('searchInput');
    const previousSearchInputSaved = localStorage.getItem('searchInputSaved');
    const [searchInput, setSearchInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (searchInput !== '') {
          hideErrorMessage();
        } else {
          showErrorMessage();
        }
      }, [searchInput]);

      function hideErrorMessage() {
        setErrorMessage('');
      }
    
      function showErrorMessage() {
        setErrorMessage('Введите ключевое слово');
      }

    useEffect(() => {
        
        if (moviesComponent) {    
            if (previousSearchInput) {
                setSearchInput(previousSearchInput);
                handleMovieSearch(searchInput);
            } else {
                setSearchInput('');
            }
        } else if (savedMoviesComponent) {
            if (previousSearchInputSaved) {
                setSearchInput(previousSearchInputSaved);
                handleMovieSearch(searchInput);
            } else {
                setSearchInput('');
            }
        }
    }, []);

    function handleSearch(event) {
        setSearchInput(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        handleMovieSearch(searchInput);
        if (savedMoviesComponent) {
            localStorage.setItem('searchInputSaved', searchInput);
        } else if (moviesComponent) {
            localStorage.setItem('searchInput', searchInput);
        }
    }



    return (
        <form className='search-form' onSubmit={handleSubmit} noValidate>
            <div className='search-form_container' noValidate>
                <input
                    type='text' 
                    className='search-form_input'
                    placeholder='Фильм'
                    value={searchInput ? searchInput : ''}
                    onChange={handleSearch}
                    minLength='1'
                    maxLength='90'
                    required
                />
                <span className='search-form_error'></span>
                <button className='search-form_button' type="submit">Найти</button>
                <span className={`search__input-error_hidden ${errorMessage && 'search__input-error'}`}>
          {errorMessage}</span>
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
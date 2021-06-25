import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ onFilterCheckbox }) {
    return (
        <label className='filter-checkbox_switch'>
            <input className='filter-checkbox_toggle' type='checkbox' onClick={ onFilterCheckbox }/>
            <div className='filter-checkbox_slider'></div>
        </label>
    );
}

export default FilterCheckbox;
import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css'
import '../Main/Main.css';

function Portfolio(props) {
    return (
        <div className='portfolio'>
            <h3 className='portfolio_header'>Портфолио</h3>
            <ul className='portfolio_list'>
                <il className='portfolio_list_item'>
                    <Link to='/' className='portfolio_list_item_link'>Статичный сайт</Link>
                    <hr className='portfolio_list_hr'></hr>
                </il>
                <il className='portfolio_list_item'>
                    <Link to='/' className='portfolio_list_item_link'>Адаптивный сайт</Link>
                    <hr className='portfolio_list_hr' ></hr>
                </il>
                <il className='portfolio_list_item'>
                    <Link to='/' className='portfolio_list_item_link'>Одностраничное приложение</Link>
                </il>
            </ul>
        </div>
    );
}

export default Portfolio;
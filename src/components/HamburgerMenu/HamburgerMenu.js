import React from 'react';
import { Link } from 'react-router-dom';
import ProfileButton from '../UI/ProfileButton/ProfileButton';
import './HamburgerMenu.css';

function HamburgerMenu({ isOpen, handleClose }) {
    return (
        <nav className={`hamburger-menu ${isOpen ? 'hamburger-menu_is-open' : ''}`}>
            <button  
                type='button' 
                className='hamburger-menu_close-button' 
                onClick={handleClose} />          
            <ul className='hamburger-menu_list'>
                <li className='hamburger-menu_list-item'>
                    <Link to='/' className='hamburger-menu_link' activeClassName='hamburger_link-active'>
                        Главная
                    </Link>
                </li>
                <li className='hamburger-menu_list-item'> 
                    <Link to='/movies' className='hamburger-menu_link' activeClassName='hamburger_link-active'>
                        Фильмы
                    </Link>
                </li>
                <li className='hamburger-menu_list-item'>
                    <Link to='/saved-movies' className='hamburger-menu_link' activeClassName='hamburger_link-active'>
                        Сохраненные фильмы
                    </Link>
                </li>
            </ul>
            <div className='hamburger-menu_profile-container'>
                    <ProfileButton />
            </div>
        </nav>
    );
}

export default HamburgerMenu;
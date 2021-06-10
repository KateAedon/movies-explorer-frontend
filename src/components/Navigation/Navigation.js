import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <nav className='navigation'>
            <Link to='/signup' className='navigation_link'>
                Регистрация
            </Link>
            <Link to='/signin' className='navigation_link'>
                Войти
            </Link>
        </nav>
    );
}

export default Navigation;

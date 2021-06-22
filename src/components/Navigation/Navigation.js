import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation({isLoggedIn}) {
    return (
        <nav className='navigation'>

            {!isLoggedIn && (
                <div className='navigation_unauth'>
                    <Link to='/signup' className='navigation_link '>
                        Регистрация
                    </Link>
                    <Link to='/signin' className='navigation_link'>
                        Войти
                    </Link>
                </div>
             )}

            {isLoggedIn &&  (
                <div className='navigation_auth'>
                     <div className='navigation_menu'>
                        <Link to='/movies' className='navigation_link navigation_link_auth'>
                            Фильмы
                        </Link>
                        <Link to='/saved-movies' className='navigation_link navigation_link_auth'>
                            Сохранённые фильмы
                        </Link>
                    </div>
                </div>
            )} 
        </nav>
    );
}

export default Navigation;

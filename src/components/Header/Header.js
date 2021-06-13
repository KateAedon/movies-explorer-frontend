import React from 'react';
import Navigation from '../Navigation/Navigation';
import Logo from '../UI/Logo/Logo';
import ProfileButton from '../UI/ProfileButton/ProfileButton';

import './Header.css'

function Header({isLoggedIn}) {
    return (
        <div className='header_container'>

            {!isLoggedIn && (
                <header className='header'>
                    <Logo /> 
                    <Navigation isLoggedIn={isLoggedIn}/>     
                </header>
            )}

            {isLoggedIn && (
                <header className='header header_unauth'>
                    <Logo />
                    <div className='header_menu'>
                        <Navigation isLoggedIn={isLoggedIn}/>
                        <ProfileButton />
                    </div>  
                </header>
            )}

        </div>
    );
}

export default Header;
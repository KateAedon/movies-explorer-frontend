import { findAllByDisplayValue } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Navigation from '../Navigation/Navigation';
import HamburgerMenuButton from '../UI/HamburgerMenuButton/HamburgerMenuButton';
import Logo from '../UI/Logo/Logo';
import ProfileButton from '../UI/ProfileButton/ProfileButton';

import './Header.css'

function Header({ isLoggedIn }) {

    const [width, setWidth] = useState(window.innerWidth);
    const updateWidth = () => {
        setWidth(window.innerWidth);
      };

    useEffect(() => {
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
      });

    const isMobile = width <= 768;

    const isOpen = false;

    return (
        <div className='header'>

            {!isLoggedIn && (
                <header className='header_container header_unauth'>
                    <Logo /> 
                    <Navigation isLoggedIn={ isLoggedIn }/>     
                </header>
            )}

            {isLoggedIn && isMobile && (
                <header className='header_container header_mobile_auth'>
                    <Logo />
                    <HamburgerMenuButton />
                </header>
            )}
            
            {/* {isLoggedIn && <HamburgerMenu isOpen={ isOpen }  />}  */}

            {isLoggedIn && !isMobile && (
                <header className='header_container'>
                    <Logo />
                    <div className='header_menu'>
                        <Navigation isLoggedIn={  isLoggedIn}/>
                        <ProfileButton />
                    </div>  
                </header>
            )}

        </div>
    );
}

export default Header;
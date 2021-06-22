import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Navigation from '../Navigation/Navigation';
import HamburgerMenuButton from '../UI/HamburgerMenuButton/HamburgerMenuButton';
import Logo from '../UI/Logo/Logo';
import ProfileButton from '../UI/ProfileButton/ProfileButton';

import './Header.css'

function Header({ isLoggedIn }) {

    // слушаем ширину экрана и определяем тип устройства
    const [width, setWidth] = useState(window.innerWidth);
    const updateWidth = () => {
        setWidth(window.innerWidth);
      };

    useEffect(() => {
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
      });
    const isMobile = width <= 768;

    // цвет хэдера меняетсяв зависимости от того на какой странице мы находимся
    let location = useLocation().pathname;

    // слушаем открыто меню-гамбургер или нет
    const [isOpen, setIsOpen] = useState(false);
    function handleHamburgerClick() {
        setIsOpen(!isOpen);
    }

    return (
        <div className='header'>

            {!isLoggedIn && (
                <header className='header_container header_unauth'>
                    <Logo /> 
                    <Navigation isLoggedIn={ isLoggedIn }/>     
                </header>
            )}

            {isLoggedIn && !isMobile && (
                <header className={'header_container ' + ((location === '/') ? 'header_auth_main' : '')}>
                    <Logo />
                    <div className='header_menu'>
                        <Navigation isLoggedIn={  isLoggedIn}/>
                        <ProfileButton />
                    </div>  
                </header>
            )}

            {isLoggedIn && isMobile && (
                <header className={'header_container ' + ((location === '/') ? 'header_auth_main' : '')}>
                    <Logo />
                    <HamburgerMenuButton handleClick={ handleHamburgerClick } />
                </header>
            )}
            
            {isLoggedIn && <HamburgerMenu isOpen={ isOpen } handleClose={ handleHamburgerClick } /> }

       

        </div>
    );
}

export default Header;
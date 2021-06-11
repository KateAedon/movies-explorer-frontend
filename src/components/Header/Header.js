import React from 'react';
import Navigation from '../Navigation/Navigation';
import Logo from '../UI/Logo/Logo';

import './Header.css'

function Header(props) {
    return (
        <header className='header'>
            <Logo />
            <Navigation />


        </header>
    );
}

export default Header;
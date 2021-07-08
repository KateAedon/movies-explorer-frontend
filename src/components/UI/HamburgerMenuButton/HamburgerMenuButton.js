import React from 'react';
import './HamburgerMenuButton.css';

function HamburgerMenuButton({ handleClick }) {

    return (
        <button className='hamburger-menu_button' onClick={handleClick} type='button' />
    );
}

export default HamburgerMenuButton;
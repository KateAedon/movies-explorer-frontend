import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab(props) {
    return (
        <section className='nav-bar'>
            <ul  className='nav-tab'>
                <li className='nav-tab_item'>
                    <Link to='/about-project' className='nav-tab_link'>О проекте</Link>
                </li>
                <li className='nav-tab_item'>
                    <Link to='/techs' className='nav-tab_link'>Технологии</Link>
                </li>
                <li className='nav-tab_item'>
                    <Link to='/about-me' className='nav-tab_link'>Студент</Link>
                </li>
            </ul>
        </section>
    );
}

export default NavTab;

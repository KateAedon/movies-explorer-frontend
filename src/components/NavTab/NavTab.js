import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab(props) {
    return (
        <section className='nav-bar'>
            <ul  className='nav-tab'>
                <li className='nav-tab_item'>
                    <a href='/#about-project_anchor' className='nav-tab_link'>О проекте</a>
                </li>
                <li className='nav-tab_item'>
                    <a href='/#techs_anchor' className='nav-tab_link'>Технологии</a>
                </li>
                <li className='nav-tab_item'>
                    <a href='/#about-me_anchor' className='nav-tab_link'>Студент</a>
                </li>
            </ul>
        </section>
    );
}

export default NavTab;

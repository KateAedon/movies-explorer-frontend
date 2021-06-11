import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <footer className='footer'>
            <h4 className='footer_heading'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <hr className='footer_hr'></hr>
            <div className='footer_container'>
                <div className='footer_year'>
                    © 2020
                </div>
                <ul className='footer_links'>
                    <li className='footer_link_item'>
                        <Link to='/' className='footer_link'>Яндекс.Практикум</Link>
                    </li>
                    <li className='footer_link_item'>
                        <Link to='/' className='footer_link'>Github</Link>
                    </li>
                    <li className='footer_link_item'>
                        <Link to='/' className='footer_link'>Facebook</Link>
                    </li>
                </ul>
            </div>


        </footer>
    );
}

export default Footer;
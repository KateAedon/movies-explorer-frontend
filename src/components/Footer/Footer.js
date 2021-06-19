import React from 'react';
import './Footer.css';

function Footer(props) {
    return (
        <footer className='footer'>
            <h4 className='footer_heading'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className='footer_container'>
                <div className='footer_year'>
                    © 2020
                </div>
                <ul className='footer_links'>
                    <li className='footer_link_item'>
                        <a href='https://praktikum.yandex.ru/' className='footer_link'>Яндекс.Практикум</a>
                    </li>
                    <li className='footer_link_item'>
                        <a href='https://github.com/' className='footer_link'>Github</a>
                    </li>
                    <li className='footer_link_item'>
                        <a href='https://www.facebook.com/' className='footer_link'>Facebook</a>
                    </li>
                </ul>
            </div>


        </footer>
    );
}

export default Footer;
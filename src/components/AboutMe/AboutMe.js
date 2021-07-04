import React from 'react';
import avatar from '../../images/avatar.jpg';
import './AboutMe.css';
import '../Main/Main.css';

function AboutMe(props) {
    return (
        <div className='about-me' id='about-me_anchor'>
            <h2 className='subheading about-me_title'>Студент</h2>
            <hr className='about-me_hr'></hr>
            <div className='about-me_container'>
                <div className='about-me_article_container'>
                    <div className='about-me_article_text'>
                        <h1 className='heading about-me_article_heading'>Катя</h1>
                        <h3 className='about-me_article_description'>Фронтенд-разработчик</h3>
                        <p className='about-me_article'>
                            Я родилась и выросла в Челябинске, сейчас живу в Берлине. 
                            В ВУЗе я изучала иностранные языки и методики преподавания, а в 
                            последний год увлеклась программированием. Люблю путешествовать, 
                            ездить на велосипеде и фотографировать.
                        </p>
                    </div>
                    <div className='about-me_links'>
                            <a href='https://www.facebook.com/' className='about-me_link'>Facebook</a>
                            <a href='https://github.com/' className='about-me_link'>Github</a>
                    </div>
                </div>
                <img className='about-me_photo' src={ avatar } alt='Author' />
            </div>
        </div>
    );
}

export default AboutMe;
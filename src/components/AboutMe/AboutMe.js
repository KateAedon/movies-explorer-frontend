import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../images/avatar.svg';
import './AboutMe.css'
import '../Main/Main.css';

function AboutMe(props) {
    return (
        <div className='about-me'>
            <h2 className='subheading'>Студент</h2>
            <hr className='about-me_hr'></hr>
            <div className='about-me_container'>
                <div className='about-me_article_container'>
                    <div className='about-me_article_text'>
                        <h1 className='heading about-me_article_heading'>Виталий</h1>
                        <h3 className='about-me_article_description'>Фронтенд-разработчик</h3>
                        <p className='about-me_article'>
                            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня 
                            есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно 
                            начал кодить. С 2015 года работал в компании «СКБ Контур». После того, 
                            как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и 
                            ушёл с постоянной работы.
                        </p>
                    </div>
                    <div className='about-me_links'>
                            <Link to='/' className='about-me_link'>Facebook</Link>
                            <Link to='/' className='about-me_link'>Github</Link>
                    </div>
                </div>
                <img className='about-me_photo' src={ avatar } alt='Author' />
            </div>
        </div>
    );
}

export default AboutMe;
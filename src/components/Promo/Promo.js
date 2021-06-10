import React from 'react';
import { Link } from 'react-router-dom';
import promo_logo from '../../images/promo_logo.svg';
import './Promo.css';

function Promo(props) {
    return (
        <section className='promo'>
                <h1 className='promo_title'>Учебный проект студента факультета Веб-разработки.</h1>
                <img className='promo_logo' src={promo_logo} alt='logo'/>
        </section>
    );
}

export default Promo;

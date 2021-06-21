import React from 'react';
import './Techs.css';
import '../Main/Main.css';

function Techs(props) {
    return (
        <div className='techs' id='techs_anchor'>
            <h2 className='subheading techs_subheading'>Технологии</h2>
            <hr className='techs_hr'></hr>
                <h1 className='heading techs_heading'>7 технологий</h1>
                <p className='article-text techs_article'>На курсе 
                веб-разработки мы освоили технологии, которые применили 
                в дипломном проекте.</p>
                <ul className='techs_list'>
                    <li className='techs_list-item'>
                        HTML
                    </li>
                    <li className='techs_list-item'>
                        CSS
                    </li>
                    <li className='techs_list-item'>
                        JS
                    </li>
                    <li className='techs_list-item'>
                        React
                    </li>
                    <li className='techs_list-item'>
                        Git
                    </li>
                    <li className='techs_list-item'>
                        Express.js
                    </li>
                    <li className='techs_list-item'>
                        mongoDB
                    </li>
                </ul>
        </div>
    );
}

export default Techs;
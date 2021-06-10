import { disconnect } from 'mongoose';
import React from 'react';
import './AboutProject.css'

function AboutProject(props) {
    return (
        <header className='about-project'>
            <h2 className='about-project_title'>О проекте</h2>
            <hr className='about-project_hr'></hr>
            <div className='about-project_container'>
                <article className='about-project_article'>
                    <h3 className='about-project_article_title'>
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className='about-project_article_text'>
                        Составление плана, работу над бэкендом, вёрстку, 
                        добавление функциональности и финальные доработки.  
                    </p>
                </article>
                <article className='about-project_article'>
                    <h3 className='about-project_article_title'>
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className='about-project_article_text'>
                        У каждого этапа был мягкий и жёсткий дедлайн, 
                        которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </article>
            </div>


        </header>
    );
}

export default AboutProject;
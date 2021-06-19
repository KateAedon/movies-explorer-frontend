import React from 'react';
import './AboutProject.css'
import '../Main/Main.css';

function AboutProject(props) {
    return (
        <div className='about-project' id='about-project_anchor'>
            <h2 className='subheading about-project_heading'>О проекте</h2>
            <hr className='about-project_hr'></hr>
            <div className='about-project_container'>
                <article className='about-project_article'>
                    <h3 className='about-project_article_title'>
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className='article-text about-project_article_text'>
                        Составление плана, работу над бэкендом, вёрстку, 
                        добавление функциональности и финальные доработки.  
                    </p>
                </article>
                <article className='about-project_article'>
                    <h3 className='about-project_article_title'>
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className='article-text about-project_article_text'>
                        У каждого этапа был мягкий и жёсткий дедлайн, 
                        которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </article>
            </div>
            <div className='about-project_duration_container'>
                <div className='about-project_duration about-project_duration-backend'>
                    1 неделя
                </div>
                <div className='about-project_duration about-project_duration-frontend'>
                    4 недели
                </div>
                <div className='about-project_duration_title about-project_duration_title-backend'>
                    Back-end
                </div>
                <div className='about-project_duration_title about-project_duration_title-frontend'>
                    Front-end
                </div>
            </div>
        </div>
    );
}

export default AboutProject;
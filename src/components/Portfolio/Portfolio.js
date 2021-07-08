import React from 'react';
import './Portfolio.css'
import '../Main/Main.css';

function Portfolio(props) {
    return (
        <div className='portfolio'>
            <h3 className='portfolio_header'>Портфолио</h3>
            <ul className='portfolio_list'>
                <il className='portfolio_list_item'>
                    <a href='https://kateaedon.github.io/russian-travel/' className='portfolio_list_item_link'>
                        Статичный сайт
                        <span className='portfolio_list_item_arrow'>&#8599;</span>
                    </a>
  
                </il>
                <il className='portfolio_list_item'>
                    <a href='https://github.com/KateAedon/mesto-react' className='portfolio_list_item_link'>
                        Адаптивный сайт
                        <span className='portfolio_list_item_arrow'>&#8599;</span>
                    </a>

                </il>
                <il className='portfolio_list_item'>
                    <a href='https://github.com/KateAedon/express-mesto' className='portfolio_list_item_link'>
                        Одностраничное приложение
                        <span className='portfolio_list_item_arrow'>&#8599;</span>
                    </a>
                </il>
            </ul>
        </div>
    );
}

export default Portfolio;
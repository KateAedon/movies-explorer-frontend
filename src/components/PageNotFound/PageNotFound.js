import React from 'react';
import './PageNotFound.css';

function PageNotFound() {

  return (
    <div className='page-not-found'>
      <div className='page-not-found_container'>
        <h1 className='page-not-found_title'>404</h1>
        <p className='page-not-found_error'>Страница не найдена</p>
      </div>
      <button className='page-not-found_button'>Назад</button>
    </div>
  );
}

export default PageNotFound;

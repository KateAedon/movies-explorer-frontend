import React from 'react';
import './PageNotFound.css';

function PageNotFound() {

  return (
    <div className='page-not-found'>
      <h1 className='page-not-found_title'>404</h1>
      <p className='page-not-found_error'>Страница не найдена</p>
      <button className='page-not-found_button'>Назад</button>
    </div>
  );
}

export default PageNotFound;

import React from 'react';
import { useHistory } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {

  const history = useHistory();

  const handleGoBackClick = () => {
    history.goBack();    
  }

  return (
    <div className='page-not-found'>
      <div className='page-not-found_container'>
        <h1 className='page-not-found_title'>404</h1>
        <p className='page-not-found_error'>Страница не найдена</p>
      </div>
      <button className='page-not-found_button' onClick={handleGoBackClick} >Назад</button>
    </div>
  );
}

export default PageNotFound;

import React from 'react';
import './LoadMoreButton.css';

function LoadMoreButton({ onClick }) {
    return (
        <section className='load-more'>
            <button className='load-more_button' type='button' onClick={onClick} >Ещё</button>
        </section>
    );
}

export default LoadMoreButton;
import React from 'react';
import './BookmarkButton.css';

function BookmarkButton({ isSaved, onClick}) {
    return (
        <button className={isSaved ? '' : ''} type='button' onClick={onClick}>
            Сохранить
        </button>
    );
}

export default BookmarkButton;
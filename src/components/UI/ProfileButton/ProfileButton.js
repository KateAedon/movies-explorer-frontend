import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileButton.css';

function ProfileButton() {
    return (
        <Link to='/profile' className='profile_button'>
            Аккаунт
            <div className="profile_image"/>
        </Link>
    )
}

export default ProfileButton;
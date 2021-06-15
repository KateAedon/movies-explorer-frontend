import React from 'react';
import './Profile.css';

function Profile() {
    return (
        <div className='profile'>
            <h3 className='profile_heading'>Привет, {'Виталий'}!</h3>
            <form className='profile_form' noValidate>

                <label className='profile_form_label'>
                    Имя
                    <input 
                        className='profile_form_input' 
                        id='name' 
                        required
                        minLength='2'
                        maxLength='30'
                        placeholder='Имя'
                        value={''}
                        type='text'
                        autoComplete='off'
                    />
                    {/* <span className='profile_form_error'></span> */}
                </label>

                <label className='profile_form_label'>
                    E-mail
                    <input 
                        className='profile_form_input' 
                        id='email' 
                        required
                        minLength='2'
                        maxLength='30'
                        placeholder='Email'
                        value={''}
                        type='email'
                        autoComplete='off'
                    />
                    {/* <span className='profile_form_error'></span> */}
                </label>
                <button className='profile_form_edit-button' type='button'>Редактировать</button>
                <button className='profile_form_exit-button' type='button'>Выйти из аккаунта</button>
            </form>
        </div>
    );
} 

export default Profile;
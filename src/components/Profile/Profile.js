import React, { useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({
          name,
          email,
        });
      } 

    return (
        <div className='profile'>
            <h3 className='profile_heading'>Привет, {name}!</h3>
            <form className='profile_form' noValidate onSubmit={handleSubmit}>

                <label className='profile_form_label'>
                    Имя
                    <input 
                        className='profile_form_input'
                        name='name' 
                        id='name' 
                        required
                        minLength='2'
                        maxLength='30'
                        placeholder='Имя'
                        value={name}
                        type='text'
                        autoComplete='off'
                        onChange={handleNameChange}
                    />
                    {/* <span className='profile_form_error'></span> */}
                </label>

                <label className='profile_form_label'>
                    E-mail
                    <input 
                        className='profile_form_input'
                        name='email' 
                        id='email' 
                        required
                        minLength='2'
                        maxLength='30'
                        placeholder='Email'
                        value={email}
                        type='email'
                        autoComplete='off'
                        onChange={handleEmailChange}
                    />
                    {/* <span className='profile_form_error'></span> */}
                </label>
                <button className='profile_form_edit-button' type='button'>Редактировать</button>
                <button className='profile_form_exit-button' type='button' onClick={props.onLogOut} >Выйти из аккаунта</button>
            </form>
        </div>
    );
} 

export default Profile;
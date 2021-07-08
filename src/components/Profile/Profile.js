import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import './Profile.css';

function Profile(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const { values, setValues, handleChange, errors, isValid } = useFormWithValidation();
    const { name, email } = values;

    React.useEffect(() => {
        setValues({ name: currentUser.name, email: currentUser.email })
    }, [setValues, currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({ name, email });
    };

    return (
        <div className='profile'>
            <h3 className='profile_heading'>Привет, {currentUser.name}!</h3>
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
                        value={values.name || ''}
                        type='text'
                        autoComplete='off'
                        onChange={handleChange}
                    />
                    <span className='profile_form_error'>
                        {errors.name || ''}
                    </span>
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
                        value={values.email || ''}
                        type='email'
                        autoComplete='off'
                        onChange={handleChange}
                    />
                    <span className='profile_form_error'>
                        {errors.email || ''}
                    </span>
                </label>
                <button 
                    className={(isValid && (values.name !== currentUser.name|| values.email !== currentUser.email))
                                ? 'profile_form_edit-button' 
                                : 'profile_form_edit-button profile_form_edit-button_not-active'}
                    type='submit'
                    disabled={(values.name === currentUser.name && values.email ===currentUser.email)
                    || !isValid}
                >
                    Редактировать
                </button>
                <button className='profile_form_exit-button' type='button' onClick={props.onLogOut} >Выйти из аккаунта</button>
            </form>
        </div>
    );
} 

export default Profile;
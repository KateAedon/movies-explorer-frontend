import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import Logo from '../UI/Logo/Logo';
import './Register.css';

function Register(props) {

    const { values, handleChange, errors, isValid } = useFormWithValidation();
    const { name, email, password } = values;

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister( name, email, password );
  }

    return (
        <div className='register'>
            <div className='register_container'>
            <Logo />
            <h2 className='register_heading'>Добро пожаловать!</h2>
            <form className='register_form' onSubmit={handleSubmit} noValidate>

                <label className='register_form_label'>
                    Имя
                <input 
                    className='register_form_input' 
                    id='name'
                    name='name' 
                    required
                    minLength='2'
                    maxLength='30'
                    placeholder=''
                    value={values.name || ''}
                    onChange={handleChange}
                    type='text'
                    autoComplete='off'
                />
                <span className='register_form_error'>
                    {errors.name || ''}
                </span>
            </label>

            <label className='register_form_label'>
                E-mail
                <input 
                    className='register_form_input' 
                    name='email'
                    id='email' 
                    required
                    minLength='2'
                    maxLength='30'
                    placeholder=''
                    value={values.email || ''}
                    onChange={handleChange}
                    type='email'
                    autoComplete='off'
                />
                <span className='register_form_error'>
                    {errors.email || ''}
                </span>
            </label>

            <label className='register_form_label'>
                Пароль
                <input 
                    className='register_form_input' 
                    name='password'
                    id='password' 
                    required
                    minLength='2'
                    maxLength='30'
                    placeholder=''
                    value={values.password || ''}
                    onChange={handleChange}
                    type='password'
                    autoComplete='off'
                />
                <span className='register_form_error'>
                    {errors.password || ''}
                </span>
            </label>
                <button 
                    className={(isValid ? 'register-form_submit-button' : 'register-form_submit-button register-form_submit-button_not-active')}
                    type='submit'
                >
                    Зарегистрироваться
                </button>
                <div className='register-form_login-container'>
                    <p className='register-form_login'>Уже зарегистрированы? </p> 
                    <Link to='/signin' className='register-form_login-button'> Войти</Link>
                </div> 
                </form>
            </div>
        </div>
    );
}

export default withRouter(Register);
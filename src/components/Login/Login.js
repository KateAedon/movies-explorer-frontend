import React from 'react';
import { Link, withRouter } from "react-router-dom";
import useFormWithValidation from '../../hooks/useFormWithValidation';
import Logo from '../UI/Logo/Logo';
import './Login.css';

function Login(props) {

    const { values, handleChange, errors, isValid } = useFormWithValidation();
    const { email, password } = values;
      
      function handleSubmit(e) {
        e.preventDefault();
        props.onLogin({ email, password });
    }

    return (
        <div className='login'>
            <div className='login_container'>
            <Logo />
            <h3 className='login_heading'>Рады видеть!</h3>
            <form className='login_form' noValidate onSubmit={ handleSubmit }>

            <label className='login_form_label'>
                E-mail
                <input 
                    className='login_form_input'
                    name='email' 
                    id='email' 
                    required
                    minLength='2'
                    maxLength='30'
                    placeholder=''
                    value={values.email || ''}
                    onChange={ handleChange }
                    type='email'
                    autoComplete='off'
                />
                <span className='login_form_error'>
                    {errors.email || ''}
                </span>
            </label>

            <label className='login_form_label'>
                Пароль
                <input 
                    className='login_form_input'
                    name='password'
                    id='password' 
                    required
                    minLength='2'
                    maxLength='30'
                    placeholder=''
                    value={values.password || ''}
                    onChange={ handleChange }
                    type='password'
                    autoComplete='off'
                />
                <span className='login_form_error'>
                    {errors.password || ''}
                </span>
            </label>
                <button 
                    className={(isValid ? 'login-form_submit-button' : 'login-form_submit-button login-form_submit-button_not-active')}
                    type='submit'
                >
                        Войти
                </button>
                <div className='login-form_login-container'>
                    <p className='login-form_login'>Ещё не зарегистрированы? </p> 
                    <Link to='/signup' className='login_form_register-button'> Зарегистрироваться</Link>
                </div> 
                </form>
            </div>
        </div>
    );
}

export default withRouter(Login);
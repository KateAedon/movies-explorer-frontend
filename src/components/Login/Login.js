import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../UI/Logo/Logo';
import './Login.css';

function Login() {
    return (
        <div className='login'>
            <div className='login_container'>
            <Logo />
            <h2 className='login_heading'>Рады видеть!</h2>
            <form className='login_form' noValidate>

            <label className='login_form_label'>
                E-mail
                <input 
                    className='login_form_input' 
                    id='email' 
                    required
                    minLength='2'
                    maxLength='30'
                    placeholder='Email'
                    value={'Email@mail.mail'}
                    type='email'
                    autoComplete='off'
                />
                
            </label>

            <label className='login_form_label'>
                Пароль
                <input 
                    className='login_form_input' 
                    id='password' 
                    required
                    minLength='2'
                    maxLength='30'
                    placeholder='Password'
                    value={''}
                    type='password'
                    autoComplete='off'
                />
                
            </label>
                <button className='login-form_submit-button' type='submit'>Войти</button>
                <div className='login-form_login-container'>
                    <p className='login-form_login'>Ещё не зарегистрированы? </p> 
                    <Link to='/signup' className='login_form_register-button'> Зарегистрироваться</Link>
                </div> 
                </form>
            </div>
        </div>
    );
}

export default Login;
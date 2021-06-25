import React from 'react';
import { Link, withRouter } from "react-router-dom";
import Logo from '../UI/Logo/Logo';
import './Register.css';

function Register(props) {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleName(e) {
        setName(e.target.value);
      }

    function handleEmail(e) {
        setEmail(e.target.value);
      }
    
    function handlePassword(e) {
        setPassword(e.target.value);
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onRegister(name, email, password);
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
                    required
                    minLength='2'
                    maxLength='30'
                    placeholder='Имя'
                    value={name}
                    onChange={handleName}
                    type='text'
                    autoComplete='off'
                />
                
            </label>

            <label className='register_form_label'>
                E-mail
                <input 
                    className='register_form_input' 
                    id='email' 
                    required
                    minLength='2'
                    maxLength='30'
                    placeholder='Email'
                    value={email}
                    onChange={handleEmail}
                    type='email'
                    autoComplete='off'
                />
                
            </label>

            <label className='register_form_label'>
                Пароль
                <input 
                    className='register_form_input' 
                    id='password' 
                    required
                    minLength='2'
                    maxLength='30'
                    placeholder='Password'
                    value={password}
                    onChange={handlePassword}
                    type='password'
                    autoComplete='off'
                />
                
            </label>
                <button className='register-form_submit-button' type='submit'>Зарегистрироваться</button>
                <div className='register-form_login-container'>
                    <p className='register-form_login'>Уже зарегистрированы? </p> 
                    <Link to='/signin' className='register_form_login-button'> Войти</Link>
                </div> 
                </form>
            </div>
        </div>
    );
}

export default withRouter(Register);
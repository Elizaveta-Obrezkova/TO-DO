import './Login.css';
import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../../Images/Logo.svg';
import useFormWithValidation from '../FormValidator/FormValidator';


function Login(props) {

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(values.email, values.password)
            .then((res) => {
                console.log(res)
                if (!res) return;
                else {
                    resetForm();
                }
            })
    }

    return (
        <div className="login page__login">
            <Link to="/" className="login__logo-link"><img src={logo} className="logo" alt="Логотип учебного проекта Яндекс.Практикум х BeatFilm." /></Link>
            <h2 className="login__title">Рады видеть!</h2>
            <form name="login-form" className="auth__form" onSubmit={handleSubmit}>
                <div className="auth-input-container">
                    <h3 className="auth-input-container__title">E-mail</h3>
                    <input id="email" name="email" type="email" placeholder='Введите Email' value={values.email} onChange={handleChange}
                        className="auth-form__input auth-form__input_name_owner" required minLength="2" maxLength="40" pattern='^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$' />
                    <span id="error-email" className="error-message">{errors.email}</span>
                </div>
                <div className="auth-input-container">
                    <h3 className="auth-input-container__title">Пароль</h3>
                    <input id="password" name="password" type="password" placeholder='Введите пароль' value={values.password} onChange={handleChange}
                        className="auth-form__input auth-form__input_name_owner" required minLength="6" maxLength="40" />
                    <span id="error-password" className="error-message">{errors.password}</span>
                </div>
                <p className="login__error-message">{props.error}</p>
                <button type="submit" className={isValid ? "login__button" : "login__button login__button_inactive"}>Войти</button>
            </form>
            <p className="login__info">
                Ещё не зарегистрированы?
                <Link to="/signup" className="login__link"> Регистрация</Link>
            </p>

        </div>
    );
}

export default Login;
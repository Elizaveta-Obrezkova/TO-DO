import './Register.css';
import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../../Images/Logo.svg';
import useFormWithValidation from '../FormValidator/FormValidator';


function Register(props) {

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    function handelSubmit (e) {
        e.preventDefault();
        props.onRegister(values.name, values.email, values.password)
        .then((res)=>{
            if (!res) return;
            else {
                resetForm();
            }
        })
    };

    return (
        <div className="register page__register">
            <Link to="/" className="register__logo-link"><img src={logo} className="logo" alt="Логотип учебного проекта Яндекс.Практикум х BeatFilm." /></Link>
            <h2 className="register__title">Добро пожаловать!</h2>
            <form name="register-form" className="auth__form" onSubmit={handelSubmit}>
                <div className="auth-input-container">
                    <h3 className="auth-input-container__title">Имя</h3>
                    <input id="name" name="name" type="text" placeholder='Введите имя' value={values.name} onChange={handleChange}
                        className="auth-form__input auth-form__input_name_owner" required minLength="2" maxLength="40" pattern='^[А-Яа-яa-zA-ZёЁ\s\-]+'/>
                    <span id="error-name-owner" className="error-message">{errors.name}</span>
                </div>
                <div className="auth-input-container">
                    <h3 className="auth-input-container__title">E-mail</h3>
                    <input id="email" name="email" type="email" placeholder='Введите Email' value={values.email} onChange={handleChange}
                        className="auth-form__input auth-form__input_name_owner" required minLength="2" maxLength="40" pattern='^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$'/>
                    <span id="error-email" className="error-message">{errors.email}</span>
                </div>
                <div className="auth-input-container">
                    <h3 className="auth-input-container__title">Пароль</h3>
                    <input id="password" name="password" type="password" placeholder='Введите пароль' value={values.password} onChange={handleChange}
                        className="auth-form__input auth-form__input_name_owner" required minLength="6" maxLength="40" />
                    <span id="error-password" className="error-message">{errors.password}</span>
                </div>
                <p className="register__error-message">{props.error}</p>
                <button type="submit" className={isValid ? "register__button" : "register__button register__button_inactive"}>Зарегистрироваться</button>
            </form>
            <p className="register__info">
                Уже зарегистрированы?
                <Link to="/signin" className="register__link"> Войти</Link>
            </p>

        </div>
    );
}

export default Register;
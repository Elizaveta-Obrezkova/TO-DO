import logo from '../../Images/Logo.svg';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation'


function Header(props) {

    const location = useLocation();

    const [isPopupOpen, openPopup] = React.useState(false);

    function handleMenuClick() {
        openPopup(true)
    }

    function closePopups() {
        openPopup(false);
    }

    return (
        <header className={location.pathname !== '/' ? "header page__header" : "header page__header header_theme_grey"}>
            <Link to="/" className="header__link"><img src={logo} className="logo" alt="Логотип учебного проекта Яндекс.Практикум х BeatFilm." /></Link>
            {props.loggedIn ?
                (<>
                    <button type="button" className="header__button" aria-label="Аккаунт."><Link to="/profile" className="header__link">Аккаунт</Link></button>
                    <button type="button" className="header__button-nav" aria-label="Меню" onClick={handleMenuClick}></button>
                    <Navigation
                        isOpen={isPopupOpen}
                        onClose={closePopups}
                    />
                </>) :
                (<>
                    <div className='header__navigation header__navigation_no-auth'>
                        <Link to="/signup" className="header__link header__link_no-auth">Регистация</Link>
                        <button type="button" className="header__button header__button_no-auth" aria-label="Аккаунт."><Link to="/signin" className="header__link header__link_no-auth header__link_theme_white">Войти</Link></button>
                    </div>
                </>)
            }
        </header>
    );
}

export default Header;

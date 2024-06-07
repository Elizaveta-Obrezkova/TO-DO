import './Profile.css';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../FormValidator/FormValidator';

function Profile(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const { values, handleChange, setValues, errors, isValid, resetForm } = useFormWithValidation();

    const [formActive, setFormActive] = React.useState(false)
    const [formValid, setFormValid] = React.useState(false)

    React.useEffect(() => {
        setValues({
            name: currentUser.name,
            email: currentUser.email
        })
    }, [currentUser, setValues])

    React.useEffect(() => {
        if (isValid && currentUser.name !== values.name | currentUser.email !== values.email) {
            setFormValid(true);
            return;
        }
        else {
            setFormValid(false);
            return;
        }
    }, [isValid, currentUser, values.name, values.email])

    function handleFormActive() {
        setFormActive(true);
    }

    function handelSubmit(e) {
        e.preventDefault();
        props.onEditInfo(values.name, values.email)
        resetForm();
    };

    return (
        <section className="profile page__profile">
            <h2 className="profile__header">Привет, {currentUser.name}!</h2>
            <form className="edit-form" onSubmit={handelSubmit}>
                <div className="input-container">
                    <h3 className="input-container__title">Имя</h3>
                    <input id="edit-name" name="name" type="text" placeholder='Введите имя' value={values.name || ''} onChange={handleChange}
                        className="edit-form__input edit-form__input_name_owner" required minLength="2" maxLength="40" readOnly={!formActive ? true : false} />
                    <span id="error-edit-name" className="error-message">{errors.name}</span>
                </div>
                <div className="input-container">
                    <h3 className="input-container__title">E-mail</h3>
                    <input id="edit-email" name="email" type="email" placeholder='Расскажите о себе' value={values.email || ''} onChange={handleChange}
                        className="edit-form__input edit-form__input_name_email-owner" required minLength="2" maxLength="200" pattern='^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$' readOnly={!formActive ? true : false} />
                    <span id="error-edit-email" className="error-message">{errors.email}</span>
                </div>
                <p className="edit-form__message">{props.message}</p>
                <button type="submit" className={formActive && formValid ? 'edit-form__button edit-form__button_type_subbmit' : formActive && !formValid ? 'edit-form__button edit-form__button_type_subbmit edit-form__button_inactive' : 'edit-form__button edit-form__button_hidden'}>Сохранить</button>
            </form>
            <button type="submit" className={!formActive ? 'edit-form__button edit-form__button_type_button' : 'edit-form__button edit-form__button_type_button edit-form__button_hidden'} onClick={handleFormActive}>Редактировать</button>
            <button type="button" className={!formActive ? 'edit-form__button edit-form__button_type_button' : 'edit-form__button edit-form__button_type_button edit-form__button_hidden'} onClick={props.onLogout}>Выйти из аккаунта</button>
        </section>
    );
}

export default Profile;
import { useHistory } from 'react-router-dom';
import './NotFound.css';


function NotFound(props) {

    const history = useHistory();

    function handleClickBack() {
        history.goBack()
    }

    function handleClickBackToMain() {
        history.push('/')
    }

return (
    <section className="not-found page__not-found">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
        <button className="not-found__link" type="button" onClick={!props.loggedIn ? handleClickBackToMain : handleClickBack }>Назад</button>
    </section>
);
}

export default NotFound;

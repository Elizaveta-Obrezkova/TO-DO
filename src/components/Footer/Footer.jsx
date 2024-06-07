import './Footer.css';

function Footer() {
    return (
        <footer className="footer page__footer">
            <h3 className="footer__title">Тестовое задание выполнила Обрезкова Елизавета</h3>
            <div className="footer__info">
                <p className="footer__copyright">&copy; 2024</p>
                <ul className="footer__list">
                    <li className="footer__item"><a className="footer__link" href="mailto:mail@example.com" target="_blank" rel="noreferrer">liza.sidorchuk@mail.ru</a></li>
                    <li className="footer__item"><a className="footer__link" href="https://github.com/Elizaveta-Obrezkova" target="_blank" rel="noreferrer">Github</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
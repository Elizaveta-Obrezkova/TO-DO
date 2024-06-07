import landingLogo from '../../Images/landing-logo.svg';
import './Promo.css';

function Promo(props) {

    return (
        <section className="project page__project">
            <h1 className="project__header">Планируй свой день с <span className="project__header_emphasis">TO DO</span></h1>
            <img src={landingLogo} className="landing-logo" alt="Логотип лэндинга" />
        </section>
    );
}

export default Promo;
